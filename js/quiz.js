document.addEventListener("DOMContentLoaded", function() {

    const namaPemain = localStorage.getItem("namaPemainMath") || "Jagoan";
    const kategori = localStorage.getItem("kategoriPilihan") || "penjumlahan";
    const level = localStorage.getItem("levelPilihan") || "mudah";

    // Set UI Header
    document.getElementById("nama-profil").textContent = namaPemain;
    document.getElementById("status-level").textContent = `Level ${level.toUpperCase()}`;
    document.getElementById("label-kategori").textContent = kategori.toUpperCase();

    let soalSekarang = 1;
    const totalSoal = 10;
    let skor = 0;
    let jawabanBenarAngka = 0;
    let waktuTersisa = 30; // 30 detik per soal
    let timerInterval;
    let sudahMenjawab = false;

    const teksPertanyaan = document.getElementById("teks-pertanyaan");
    const teksNomorSoal = document.getElementById("teks-nomor-soal");
    const progressBar = document.getElementById("progress-bar-soal");
    const teksTimer = document.getElementById("teks-timer");
    const barTimer = document.getElementById("bar-timer");
    const btnLanjut = document.getElementById("btn-lanjut");

    const tombolOpsi = [
        document.getElementById("btn-opsi-0"),
        document.getElementById("btn-opsi-1"),
        document.getElementById("btn-opsi-2"),
        document.getElementById("btn-opsi-3")
    ];
    const teksOpsi = [
        document.getElementById("teks-opsi-0"),
        document.getElementById("teks-opsi-1"),
        document.getElementById("teks-opsi-2"),
        document.getElementById("teks-opsi-3")
    ];

    function dapatkanAngkaAcak() {
        let max = 10;
        if (level === "sedang") max = 50;
        if (level === "sulit") max = 100;
        return Math.floor(Math.random() * max) + 1;
    }

    // MEMBUAT SOAL ---
    function buatSoal() {
        let angka1 = dapatkanAngkaAcak();
        let angka2 = dapatkanAngkaAcak();
        let operatorStr = "";
        let kategoriAktif = kategori;

        if (kategori === "campuran") {
            const pilihan = ["penjumlahan", "pengurangan", "perkalian", "pembagian"];
            kategoriAktif = pilihan[Math.floor(Math.random() * pilihan.length)];
        }

        switch (kategoriAktif) {
            case "penjumlahan":
                jawabanBenarAngka = angka1 + angka2;
                operatorStr = "+";
                break;
            case "pengurangan":
                if (angka1 < angka2) {
                    let temp = angka1;
                    angka1 = angka2;
                    angka2 = temp;
                }
                jawabanBenarAngka = angka1 - angka2;
                operatorStr = "-";
                break;
            case "perkalian":
                if (level === "sedang") { angka1 = Math.floor(Math.random() * 15)+1; angka2 = Math.floor(Math.random() * 10)+1;}
                if (level === "sulit") { angka1 = Math.floor(Math.random() * 25)+1; angka2 = Math.floor(Math.random() * 20)+1;}
                jawabanBenarAngka = angka1 * angka2;
                operatorStr = "x";
                break;
            case "pembagian":
                jawabanBenarAngka = angka1; 
                angka1 = angka1 * angka2; 
                operatorStr = ":";
                break;
        }

        teksPertanyaan.innerHTML = `Berapa hasil dari <span class="text-primary fw-bold">${angka1} ${operatorStr} ${angka2}</span>?`;
        buatPilihanJawaban(jawabanBenarAngka);
    }

    // Buat pilgan
    function buatPilihanJawaban(jawabanBenar) {
        let opsi = [jawabanBenar];

        while (opsi.length < 4) {
            let pengecoh = jawabanBenar + (Math.floor(Math.random() * 10) - 5);
            if (pengecoh !== jawabanBenar && pengecoh >= 0 && !opsi.includes(pengecoh)) {
                opsi.push(pengecoh);
            }
        }

        opsi.sort(() => Math.random() - 0.5);

        for (let i = 0; i < 4; i++) {
            teksOpsi[i].textContent = opsi[i];
            tombolOpsi[i].classList.remove("jawaban-benar", "jawaban-salah");
            tombolOpsi[i].disabled = false; 
            
            tombolOpsi[i].onclick = function() {
                cekJawaban(i, opsi[i] === jawabanBenar);
            };
        }
    }

    // timer
    function mulaiTimer() {
        waktuTersisa = 30;
        barTimer.style.width = "100%";
        teksTimer.textContent = "00:30";
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            waktuTersisa--;
            let persen = (waktuTersisa / 30) * 100;
            barTimer.style.width = `${persen}%`;
            
            let detikStr = waktuTersisa < 10 ? "0" + waktuTersisa : waktuTersisa;
            teksTimer.textContent = `00:${detikStr}`;

            if (waktuTersisa <= 0) {
                clearInterval(timerInterval);
                cekJawaban(-1, false); 
            }
        }, 1000);
    }

    // acak jawaban
    function cekJawaban(indexDipilih, isBenar) {
        if (sudahMenjawab) return;
        sudahMenjawab = true;
        clearInterval(timerInterval); 

        tombolOpsi.forEach(btn => btn.disabled = true);
        btnLanjut.disabled = false; 

        if (isBenar) {
            skor += 10; 
            tombolOpsi[indexDipilih].classList.add("jawaban-benar");
        } else {
            if(indexDipilih !== -1) {
                tombolOpsi[indexDipilih].classList.add("jawaban-salah");
            }
            for (let i = 0; i < 4; i++) {
                if (parseInt(teksOpsi[i].textContent) === jawabanBenarAngka) {
                    tombolOpsi[i].classList.add("jawaban-benar");
                }
            }
        }
    }
// next soal
    btnLanjut.addEventListener("click", function() {
        if (soalSekarang < totalSoal) {
            soalSekarang++;
            mulaiPertanyaanBaru();
        } else {
            // Simpan skor
            localStorage.setItem("skorAkhir", skor);
            
            let totalSelesai = parseInt(localStorage.getItem("totalTantangan")) || 0;
            localStorage.setItem("totalTantangan", totalSelesai + 1);

            window.location.href = "results.html"; 
        }
    });

    function mulaiPertanyaanBaru() {
        sudahMenjawab = false;
        btnLanjut.disabled = true;
        teksNomorSoal.textContent = `Soal ${soalSekarang} dari ${totalSoal}`;
        progressBar.style.width = `${(soalSekarang / totalSoal) * 100}%`;
        
        buatSoal();
        mulaiTimer();
    }

    mulaiPertanyaanBaru();
});
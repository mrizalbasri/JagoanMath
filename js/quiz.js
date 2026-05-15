document.addEventListener("DOMContentLoaded", function() {

    const namaPemain = localStorage.getItem("namaPemainMath") || "Jagoan";
    const kategori = localStorage.getItem("kategoriPilihan") || "penjumlahan";
    const level = localStorage.getItem("levelPilihan") || "mudah";

    // Set UI Header
    document.getElementById("nama-profil").textContent = namaPemain;
    const statusLevel = document.getElementById("status-level");
    if (statusLevel) statusLevel.textContent = `Level ${level.toUpperCase()}`;
    document.getElementById("label-kategori").textContent = kategori.toUpperCase();

    let soalSekarang = 0;
    const totalSoal = 10;
    let skor = 0;
    let waktuTersisa = 30;
    let timerInterval;
    let sudahMenjawab = false;
    let bankSoal = [];
    let soalTerpilih = [];

    const teksPertanyaan = document.getElementById("teks-pertanyaan");
    const teksNomorSoal = document.getElementById("teks-nomor-soal");
    const progressBar = document.getElementById("progress-bar-soal");
    const teksTimer = document.getElementById("teks-timer");

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

    // Fetch bank soal dari JSON menggunakan AJAX
    async function ambilBankSoal() {
        try {
            const response = await fetch('data/soal.json');
            if (!response.ok) throw new Error('Gagal memuat soal');

            bankSoal = await response.json();
            siapkanSoal();
        } catch (error) {
            console.error('Error:', error);
            teksPertanyaan.textContent = 'Gagal memuat soal. Silakan refresh halaman.';
        }
    }

    // Siapkan soal berdasarkan kategori dan level
    function siapkanSoal() {
        let soalKategori = [];

        if (kategori === "campuran") {
            // Ambil soal dari semua kategori
            const semuaKategori = ["penjumlahan", "pengurangan", "perkalian", "pembagian"];
            semuaKategori.forEach(kat => {
                if (bankSoal[kat] && bankSoal[kat][level]) {
                    soalKategori = soalKategori.concat(bankSoal[kat][level]);
                }
            });
        } else {
            // Ambil soal dari kategori tertentu
            if (bankSoal[kategori] && bankSoal[kategori][level]) {
                soalKategori = bankSoal[kategori][level];
            }
        }

        // Acak dan ambil 10 soal
        soalTerpilih = acakArray(soalKategori).slice(0, totalSoal);

        if (soalTerpilih.length === 0) {
            teksPertanyaan.textContent = 'Soal tidak tersedia untuk kategori ini.';
            return;
        }

        mulaiPertanyaanBaru();
    }

    // Fungsi untuk mengacak array
    function acakArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Tampilkan soal
    function tampilkanSoal() {
        const soal = soalTerpilih[soalSekarang];
        teksPertanyaan.innerHTML = `<span class="text-primary">${soal.soal}</span> = ?`;

        // Acak opsi jawaban
        const opsiAcak = acakArray([...soal.opsi]);

        for (let i = 0; i < 4; i++) {
            teksOpsi[i].textContent = opsiAcak[i];
            tombolOpsi[i].classList.remove("jawaban-benar", "jawaban-salah");
            tombolOpsi[i].disabled = false;

            tombolOpsi[i].onclick = function() {
                cekJawaban(i, opsiAcak[i] === soal.jawaban, soal.jawaban);
            };
        }
    }

    // Timer
    function mulaiTimer() {
        waktuTersisa = 30;
        teksTimer.textContent = "00:30";
        clearInterval(timerInterval);

        timerInterval = setInterval(() => {
            waktuTersisa--;
            let detikStr = waktuTersisa < 10 ? "0" + waktuTersisa : waktuTersisa;
            teksTimer.textContent = `00:${detikStr}`;

            if (waktuTersisa <= 0) {
                clearInterval(timerInterval);
                const soal = soalTerpilih[soalSekarang];
                cekJawaban(-1, false, soal.jawaban);
            }
        }, 1000);
    }

    // Cek jawaban
    function cekJawaban(indexDipilih, isBenar, jawabanBenar) {
        if (sudahMenjawab) return;
        sudahMenjawab = true;
        clearInterval(timerInterval);

        tombolOpsi.forEach(btn => btn.disabled = true);

        if (isBenar) {
            skor += 10;
            tombolOpsi[indexDipilih].classList.add("jawaban-benar");
        } else {
            if (indexDipilih !== -1) {
                tombolOpsi[indexDipilih].classList.add("jawaban-salah");
            }
            // Tampilkan jawaban benar
            for (let i = 0; i < 4; i++) {
                if (parseInt(teksOpsi[i].textContent) === jawabanBenar) {
                    tombolOpsi[i].classList.add("jawaban-benar");
                }
            }
        }

        // Auto lanjut ke soal berikutnya setelah 1.5 detik
        setTimeout(() => {
            soalSekarang++;
            if (soalSekarang < totalSoal) {
                mulaiPertanyaanBaru();
            } else {
                localStorage.setItem("skorAkhir", skor);
                window.location.href = "results.html";
            }
        }, 1500);
    }

    // Mulai pertanyaan baru
    function mulaiPertanyaanBaru() {
        sudahMenjawab = false;
        teksNomorSoal.textContent = `Soal ${soalSekarang + 1}/${totalSoal}`;
        progressBar.style.width = `${((soalSekarang + 1) / totalSoal) * 100}%`;

        tampilkanSoal();
        mulaiTimer();
    }

    // Mulai quiz dengan fetch bank soal
    ambilBankSoal();
});
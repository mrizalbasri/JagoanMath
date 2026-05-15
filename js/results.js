document.addEventListener("DOMContentLoaded", function() {

    const namaPemain = localStorage.getItem("namaPemainMath") || "Jagoan";
    const skorAkhir = parseInt(localStorage.getItem("skorAkhir")) || 0;

    // Set nama profil di header dan summary
    document.getElementById("nama-profil").textContent = namaPemain;
    document.getElementById("summary-nama").textContent = namaPemain;

    // Set skor
    document.getElementById("skor-akhir").textContent = skorAkhir;

    // Set jumlah benar
    const jumlahBenar = skorAkhir / 10;
    document.getElementById("summary-benar").textContent = `${jumlahBenar}/10`;

    // Set tanggal (format singkat)
    const tanggalSekarang = new Date();
    const formatTanggal = { day: 'numeric', month: 'short' };
    const teksTanggal = tanggalSekarang.toLocaleDateString('id-ID', formatTanggal);
    document.getElementById("summary-tanggal").textContent = teksTanggal;

    const btnMainLagi = document.getElementById("btn-main-lagi");
    const btnKeluar = document.getElementById("btn-keluar");

    if (btnMainLagi) {
        btnMainLagi.addEventListener("click", function() {
            window.location.href = "category.html";
        });
    }
if (btnKeluar) {
        btnKeluar.addEventListener("click", function() {
            localStorage.removeItem("skorAkhir");
            localStorage.removeItem("namaPemainMath"); 
            localStorage.removeItem("kategoriPilihan");
            localStorage.removeItem("levelPilihan");
            
            window.location.href = "index.html";
        });
    
    }
});
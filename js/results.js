document.addEventListener("DOMContentLoaded", function() {

    const namaPemain = localStorage.getItem("namaPemainMath") || "Jagoan";
    const level = localStorage.getItem("levelPilihan") || "mudah";

    const skorAkhir = parseInt(localStorage.getItem("skorAkhir")) || 0; 
    
    document.getElementById("header-nama-profil").textContent = namaPemain;
    document.getElementById("header-status-level").textContent = `Level ${level.toUpperCase()}`;
  
    document.getElementById("summary-nama").textContent = namaPemain;
    document.getElementById("skor-akhir").textContent = `${skorAkhir} / 100`;

    const jumlahBenar = skorAkhir / 10;
    document.getElementById("summary-benar").textContent = `${jumlahBenar} / 10`;

    // tanggal
    const tanggalSekarang = new Date();
    const formatTanggal = { day: 'numeric', month: 'long', year: 'numeric' };
    const teksTanggalHariIni = tanggalSekarang.toLocaleDateString('id-ID', formatTanggal);
    
    document.getElementById("summary-tanggal").textContent = teksTanggalHariIni;

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
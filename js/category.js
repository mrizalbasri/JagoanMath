document.addEventListener("DOMContentLoaded", function() {

    // --- 1. TAMPILKAN NAMA PEMAIN ---
    const namaProfil = document.getElementById("nama-profil");
    const namaTersimpan = localStorage.getItem("namaPemainMath");

    if (namaTersimpan && namaProfil) {
        namaProfil.textContent = namaTersimpan;
    } else {
        if(namaProfil) namaProfil.textContent = "Jagoan"; 
    }

    const btnPenjumlahan = document.getElementById("btn-penjumlahan");
    const btnPengurangan = document.getElementById("btn-pengurangan");
    const btnPerkalian = document.getElementById("btn-perkalian");
    const btnPembagian = document.getElementById("btn-pembagian");
    const btnCampuran = document.getElementById("btn-campuran");

    function pilihKategori(namaKategori) {
        localStorage.setItem("kategoriPilihan", namaKategori);
        window.location.href = "level.html"; 
    }

    if (btnPenjumlahan) btnPenjumlahan.addEventListener("click", () => pilihKategori("penjumlahan"));
    if (btnPengurangan) btnPengurangan.addEventListener("click", () => pilihKategori("pengurangan"));
    if (btnPerkalian) btnPerkalian.addEventListener("click", () => pilihKategori("perkalian"));
    if (btnPembagian) btnPembagian.addEventListener("click", () => pilihKategori("pembagian"));
    if (btnCampuran) btnCampuran.addEventListener("click", () => pilihKategori("campuran"));

    // LOGIKA PROGRESS BAR MINGGUAN ---
    const teksTantangan = document.getElementById("teks-tantangan");
    const barProgress = document.getElementById("bar-progress");
    const teksPersentase = document.getElementById("teks-persentase");

    // Ambil data jumlah kuis yang sudah diselesaikan dari memori browser
    let totalTantangan = parseInt(localStorage.getItem("totalTantangan")) || 0;
    const targetMingguan = 10; 
    
    let persentase = (totalTantangan / targetMingguan) * 100;
    if (persentase > 100) persentase = 100; // Maksimal 100%

    if (teksTantangan && barProgress && teksPersentase) {
        if (totalTantangan > 0) {
            teksTantangan.textContent = `Kamu sudah menyelesaikan ${totalTantangan} tantangan minggu ini!`;
        }
        teksPersentase.textContent = `${Math.round(persentase)}%`;
        
        setTimeout(() => {
            barProgress.style.width = `${persentase}%`;
        }, 300);
    }
});
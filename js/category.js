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

    // Progress section removed - no longer tracking weekly progress
});
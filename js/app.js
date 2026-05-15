document.addEventListener("DOMContentLoaded", function() {
    
    const kotakInputNama = document.getElementById("input-nama");
    const tombolMulai = document.getElementById("btn-mulai");
    const namaProfil = document.getElementById("nama-profil");
    const hurufProfil = document.getElementById("huruf-profil");

    const namaTersimpan = localStorage.getItem("namaPemainMath");
    if (namaTersimpan) {
        if(namaProfil) namaProfil.textContent = namaTersimpan;
        if(hurufProfil) hurufProfil.textContent = namaTersimpan.charAt(0).toUpperCase();
    }

    if (tombolMulai && kotakInputNama) {
        tombolMulai.addEventListener("click", function(event) {
            event.preventDefault();

            const namaDiketik = kotakInputNama.value.trim();

            if (namaDiketik !== "") {
                localStorage.setItem("namaPemainMath", namaDiketik);

                window.location.href = "category.html";
            } else {
                alert("Namanya jangan dikosongin ya, isi dulu supaya bisa main!");
            }
        });

        kotakInputNama.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                tombolMulai.click();
            }
        });
    }
});
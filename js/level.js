document.addEventListener("DOMContentLoaded", function() {

    const btnMudah = document.getElementById("btn-mudah");
    const btnSedang = document.getElementById("btn-sedang");
    const btnSulit = document.getElementById("btn-sulit");
    const btnBack = document.getElementById("btn-back");

    function pilihLevel(tingkatKesulitan) {
        // Simpan level
        localStorage.setItem("levelPilihan", tingkatKesulitan);
        
        window.location.href = "quiz.html"; 
    }

    if (btnMudah) {
        btnMudah.addEventListener("click", function() {
            pilihLevel("mudah");
        });
    }

    if (btnSedang) {
        btnSedang.addEventListener("click", function() {
            pilihLevel("sedang");
        });
    }

    if (btnSulit) {
        btnSulit.addEventListener("click", function() {
            pilihLevel("sulit");
        });
    }

    if (btnBack) {
        btnBack.addEventListener("click", function() {
            window.history.back(); 
        });
    }
});
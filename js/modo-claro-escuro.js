document.addEventListener("DOMContentLoaded", function () {
    const botaoAlternar = document.getElementById("alternar-tema");
    const body = document.body;

    
    if (localStorage.getItem("tema") === "claro") {
        body.setAttribute("data-theme", "claro");
        botaoAlternar.checked = true;
    }

    botaoAlternar.addEventListener("change", function () {
        if (botaoAlternar.checked) {
            body.setAttribute("data-theme", "claro");
            localStorage.setItem("tema", "claro");
        } else {
            body.setAttribute("data-theme", "escuro");
            localStorage.setItem("tema", "escuro");
        }
    });
});

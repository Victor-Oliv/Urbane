document.addEventListener("DOMContentLoaded", function () {
    const botaoAlternar = document.getElementById("alternar-tema");
    const body = document.body;

    const botaoClaro = document.getElementById("tema-claro");
    const botaoEscuro = document.getElementById("tema-escuro");

    if (localStorage.getItem("tema") === "claro") {
        body.setAttribute("data-theme", "claro");
        if (botaoAlternar) botaoAlternar.checked = true;
    }

    if (botaoAlternar) {
        botaoAlternar.addEventListener("change", function () {
            if (botaoAlternar.checked) {
                body.setAttribute("data-theme", "claro");
                localStorage.setItem("tema", "claro");
            } else {
                body.setAttribute("data-theme", "escuro");
                localStorage.setItem("tema", "escuro");
            }
        });
    }

    if (botaoClaro) {
        botaoClaro.addEventListener("click", function () {
            body.setAttribute("data-theme", "claro");
            localStorage.setItem("tema", "claro");
            if (botaoAlternar) botaoAlternar.checked = true;
        });
    }

    if (botaoEscuro) {
        botaoEscuro.addEventListener("click", function () {
            body.setAttribute("data-theme", "escuro");
            localStorage.setItem("tema", "escuro");
            if (botaoAlternar) botaoAlternar.checked = false;
        });
    }
});

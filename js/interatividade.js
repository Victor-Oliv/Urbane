
const inputSenha = document.getElementById("senha-cadastro");

  inputSenha.addEventListener("click", function (e) {
    const cliqueProximoDoOlho = e.offsetX > inputSenha.clientWidth - 40;
    if (!cliqueProximoDoOlho) return;

    if (inputSenha.type === "password") {
      inputSenha.type = "text";
      inputSenha.classList.add("olho-aberto");
    } else {
      inputSenha.type = "password";
      inputSenha.classList.remove("olho-aberto");
    }
  });
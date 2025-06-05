const inputSenha = document.getElementById("senha-cadastro");
if (inputSenha) {
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
}


document.querySelector('.formulario').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Pegar valores do formulário
    const nome = document.getElementById('nome-cadastro').value;
    const usuario = document.getElementById('usuario').value;
    const dia = document.getElementById('dia-cadastro').value;
    const mes = document.getElementById('mes-cadastro').value;
    const ano = document.getElementById('ano-cadastro').value;
    const email = document.getElementById('email-cadastro').value;
    const senha = document.getElementById('senha-cadastro').value;
    
    // Validar dados
    if (!nome || !usuario || !dia || !mes || !ano || !email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Formatar data (YYYY-MM-DD)
    const dataNascimento = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
    
    try {
        // Enviar dados para o backend (você precisará criar esta API)
        const response = await fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome_completo: nome,
                usuario: usuario,
                data_nascimento: dataNascimento,
                email: email,
                senha: senha
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '../html/Login.html';
        } else {
            alert(data.message || 'Erro ao cadastrar');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor');
    }
});
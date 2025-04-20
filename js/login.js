document.addEventListener("DOMContentLoaded", function () {
  const botaoGoogle = document.querySelector(".botao__google");

  if (botaoGoogle) {
    botaoGoogle.addEventListener("click", async (e) => {
      e.preventDefault();

      const client = google.accounts.oauth2.initTokenClient({
        client_id: "352584080622-hcd3mkck8altss8h6t10b0m845bq29i2.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        callback: (tokenResponse) => {
          if (tokenResponse.access_token) {
            console.log("Token recebido:", tokenResponse.access_token);

            localStorage.setItem("google_token", tokenResponse.access_token);
            alert("Login com Google feito com sucesso!");
            window.location.href = "/html/home.html"; 
          } else {
            alert("Erro ao realizar login com Google.");
          }
        }
      });

      client.requestAccessToken(); 
    });
  }
});

document.querySelector('.login__formulario').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const usuario = document.getElementById('nome').value;
  const senha = document.getElementById('Senha').value;
  
  if (!usuario || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
  }
  
  try {
      const response = await fetch('../php/autenticar.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `usuario=${encodeURIComponent(usuario)}&senha=${encodeURIComponent(senha)}`
      });
      
      if (response.redirected) {
          window.location.href = response.url;
      } else {
          const data = await response.text();
          alert('Usuário ou senha incorretos!');
      }
  } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor');
  }
});

// Lembrar senha (usando localStorage)
document.getElementById('lembrar_senha').addEventListener('change', function() {
  if (this.checked) {
      localStorage.setItem('lembrarUsuario', document.getElementById('nome').value);
  } else {
      localStorage.removeItem('lembrarUsuario');
  }
});

// Preencher usuário salvo se existir
window.addEventListener('DOMContentLoaded', () => {
  const usuarioSalvo = localStorage.getItem('lembrarUsuario');
  if (usuarioSalvo) {
      document.getElementById('nome').value = usuarioSalvo;
      document.getElementById('lembrar_senha').checked = true;
  }
});

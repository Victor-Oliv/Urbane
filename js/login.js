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

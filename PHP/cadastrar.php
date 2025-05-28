<?php  
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta e limpa os dados
    $nome = trim($_POST['nome_completo']);
    $usuario = trim($_POST['usuario']);
    $dia = str_pad((int)$_POST['dia'], 2, '0', STR_PAD_LEFT);
    $mes = str_pad((int)$_POST['mes'], 2, '0', STR_PAD_LEFT);
    $ano = (int)$_POST['ano'];
    $email = trim($_POST['email']);
    $senha = $_POST['senha'];

    // Verifica se algum campo está vazio
    if (empty($nome) || empty($usuario) || empty($dia) || empty($mes) || empty($ano) || empty($email) || empty($senha)) {
        echo "Por favor, preencha todos os campos.";
        exit;
    }

    // Verifica formato do e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "E-mail inválido.";
        exit;
    }

    // Monta data de nascimento
    $data_nascimento = "$ano-$mes-$dia";

    // Verifica se e-mail ou usuário já estão cadastrados
    $stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE email = ? OR usuario = ?");
    $stmt->bind_param("ss", $email, $usuario);
    $stmt->execute();
    $stmt->store_result();

if ($stmt->num_rows > 0) {
    echo '
    <script>
        alert("E-mail ou usuário já cadastrado.");
        window.history.back();
    </script>';
    $stmt->close();
    $conn->close();
    exit;
}
    $stmt->close();

    // Criptografa a senha
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);

    // Insere no banco de dados
    $stmt = $conn->prepare("INSERT INTO usuarios (nome_completo, usuario, data_nascimento, email, senha) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nome, $usuario, $data_nascimento, $email, $senha_hash);

    if ($stmt->execute()) {
        // Exibe balão de sucesso e redireciona
        echo '
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro realizado</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #000000;
                }
                .toast {
                    background-color: #4CAF50;
                    color: white;
                    padding: 16px 24px;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    font-size: 16px;
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    animation: fadeInOut 4s forwards;
                }
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(20px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(20px); }
                }
            </style>
        </head>
        <body>
            <div class="toast">Cadastro realizado com sucesso!</div>
            <script>
                setTimeout(function() {
                    window.location.href = "../html/Login.html";
                }, 2000);
            </script>
        </body>
        </html>';
    } else {
        echo "Erro ao cadastrar: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Método de requisição inválido.";
}
?>
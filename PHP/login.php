<?php
session_start(); // Inicia a sessão para guardar dados do usuário logado
include 'db_config.php';

// Conectar ao banco de dados
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Receber os dados do formulário
$usuario = $_POST['usuario'] ?? '';
$password = $_POST['senha'] ?? '';

// Verificar se o usuário existe
$sql = "SELECT usuario, senha FROM usuarios WHERE usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    // Verificar se a senha está correta
    if (password_verify($password, $row['senha'])) {
        // Login bem-sucedido → salvar dados na sessão
        $_SESSION['usuario_id'] = $row['id'];
        $_SESSION['usuario_nome'] = $usuario;

        // Redirecionar para a página principal
        header("Location: ../index.html");
        exit();
    } else {
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}
if ($stmt->execute()) {
    echo "<script>
        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'index.html';
    </script>";
} else {
    echo "<script>
        alert('Erro ao cadastrar: " . addslashes($stmt->error) . "');
        window.history.back();
    </script>";
}
$stmt->close();
$conn->close();
?>
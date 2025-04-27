<?php
include 'db_config.php';

$conn = new mysqli($host, $usuario, $senha, $banco);
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

$usuario = $_POST['usuario'];
$senha = $_POST['senha'];

// Usando prepared statement para evitar SQL injection
$sql = "SELECT senha FROM usuarios WHERE usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario); // "s" indica que $usuario é uma string
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    if (password_verify($senha, $row['senha'])) {
        echo "Login bem-sucedido!";
    } else {
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}

$stmt->close();
$conn->close();
?>
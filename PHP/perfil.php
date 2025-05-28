<?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

include 'db_config.php';
$usuario_id = $_SESSION['usuario_id'];

$sql = "SELECT u.nome, u.email, e.rua, e.cidade, e.estado, e.cep
        FROM usuarios u
        LEFT JOIN enderecos e ON u.id = e.usuario_id
        WHERE u.id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $usuario_id);
$stmt->execute();
$result = $stmt->get_result();
$usuario = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head><title>Perfil</title></head>
<body>
    <h1>Bem-vindo, <?= htmlspecialchars($_SESSION['nome']) ?></h1>
    <p><strong>Email:</strong> <?= htmlspecialchars($usuario['email']) ?></p>
    <h2>Endereço</h2>
    <p><strong>Rua:</strong> <?= htmlspecialchars($usuario['rua']) ?></p>
    <p><strong>Cidade:</strong> <?= htmlspecialchars($usuario['cidade']) ?></p>
    <p><strong>Estado:</strong> <?= htmlspecialchars($usuario['estado']) ?></p>
    <p><strong>CEP:</strong> <?= htmlspecialchars($usuario['cep']) ?></p>
    <p><a href="logout.php">Sair</a></p>
</body>
</html>
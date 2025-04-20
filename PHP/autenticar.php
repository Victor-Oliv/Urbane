<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'] ?? '';
    $senha = $_POST['senha'] ?? '';
    
    // Consulta segura usando prepared statements
    $stmt = $pdo->prepare("SELECT id_usuario, nome_completo, senha FROM usuarios WHERE usuario = ?");
    $stmt->execute([$usuario]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && password_verify($senha, $user['senha'])) {
        // Login bem-sucedido
        session_start();
        $_SESSION['user_id'] = $user['id_usuario'];
        $_SESSION['user_name'] = $user['nome_completo'];
        
        header('Location: ../html/pagina_inicial.html');
        exit();
    } else {
        // Login falhou
        header('Location: ../html/login.html?erro=1');
        exit();
    }
}
?>
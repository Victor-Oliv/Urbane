<?php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'] ?? '';
    $senha = $_POST['senha'] ?? '';
    
    try {
        $stmt = $pdo->prepare("SELECT id_usuario, nome_completo, senha 
                             FROM usuarios 
                             WHERE usuario = ?");
        $stmt->execute([$usuario]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            // Verifique o formato da senha no banco e adapte:
            // Se for SHA2 (como no exemplo anterior)
            if (hash('sha256', $senha) === $user['senha']) {
                session_start();
                $_SESSION['user_id'] = $user['id_usuario'];
                $_SESSION['user_name'] = $user['nome_completo'];
                header('Location: ../html/pagina_inicial.html');
                exit();
            }
        }
        
        header('Location: ../html/login.html?erro=1');
        exit();
        
    } catch (PDOException $e) {
        error_log("Erro de login: " . $e->getMessage());
        header('Location: ../html/login.html?erro=2');
        exit();
    }
}
?>
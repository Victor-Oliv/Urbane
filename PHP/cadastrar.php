<?php
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome_completo'];
    $usuario = $_POST['usuario'];

    // Concatena dia, mês e ano para data de nascimento
    $dia = str_pad($_POST['dia'], 2, '0', STR_PAD_LEFT);
    $mes = str_pad($_POST['mes'], 2, '0', STR_PAD_LEFT);
    $ano = $_POST['ano'];
    $data_nascimento = "$ano-$mes-$dia";  // Formato AAAA-MM-DD

    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO usuarios (nome_completo, usuario, data_nascimento, email, senha) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $nome, $usuario, $data_nascimento, $email, $senha);

    if ($stmt->execute()) {
        echo "Usuário cadastrado com sucesso!";
    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
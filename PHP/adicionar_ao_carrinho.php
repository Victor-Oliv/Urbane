<?php
session_start();
include 'db_config.php';

if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['error' => 'Usuário não está logado']);
    exit;
}

$id_usuario = $_SESSION['usuario_id'];
$id_variacao = $_POST['id_variacao'] ?? null;
$quantidade = intval($_POST['quantidade'] ?? 1);

if (!$id_variacao || $quantidade < 1) {
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

// Verifica se já existe esse item no carrinho do usuário
$stmt = $conn->prepare("SELECT quantidade FROM carrinho WHERE id_usuario = ? AND id_variacao = ?");
$stmt->bind_param("ii", $id_usuario, $id_variacao);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Atualiza a quantidade somando a nova
    $stmt->bind_result($qtd_atual);
    $stmt->fetch();
    $nova_quantidade = $qtd_atual + $quantidade;
    $stmt->close();

    $stmt = $conn->prepare("UPDATE carrinho SET quantidade = ? WHERE id_usuario = ? AND id_variacao = ?");
    $stmt->bind_param("iii", $nova_quantidade, $id_usuario, $id_variacao);
    $stmt->execute();
} else {
    $stmt->close();

    // Insere novo item no carrinho
    $stmt = $conn->prepare("INSERT INTO carrinho (id_usuario, id_variacao, quantidade) VALUES (?, ?, ?)");
    $stmt->bind_param("iii", $id_usuario, $id_variacao, $quantidade);
    $stmt->execute();
}

if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => 'Produto adicionado ao carrinho']);
} else {
    echo json_encode(['error' => 'Erro ao adicionar ao carrinho']);
}

$stmt->close();
$conn->close();
?>

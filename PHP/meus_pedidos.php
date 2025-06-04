<?php
session_start();
require_once '../conexao.php'; // ajuste conforme sua estrutura

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(["erro" => "Usuário não autenticado"]);
    exit;
}

$id_usuario = $_SESSION['usuario_id'];
$sql = "SELECT p.id, p.status, p.data_pedido, i.nome_produto, i.quantidade, i.tamanho, i.cor, i.preco_unitario
        FROM pedidos p
        JOIN itens_pedido i ON p.id = i.pedido_id
        WHERE p.usuario_id = ? ORDER BY p.data_pedido DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usuario);
$stmt->execute();
$result = $stmt->get_result();

$pedidos = [];

while ($row = $result->fetch_assoc()) {
    $pedido_id = $row['id'];
    if (!isset($pedidos[$pedido_id])) {
        $pedidos[$pedido_id] = [
            "id" => $pedido_id,
            "status" => $row['status'],
            "data" => $row['data_pedido'],
            "itens" => []
        ];
    }

    $pedidos[$pedido_id]['itens'][] = [
        "nome" => $row['nome_produto'],
        "quantidade" => $row['quantidade'],
        "tamanho" => $row['tamanho'],
        "cor" => $row['cor'],
        "preco" => $row['preco_unitario']
    ];
}

echo json_encode(array_values($pedidos));
?>

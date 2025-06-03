let tamanhoSelecionado = null;

// Quando o usuário clicar num botão de tamanho
document.querySelectorAll('.tamanho-item').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove seleção anterior
    document.querySelectorAll('.tamanho-item').forEach(b => b.classList.remove('selecionado'));
    
    // Marca este botão
    btn.classList.add('selecionado');
    
    // Salva o tamanho selecionado
    tamanhoSelecionado = btn.textContent;
  });
});

// Botão adicionar ao carrinho
document.querySelector('.btn-adicionar').addEventListener('click', () => {
  if (!tamanhoSelecionado) {
    alert('Selecione um tamanho');
    return;
  }

  const quantidade = parseInt(document.querySelector('.input__center').value);

  // Aqui você precisa de um jeito de saber o id_variacao para esse tamanho.
  // Vamos supor que você tenha um objeto produto com as variações (id_variacao, tamanho) carregadas do JSON

  const variacaoSelecionada = produto.variacoes.find(v => v.tamanho === tamanhoSelecionado);

  if (!variacaoSelecionada) {
    alert('Variação não encontrada');
    return;
  }

  const id_variacao = variacaoSelecionada.id_variacao;

  // Enviar para PHP
  fetch('adicionar_ao_carrinho.php', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `id_variacao=${id_variacao}&quantidade=${quantidade}`
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Produto adicionado ao carrinho!');
    } else {
      alert('Erro: ' + (data.error || 'Tente novamente'));
    }
  })
  .catch(err => alert('Erro na comunicação com o servidor'));
});

document.addEventListener('DOMContentLoaded', function () {
  const botoes = document.querySelectorAll('.botao-categoria');
  const secoes = {
    Camisetas: document.getElementById('camisetas'),
    Moletons: document.getElementById('moletons'),
    'Calças': document.getElementById('calcas')
  };

  function mostrarCategoria(categoria) {
    // Oculta todas as categorias
    for (let secao in secoes) {
      secoes[secao].style.display = 'none';
    }

    // Exibe a categoria selecionada
    if (secoes[categoria]) {
      secoes[categoria].style.display = 'block';
    }

    // Atualiza classe ativa nos botões
    botoes.forEach(botao => {
      botao.classList.remove('ativo');
      if (botao.textContent === categoria) {
        botao.classList.add('ativo');
      }
    });
  }

  // Adiciona eventos aos botões
  botoes.forEach(botao => {
    botao.addEventListener('click', function () {
      const categoria = this.textContent;
      mostrarCategoria(categoria);
    });
  });

  // Mostra "Camisetas" por padrão
  mostrarCategoria('Camisetas');
});

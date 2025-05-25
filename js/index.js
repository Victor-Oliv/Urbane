document.addEventListener('DOMContentLoaded', () => {
  const botoesCategoria = document.querySelectorAll('.botao-categoria');
  const linksMenu = document.querySelectorAll('.lista-menu__link');
  const secoes = document.querySelectorAll('.produtos__secao');

  function mostrarTodos() {
    secoes.forEach(secao => secao.classList.remove('hidden'));
    botoesCategoria.forEach(b => b.classList.remove('ativo'));
    linksMenu.forEach(link => link.classList.remove('ativo'));
  }

  function filtrarPorCategoria(categoria) {
    secoes.forEach(secao => {
      if (secao.dataset.categoria === categoria) {
        secao.classList.remove('hidden');
      } else {
        secao.classList.add('hidden');
      }
    });
  }

  mostrarTodos();


  function limparAtivos() {
    botoesCategoria.forEach(b => b.classList.remove('ativo'));
    linksMenu.forEach(link => link.classList.remove('ativo'));
  }


  botoesCategoria.forEach(botao => {
    botao.addEventListener('click', () => {
      const categoria = botao.dataset.categoria;
      limparAtivos();
      botao.classList.add('ativo');
      filtrarPorCategoria(categoria);
    });
  });


  linksMenu.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); 
      const categoria = link.dataset.categoria;
      limparAtivos();
      link.classList.add('ativo');
      filtrarPorCategoria(categoria);
    });
  });
});

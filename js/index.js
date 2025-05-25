document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.botao-categoria');
  const secoes = document.querySelectorAll('.produtos__secao');


  function mostrarTodos() {
    secoes.forEach(secao => secao.classList.remove('hidden'));
    botoes.forEach(b => b.classList.remove('ativo'));
  }

 
  mostrarTodos();

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const categoria = botao.dataset.categoria;

      botoes.forEach(b => b.classList.remove('ativo'));
      botao.classList.add('ativo');

      secoes.forEach(secao => {
        if (secao.dataset.categoria === categoria) {
          secao.classList.remove('hidden');
        } else {
          secao.classList.add('hidden');
        }
      });
    });
  });
});

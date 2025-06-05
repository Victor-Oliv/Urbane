function corrigirCaminho(caminhoOriginal) {
  if (window.location.pathname.includes("/html/")) {
    if (caminhoOriginal.startsWith("./")) {
      return caminhoOriginal.replace("./", "../");
    }
    if (!caminhoOriginal.startsWith("../") && !caminhoOriginal.startsWith("/")) {
      return "../" + caminhoOriginal;
    }
  }
  return caminhoOriginal;
}

function initAccordion() {
  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", () => {
      const accordion = header.parentElement;
      accordion.classList.toggle("open");
    });
  });
}

let categoriaSwiper = null;
let cardsSwipers = [];

function initSwipers() {
  const largura = window.innerWidth;

  if (categoriaSwiper) {
    categoriaSwiper.destroy(true, true);
    categoriaSwiper = null;
  }
  cardsSwipers.forEach((swiper) => swiper.destroy(true, true));
  cardsSwipers = [];

  if (largura < 820) {
    categoriaSwiper = new Swiper(".categoria-swiper", {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 16,
      pagination: {
        el: ".categoria-pagination",
        clickable: true,
      },
    });

    document.querySelectorAll(".cards-swiper").forEach((swiperEl) => {
      const swiper = new Swiper(swiperEl, {
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: {
          el: swiperEl.querySelector(".cards-pagination"),
          clickable: true,
        },
      });
      cardsSwipers.push(swiper);
    });
  } else if (largura >= 820 && largura < 1024) {
    document.querySelectorAll(".cards-swiper").forEach((swiperEl) => {
      const swiper = new Swiper(swiperEl, {
        slidesPerView: 2,
        spaceBetween: 12,
        pagination: {
          el: swiperEl.querySelector(".cards-pagination"),
          clickable: true,
        },
      });
      cardsSwipers.push(swiper);
    });
  } else if (largura >= 1024 && largura <= 1440) {
    document.querySelectorAll(".cards-swiper").forEach((swiperEl) => {
      const swiper = new Swiper(swiperEl, {
        slidesPerView: 3,
        spaceBetween: 16,
        pagination: {
          el: swiperEl.querySelector(".cards-pagination"),
          clickable: true,
        },
      });
      cardsSwipers.push(swiper);
    });
  } else {
    document.querySelectorAll(".cards-swiper").forEach((swiperEl) => {
      const swiper = new Swiper(swiperEl, {
        slidesPerView: 4,
        spaceBetween: 20,
        pagination: {
          el: swiperEl.querySelector(".cards-pagination"),
          clickable: true,
        },
      });
      cardsSwipers.push(swiper);
    });
  }
}

function getSlugFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

function setupAdicionarAoCarrinho(produto) {
  const btnAdicionar = document.querySelector(".btn-adicionar");
  if (!btnAdicionar) return;

  btnAdicionar.addEventListener("click", () => {
    const tamanhoSelecionado = document.querySelector(".tamanho-item.selected");
    if (!tamanhoSelecionado) {
      alert("Por favor, selecione um tamanho.");
      return;
    }

    const tamanho = tamanhoSelecionado.textContent;
    const precoUnitario = produto.preco;
    const imagem = corrigirCaminho(produto.imagens.frente);

    const itemCarrinho = {
      nome: produto.nome,
      tamanho: tamanho,
      preco: precoUnitario,
      imagem: imagem,
      slug: produto.slug,
    };

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(itemCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Produto adicionado ao carrinho!");
  });
}

function atualizarTotal() {
  const precos = document.querySelectorAll(".sacola .preco");
  let total = 0;

  precos.forEach(precoEl => {
    const precoTexto = precoEl.textContent.replace("R$", "").trim().replace(",", ".");
    total += parseFloat(precoTexto);
  });

  let totalEl = document.querySelector(".preco__total");
  if (!totalEl) {
    totalEl = document.createElement("p");
    totalEl.classList.add("preco__total");
    document.querySelector(".carrinho").appendChild(totalEl);
  }
  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function carregarCarrinho() {
  const carrinhoContainer = document.querySelector(".carrinho");
  if (!carrinhoContainer) return;

  carrinhoContainer.innerHTML = "";

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = `
      <p style="padding: 20px; font-size: 1.2rem; text-align: center; color: #666;">
        Seu carrinho está vazio.
      </p>
    `;
    atualizarTotal();
    return;
  }

  carrinho.forEach((item, index) => {
    const sacola = document.createElement("section");
    sacola.classList.add("sacola");

    sacola.innerHTML = `
      <div class="lista__produtos">
        <img class="imagem-produto" src="${corrigirCaminho(item.imagem)}" alt="${item.nome}" />
        <div class="lista-descricao">
          <p>
            ${item.nome}
            <i class="lixeira" data-index="${index}">
              <img class="imagem-lixeira" src="${corrigirCaminho('../assets/lixeira.svg')}" alt="lixeira" />
            </i>
          </p>
          <div class="lista__info">
            <span class="info__produto un">1 unid</span>
            <span class="info__produto tm">${item.tamanho}</span>
            <span class="preco">R$ ${item.preco}</span>
          </div>
        </div>
      </div>
    `;

    carrinhoContainer.appendChild(sacola);

    sacola.querySelector(".lixeira").addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.getAttribute("data-index"));
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      carrinho.splice(idx, 1);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      carregarCarrinho();
    });
  });

  atualizarTotal();
}

const caminhoProdutosJSON = window.location.pathname.includes("/html/") ? "../produtos.json" : "./produtos.json";

function loadProduto() {
  const slug = getSlugFromURL();

  if (!slug) {
    console.warn("Slug não encontrado na URL");
    return;
  }

  fetch(caminhoProdutosJSON)
    .then((res) => res.json())
    .then((produtos) => {
      const produto = produtos.find((p) => p.slug === slug);
      if (!produto) {
        document.body.innerHTML = "<h1>Produto não encontrado</h1>";
        return;
      }

      document.querySelector(".produto__descricao").textContent = produto.nome;
      document.querySelector(".preco__novo-produto").textContent = `R$ ${produto.preco}`;
      document.querySelector(".preco__antigo-produto").textContent = `R$ ${produto.precoAntigo}`;
      document.getElementById("descricao-produto").textContent = produto.descricao;

      const swiperWrapper = document.getElementById("swiper-wrapper");
      if (swiperWrapper) {
        swiperWrapper.innerHTML = `
          <div class="swiper-slide">
            <img src="${corrigirCaminho(produto.imagens.frente)}" alt="${produto.nome} frente" />
          </div>
          <div class="swiper-slide">
            <img src="${corrigirCaminho(produto.imagens.costas)}" alt="${produto.nome} costas" />
          </div>
        `;
      }

      const tamanhosContainer = document.querySelector(".tamanhos");
      if (tamanhosContainer) {
        tamanhosContainer.innerHTML = "";

        produto.tamanhos.forEach((tamanho) => {
          const btn = document.createElement("button");
          btn.classList.add("tamanho-item");
          btn.textContent = tamanho;

          btn.addEventListener("click", () => {
            document.querySelectorAll(".tamanho-item").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
          });

          tamanhosContainer.appendChild(btn);
        });
      }

      if (window.swiper) {
        window.swiper.destroy(true, true);
      }
      window.swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

      setupAdicionarAoCarrinho(produto);
    })
    .catch((err) => {
      console.error("Erro ao carregar produtos:", err);
    });
}

function updateCardsHref() {
  fetch(caminhoProdutosJSON)
    .then((res) => res.json())
    .then((produtos) => {
      const cards = document.querySelectorAll(".card");

      cards.forEach((card) => {
        const nomeCard = card.querySelector(".card__descricao").textContent.trim();
        const produto = produtos.find((p) => p.nome === nomeCard);
        if (produto) {
          const prefixo = window.location.pathname.includes("/html/") ? "../" : "";
          card.href = `${prefixo}produto.html?slug=${produto.slug}`;
        } else {
          console.warn(`Produto não encontrado para: ${nomeCard}`);
        }
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  initAccordion();
  initSwipers();
  updateCardsHref();

  if (path.includes("produto.html")) {
    loadProduto();
  }

  if (path.includes("sacola.html")) {
    carregarCarrinho();
  }
});

window.addEventListener("resize", initSwipers);

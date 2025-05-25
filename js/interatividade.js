const inputSenha = document.getElementById("senha-cadastro");
if (inputSenha) {
  inputSenha.addEventListener("click", function (e) {
    const cliqueProximoDoOlho = e.offsetX > inputSenha.clientWidth - 40;
    if (!cliqueProximoDoOlho) return;

    if (inputSenha.type === "password") {
      inputSenha.type = "text";
      inputSenha.classList.add("olho-aberto");
    } else {
      inputSenha.type = "password";
      inputSenha.classList.remove("olho-aberto");
    }
  });
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


function loadProduto() {
  const slug = getSlugFromURL();

  if (!slug) {
    console.warn("Slug não encontrado na URL");
    return;
  }

  fetch("../produtos.json")
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
            <img src="${produto.imagens.frente}" alt="${produto.nome} frente" />
          </div>
          <div class="swiper-slide">
            <img src="${produto.imagens.costas}" alt="${produto.nome} costas" />
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
    })
    .catch((err) => {
      console.error("Erro ao carregar produtos:", err);
    });
}

function updateCardsHref() {
  fetch("./produtos.json")
    .then((res) => res.json())
    .then((produtos) => {
      const cards = document.querySelectorAll(".card");

      cards.forEach((card) => {
        const nomeCard = card.querySelector(".card__descricao").textContent.trim();
        const produto = produtos.find((p) => p.nome === nomeCard);
        if (produto) {
          card.href = `produto.html?slug=${produto.slug}`;
        } else {
          console.warn(`Produto não encontrado para: ${nomeCard}`);
        }
      });
    });
}

document.addEventListener("DOMContentLoaded", () => {
  initAccordion();
  initSwipers();
  updateCardsHref();
  loadProduto();
});

window.addEventListener("resize", initSwipers);

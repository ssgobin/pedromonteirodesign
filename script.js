const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const form = document.querySelector(".contact-form");
const formStatus = document.querySelector("[data-form-status]");
const projectModal = document.querySelector("[data-project-modal]");
const modalCover = document.querySelector("[data-modal-cover]");
const modalCategory = document.querySelector("[data-modal-category]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalDescription = document.querySelector("[data-modal-description]");
const modalDate = document.querySelector("[data-modal-date]");
const modalTools = document.querySelector("[data-modal-tools]");
const modalTags = document.querySelector("[data-modal-tags]");
const modalGallery = document.querySelector("[data-modal-gallery]");
const modalLink = document.querySelector("[data-modal-link]");
const budgetModal = document.querySelector("[data-budget-modal]");
const whatsappSend = document.querySelector("[data-whatsapp-send]");
const emailSend = document.querySelector("[data-email-send]");
const budgetStatus = document.querySelector("[data-budget-status]");

const projects = {
  "active-life": {
    title: "Identidade Visual Active life",
    category: "Identidade visual",
    date: "30 de março de 2026",
    tools: "Illustrator, Photoshop",
    link: "https://www.behance.net/gallery/246717063/Identidade-Visual-Active-life",
    description:
      "Projeto de identidade visual com foco em logo design, branding, linguagem gráfica e aplicações para comunicar a marca com mais clareza e presença.",
    tags: ["Logo Design", "Branding", "Visual Identity", "Brand Identity"],
    cover: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/114d0d246717063.69cac0b970dcc.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/114d0d246717063.69cac0b970dcc.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0f5af6246717063.69cac0b971591.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/592322246717063.69cac0b971a39.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/c9671e246717063.69cac0b971e22.jpg"
    ]
  },
  "brand-portfolio": {
    title: "Brand Identity & Logo Design Portfolio",
    category: "Portfólio de marcas",
    date: "10 de março de 2026",
    tools: "Illustrator, Photoshop",
    link: "https://www.behance.net/gallery/245568441/Brand-Identity-Logo-Design-Portfolio",
    description:
      "Portfólio reunindo projetos de identidade visual e criação de marcas, desenvolvidos pela combinação entre estratégia e expressão visual.",
    tags: ["Portfolio", "Graphic Designer", "Logo Design", "Branding"],
    cover: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/bcfc07245568441.69b08b040de74.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/bcfc07245568441.69b08b040de74.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/e18d34245568441.69b08b040d8a2.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/811a95245568441.69b08b040e94b.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/170763245568441.69b08b040eee7.jpg"
    ]
  },
  lato: {
    title: "LATO — Identidade Visual e Branding",
    category: "Branding",
    date: "19 de novembro de 2025",
    tools: "Illustrator, Photoshop",
    link: "https://www.behance.net/gallery/238887901/LATO-Identidade-Visual-e-Branding",
    description:
      "A LATO nasce da essência da cultura urbana brasileira. A marca transforma a mistura cultural do Brasil em linguagem visual, celebrando autenticidade, criatividade e resiliência.",
    tags: ["Design", "Branding", "Visual Identity", "Illustration"],
    cover: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/dc0497238887901.69b95f65ef5b3.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/dc0497238887901.69b95f65ef5b3.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0ccf54238887901.69b95f65efc15.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/b18dec238887901.69b961a4bc795.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/24f0d1238887901.69b962c5716a2.jpg"
    ]
  },
  aerialduda: {
    title: "Manual de marca AERIALDUDA",
    category: "Manual de marca",
    date: "4 de novembro de 2025",
    tools: "Illustrator, Photoshop",
    link: "https://www.behance.net/gallery/237855199/Manual-de-marca-AREIALDUDA",
    description:
      "Manual de marca desenvolvido para organizar a identidade visual, orientar aplicações e manter consistência nos pontos de contato da marca.",
    tags: ["Manual de Marca", "Brand Identity", "Logo Design", "Brand Design"],
    cover: "https://mir-s3-cdn-cf.behance.net/projects/808/95dbd7237855199.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/84415d237855199.6909577dc8bda.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/0db0b9237855199.6909577dcab97.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/698a0f237855199.6909577dcddc7.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/242ee0237855199.6909577dd03ee.jpg"
    ]
  },
  intune: {
    title: "Redesign Intune",
    category: "Redesign",
    date: "29 de outubro de 2025",
    tools: "Illustrator, Photoshop",
    link: "https://www.behance.net/gallery/237504015/Redesign-Intune",
    description:
      "Redesign criado para elevar o posicionamento visual da marca, transmitindo profissionalismo, clareza e modernidade sem perder a essência ligada à música, luz e emoção.",
    tags: ["Identidade Visual", "Logo Design", "Brand Identity", "Branding"],
    cover: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f5a4db237504015.69babb2d02c53.jpg",
    images: [
      "https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/004b8e237504015.69babb2d025cc.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2e386c237504015.69babb2d00b4c.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/33cea2237504015.69babb2d01226.jpg",
      "https://mir-s3-cdn-cf.behance.net/project_modules/1400/f5a4db237504015.69babb2d02c53.jpg"
    ]
  }
};

let lastFocusedElement = null;
let lastBudgetFocusedElement = null;
let currentBudgetPayload = null;

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  nav?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) return;
  nav.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
});

document.addEventListener("click", (event) => {
  const trigger = event.target instanceof HTMLElement ? event.target.closest("[data-project]") : null;
  if (!(trigger instanceof HTMLElement)) return;

  const project = projects[trigger.dataset.project];
  if (!project) return;

  openProjectModal(project, trigger);
});

document.addEventListener("click", (event) => {
  const closeTarget = event.target instanceof HTMLElement ? event.target.closest("[data-modal-close]") : null;
  if (closeTarget) closeProjectModal();
});

document.addEventListener("click", (event) => {
  const closeTarget = event.target instanceof HTMLElement ? event.target.closest("[data-budget-close]") : null;
  if (closeTarget) closeBudgetModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal && !projectModal.hidden) {
    closeProjectModal();
  }

  if (event.key === "Escape" && budgetModal && !budgetModal.hidden) {
    closeBudgetModal();
  }
});

function openProjectModal(project, trigger) {
  if (!projectModal || !modalCover || !modalCategory || !modalTitle || !modalDescription || !modalDate || !modalTools || !modalTags || !modalGallery || !modalLink) return;

  lastFocusedElement = trigger;
  modalCover.src = project.cover;
  modalCover.alt = `Imagem principal do projeto ${project.title}`;
  modalCategory.textContent = project.category;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalDate.textContent = project.date;
  modalTools.textContent = project.tools;
  modalLink.href = project.link;

  modalTags.innerHTML = "";
  project.tags.forEach((tag) => {
    const item = document.createElement("span");
    item.textContent = tag;
    modalTags.append(item);
  });

  modalGallery.innerHTML = "";
  project.images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = `${project.title} - imagem ${index + 1}`;
    img.loading = "lazy";
    modalGallery.append(img);
  });

  projectModal.hidden = false;
  document.body.classList.add("modal-open");
  projectModal.querySelector(".modal-close")?.focus();
}

function closeProjectModal() {
  if (!projectModal) return;

  projectModal.hidden = true;
  document.body.classList.remove("modal-open");

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  openBudgetModal();
});

function openBudgetModal() {
  if (!form || !budgetModal || !whatsappSend) return;

  const formData = new FormData(form);
  currentBudgetPayload = {
    nome: String(formData.get("nome") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    whatsapp: String(formData.get("whatsapp") || "").trim(),
    interesse: String(formData.get("interesse") || "").trim(),
    mensagem: String(formData.get("mensagem") || "").trim()
  };

  const text = [
    "Olá, Pedro! Quero solicitar um orçamento.",
    "",
    `Nome: ${currentBudgetPayload.nome}`,
    `E-mail: ${currentBudgetPayload.email}`,
    `WhatsApp: ${currentBudgetPayload.whatsapp}`,
    `Tipo de projeto: ${currentBudgetPayload.interesse}`,
    "",
    `Sobre a marca: ${currentBudgetPayload.mensagem}`
  ].join("\n");

  lastBudgetFocusedElement = document.activeElement;
  whatsappSend.href = `https://wa.me/5519981339057?text=${encodeURIComponent(text)}`;
  budgetModal.hidden = false;
  document.body.classList.add("modal-open");
  whatsappSend.focus();

  if (formStatus) {
    formStatus.textContent = "Escolha um canal para enviar seu orçamento.";
  }

  if (budgetStatus) {
    budgetStatus.textContent = "";
  }
}

function closeBudgetModal() {
  if (!budgetModal) return;

  budgetModal.hidden = true;
  document.body.classList.remove("modal-open");

  if (lastBudgetFocusedElement instanceof HTMLElement) {
    lastBudgetFocusedElement.focus();
  }
}

emailSend?.addEventListener("click", async () => {
  if (!currentBudgetPayload || !emailSend || !budgetStatus) return;

  emailSend.disabled = true;
  emailSend.classList.add("is-loading");
  budgetStatus.textContent = "Enviando orçamento por e-mail...";

  try {
    const response = await fetch("/.netlify/functions/send-budget-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(currentBudgetPayload)
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Não foi possível enviar o e-mail.");
    }

    budgetStatus.textContent = data.message || "Orçamento enviado por e-mail com sucesso.";
    form?.reset();
  } catch (error) {
    budgetStatus.textContent = error.message;
  } finally {
    emailSend.disabled = false;
    emailSend.classList.remove("is-loading");
  }
});

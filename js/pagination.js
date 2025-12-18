/* ==========================================================================
   PAGINATION MOTOR OF RENDERING AND NAVIGATION - FINAL CUADRADO PRO
   ========================================================================== */

import { state } from "./state.js";
import { ITEMS_PER_PAGE } from "./config.js";
import { openModal } from "./modal.js";

const results = document.getElementById("results");
const currentPageInput = document.getElementById("currentPageInput");
const totalPagesSpan = document.getElementById("totalPages");

// BOTONES
const firstBtn = document.getElementById("firstPage");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const lastBtn = document.getElementById("lastPage");

// Navegación
firstBtn.onclick = () => changePage(1);
prevBtn.onclick = () => changePage(state.currentPage - 1);
nextBtn.onclick = () => changePage(state.currentPage + 1);
lastBtn.onclick = () => changePage(state.totalPages);

currentPageInput.addEventListener("change", () => {
  changePage(Number(currentPageInput.value));
});

// Render principal
export function renderHeroes(heroesArray = state.heroes) {
  state.totalPages = Math.ceil(heroesArray.length / ITEMS_PER_PAGE) || 1;
  if (state.currentPage > state.totalPages) state.currentPage = 1;
  changePage(state.currentPage, heroesArray);
}

// =========================
// CONTROL DE BOTONES
// =========================
function updatePaginationButtons() {
  const isFirstPage = state.currentPage === 1;
  const isLastPage = state.currentPage === state.totalPages;

  toggleButton(firstBtn, isFirstPage);
  toggleButton(prevBtn, isFirstPage);
  toggleButton(nextBtn, isLastPage);
  toggleButton(lastBtn, isLastPage);
}

function toggleButton(button, disabled) {
  button.disabled = disabled;

  if (disabled) {
    button.classList.add(
      "bg-gray-600",
      "text-gray-300",
      "cursor-not-allowed",
      "pointer-events-none",
      "shadow-none"
    );
    button.classList.remove(
      "hover:bg-red-600",
      "hover:text-white",
      "hover:border-red-600"
    );
  } else {
    button.classList.remove(
      "bg-gray-600",
      "text-gray-300",
      "cursor-not-allowed",
      "pointer-events-none",
      "shadow-none"
    );
  }
}

// =========================
// CAMBIO DE PÁGINA
// =========================
function changePage(page, heroesArray = state.heroes) {
  if (page < 1 || page > state.totalPages) return;

  state.currentPage = page;
  currentPageInput.value = page;
  totalPagesSpan.textContent = `de ${state.totalPages}`;

  updatePaginationButtons();

  results.innerHTML = "";

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageHeroes = heroesArray.slice(start, start + ITEMS_PER_PAGE);

  pageHeroes.forEach((hero) => {
    const article = document.createElement("article");

    article.className = `
      relative overflow-hidden
      w-full aspect-square
      border-2 border-red-900
      rounded-2xl
      bg-cover bg-center
      shadow-2xl
      flex flex-col
      p-4
      text-center
      transition-all duration-300
      hover:-translate-y-2 hover:scale-105
    `;

    article.style.backgroundImage =
      "url('https://i.postimg.cc/6p96Bv9V/ultima.jpg')";

    const heroImage = hero.images?.md || hero.images?.sm;

    article.innerHTML = `
      <div class="absolute inset-0 bg-black/60 z-0"></div>

      <div class="relative z-10 flex flex-col h-full w-full items-center justify-between">

        <img
          src="${heroImage}"
          alt="${hero.name}"
          onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMEmXkhtTeyC51QGXIUtRq2SzA_oMkJTQgDg&s';"
          class="h-[65%] aspect-square object-cover rounded-full
                 border-4 border-red-600 bg-black
                 shadow-[0_0_22px_rgba(225,29,72,0.7)]"
        />

        <h3
          class="font-bold text-2xl text-white uppercase tracking-wide
                 truncate w-full px-2
                 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
          style="font-family: 'Bangers';"
        >
          ${hero.name}
        </h3>

        <button
          class="bg-red-600 text-white px-6 py-2 rounded-full
                 font-bold uppercase text-[10px] tracking-widest
                 transition-all
                 shadow-[0_4px_0_rgb(153,27,27)]
                 active:translate-y-1 active:shadow-none
                 hover:bg-white hover:text-red-600
                 border-2 border-transparent hover:border-red-600"
        >
          Ver Ficha
        </button>

      </div>
    `;

    article.querySelector("button").onclick = () => openModal(hero);
    results.appendChild(article);
  });
}

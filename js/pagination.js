/* ==========================================================================
   PAGINATION MOTOR OF RENDERING AND NAVIGATION - CORREGIDO
   ========================================================================== */
import { state } from "./state.js";
import { ITEMS_PER_PAGE } from "./config.js";
import { openModal } from "./modal.js";

const results = document.getElementById("results");
const currentPageInput = document.getElementById("currentPageInput");
const totalPagesSpan = document.getElementById("totalPages");

document.getElementById("firstPage").onclick = () => changePage(1);
document.getElementById("prevPage").onclick = () =>
  changePage(state.currentPage - 1);
document.getElementById("nextPage").onclick = () =>
  changePage(state.currentPage + 1);
document.getElementById("lastPage").onclick = () =>
  changePage(state.totalPages);

currentPageInput.addEventListener("change", () => {
  changePage(Number(currentPageInput.value));
});

export function renderHeroes(heroesArray = state.heroes) {
  state.totalPages = Math.ceil(heroesArray.length / ITEMS_PER_PAGE) || 1;
  if (state.currentPage > state.totalPages) state.currentPage = 1;
  changePage(state.currentPage, heroesArray);
}

function changePage(page, heroesArray = state.heroes) {
  if (page < 1 || (state.totalPages > 0 && page > state.totalPages)) return;

  state.currentPage = page;
  currentPageInput.value = page;
  totalPagesSpan.textContent = `de ${state.totalPages}`;

  results.innerHTML = "";

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageHeroes = heroesArray.slice(start, start + ITEMS_PER_PAGE);

  pageHeroes.forEach((hero) => {
    const article = document.createElement("article");

    // CORRECCIÓN: w-full y h-[380px] para que no se deformen al buscar
    article.className =
      "relative overflow-hidden border-2 border-red-900 rounded-xl p-4 text-center flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 bg-cover bg-center w-full aspect-square shadow-2xl";

    article.style.backgroundImage =
      "url('https://i.postimg.cc/6p96Bv9V/ultima.jpg')";

    const heroImage = hero.images.md || hero.images.sm;

    article.innerHTML = `
      <div class="absolute inset-0 bg-black/60 z-0"></div>

      <div class="relative z-10 flex flex-col items-center justify-between h-full w-full py-2">
        
        <div class="relative">
          <img 
            src="${heroImage}" 
            alt="${hero.name}" 
            onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMEmXkhtTeyC51QGXIUtRq2SzA_oMkJTQgDg&s';"
            class="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-red-600 shadow-[0_0_15px_rgba(225,29,72,0.5)] bg-black"
          >
        </div>    
        <h3 class="font-bold text-2xl md:text-3xl mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-wide uppercase truncate w-full px-2" style="font-family: 'Bangers';">
          ${hero.name}
        </h3>
        
        <button class="bg-red-600 hover:bg-white hover:text-red-600 text-white px-6 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all shadow-[0_4px_0_rgb(153,27,27)] active:translate-y-1 active:shadow-none border-2 border-transparent hover:border-red-600">
          Ver Ficha
        </button>
      </div>
    `;

    article.querySelector("button").onclick = () => openModal(hero);
    results.appendChild(article);
  });
}

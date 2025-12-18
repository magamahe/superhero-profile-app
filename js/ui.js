/* ===============================
   USER INTERFACE ORCHESTRATOR
   ============================= */

import { searchHeroes, getHeroById } from "./api.js";
import { state } from "./state.js";
import { renderHeroes } from "./pagination.js";
import { quotes } from "./frases.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Central de Inteligencia: Online - akabab Version");

  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const orderSelect = document.getElementById("orderSelect");
  const totalResults = document.getElementById("totalResults");
  const resultsContainer = document.getElementById("results");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const heroModal = document.getElementById("heroModal"); // Aseguramos capturar el modal

  // --- SISTEMA SCROLL-TOP ---
  window.addEventListener("scroll", () => {
    if (window.scrollY > 700) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.transform = "translateY(0)";
      scrollTopBtn.style.pointerEvents = "auto";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.transform = "translateY(80px)";
      scrollTopBtn.style.pointerEvents = "none";
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 800, behavior: "smooth" });
  });

  /* LÓGICA DE ORDENAMIENTO */
  function sortHeroes() {
    state.heroes.sort((a, b) =>
      state.order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    totalResults.textContent = `Resultados: ${state.heroes.length}`;
  }

  /* MANEJADOR DE BÚSQUEDA */
  async function handleSearch() {
    const query = searchInput.value.trim();

    // Si la búsqueda está vacía, no hace nada o carga inicial
    if (!query) {
      loadInitialHeroes();
      return;
    }

    resultsContainer.innerHTML = `
    <div class="loader-container col-span-full flex flex-col items-center py-10">
      <span class="loader"></span>
      <p class="mt-4 text-red-500 font-bold animate-pulse tracking-widest uppercase text-center">
        Buscando en la base de datos...
      </p>
    </div>
  `;

    try {
      const results = await searchHeroes(query);
      state.heroes = results;
      state.currentPage = 1;

      //llamamos a render para mantener el formato
      sortHeroes();
      renderHeroes();

      // LIMPIEZA DEL INPUT: Se hace después de procesar la búsqueda
      searchInput.value = "";

      if (results.length === 0) {
        resultsContainer.innerHTML = `
        <p class="col-span-full text-center text-gray-500 py-10 border-2 border-dashed border-gray-800 rounded-xl">
          No se encontraron héroes llamados "${query}"
        </p>`;
      }
    } catch (error) {
      resultsContainer.innerHTML =
        '<p class="col-span-full text-center text-red-500">Error en la búsqueda.</p>';
    }
  }

  /* SISTEMA DE CITAS ALEATORIAS */
  function displayRandomQuote() {
    const quoteElement = document.getElementById("heroQuote");
    if (quoteElement) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const selectedQuote = quotes[randomIndex];
      quoteElement.innerHTML = `
        ${selectedQuote.texto}
        <span class="block mt-4 text-red-500 text-sm md:text-base font-bold uppercase tracking-widest font-sans">
          — ${selectedQuote.autor} —
        </span>
      `;
    }
  }

  /* CARGA INICIAL (BOOTSTRAP)*/
  async function loadInitialHeroes() {
    resultsContainer.innerHTML = `
      <div class="loader-container col-span-full flex flex-col items-center py-10">
        <span class="loader"></span>
        <p class="mt-4 text-red-500 font-bold animate-pulse tracking-widest">CONECTANDO CON EL MULTIVERSO...</p>
      </div>
    `;

    try {
      const allHeroes = await searchHeroes("");
      state.heroes = allHeroes;

      sortHeroes();
      renderHeroes();
    } catch (error) {
      console.error(error);
      resultsContainer.innerHTML =
        '<p class="col-span-full text-center text-red-500">Error al conectar con la Atalaya.</p>';
    }
  }

  // --- REGISTRO DE EVENTOS ---

  // Corregido: Ahora el botón de buscar también limpia el input
  searchBtn.addEventListener("click", handleSearch);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  // Corregido: Evento de cierre de modal con reset de paginación
  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      heroModal.close();

      // Resetear estado de paginación
      state.currentPage = 1;
      const pageInput = document.getElementById("currentPageInput");
      if (pageInput) {
        pageInput.value = 1;
      }

      // Volver a la carga inicial para limpiar filtros de búsqueda
      loadInitialHeroes();
    });
  }

  orderSelect.addEventListener("change", () => {
    state.order = orderSelect.value;
    sortHeroes();
    renderHeroes();
  });

  displayRandomQuote();
  loadInitialHeroes();
});

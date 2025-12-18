/* ==========================================================================
   API FUNCTIONS TO INTERACT WITH SUPERHERO API - Versión akabab -
   ========================================================================== */

import { BASE_URL } from "./config.js";

// Variable global para cachear los datos y no descargar el JSON cada vez
let allHeroesCache = [];

/* Función auxiliar para obtener todos los héroes una sola vez. */
async function getAllHeroes() {
  if (allHeroesCache.length > 0) return allHeroesCache;

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Error al cargar la base de datos");
    allHeroesCache = await response.json();
    return allHeroesCache;
  } catch (error) {
    console.error("Error en la API:", error);
    return [];
  }
}

// FUNCIÓN 1: Para el buscador (por nombre)
export async function searchHeroes(query) {
  const heroes = await getAllHeroes();

  if (!query) return heroes; // Si no hay búsqueda, devuelve todos

  // Filtramos localmente por nombre
  const searchTerm = query.toLowerCase();
  return heroes.filter((hero) => hero.name.toLowerCase().includes(searchTerm));
}

// FUNCIÓN 2: Para la carga inicial o detalle (por ID)
export async function getHeroById(id) {
  const heroes = await getAllHeroes();

  // Buscamos el héroe por ID dentro del array (el ID de la API es numérico)
  const hero = heroes.find((h) => h.id == id);
  return hero || null;
}

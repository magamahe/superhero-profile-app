/* ==========================================================================
   STATE MANAGEMENT MODULE (Módulo de Gestión de Estado)
   ========================================================================== */

export const state = {
  // Almacenamos los heroes de la API
  heroes: [],

  // Controla el índice de la página actual
  currentPage: 1,

  // Se calculará dinámicamente dividiendo el total de héroes por ITEMS_PER_PAGE
  totalPages: 1,

  // Define el criterio de ordenamiento actual ('asc' o 'desc')
  order: "asc",
};
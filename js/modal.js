/* ==========================================================================
   SISTEMA DE MODAL FINAL - COMPACTO Y SIN SCROLL
   ========================================================================== */
/* ==========================================================================
   SISTEMA DE MODAL FINAL - COMPACTO Y SIN SCROLL
   ========================================================================== */
const modal = document.getElementById("heroModal");

export function openModal(hero) {
  // 1. Imagen y Encabezado
  const imgElement = document.getElementById("modalImage");
  imgElement.src = hero.images.lg || hero.images.md;
  
  document.getElementById("modalName").textContent = hero.name;
  document.getElementById("modalRealName").textContent = hero.biography.fullName || "Identidad Secreta";

  // 2. Expediente
  document.getElementById("modalOccupation").textContent = hero.work.occupation || "N/A";
  document.getElementById("modalBirth").textContent = hero.biography.placeOfBirth || "N/A";
  document.getElementById("modalAliases").textContent = hero.biography.aliases?.join(", ") || "Ninguno";
  document.getElementById("modalConnections").textContent = hero.connections.groupAffiliation || "Sin datos";

  // 3. Powerstats (Diseño de la imagen)
  const statsContainer = document.getElementById("modalStats");
  statsContainer.innerHTML = ""; 

  const statColors = {
    intelligence: "bg-blue-600",
    strength: "bg-red-600",
    speed: "bg-yellow-500",
    durability: "bg-green-600",
    power: "bg-purple-600",
    combat: "bg-orange-600",
  };

  Object.entries(hero.powerstats).forEach(([key, value]) => {
    const val = value || 0;
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="flex justify-between items-center mb-1">
        <span class="text-[10px] font-bold uppercase text-gray-300">${key}</span>
        <span class="text-[10px] font-bold text-white">${val}%</span>
      </div>
      <div class="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
        <div class="${statColors[key] || 'bg-gray-500'} h-full transition-all duration-1000" style="width: ${val}%"></div>
      </div>
    `;
    statsContainer.appendChild(li);
  });

  // 4. Biometría
  document.getElementById("modalHeight").textContent = hero.appearance.height[1] || "---";
  document.getElementById("modalWeight").textContent = hero.appearance.weight[1] || "---";

  modal.showModal();
}

document.getElementById("closeModal").onclick = () => modal.close();
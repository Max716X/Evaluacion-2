const pokedex = document.getElementById("pokedex");

async function cargarPokemones() {
  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await respuesta.json();

    for (const pokemon of data.results) {
      const res = await fetch(pokemon.url);
      const info = await res.json();

      const tipos = info.types.map(t => t.type.name).join(", ");
      const div = document.createElement("div");
      div.classList.add("col-6", "col-md-3");

      div.innerHTML = `
        <div class="card bg-white shadow-sm">
          <img src="${info.sprites.front_default}">
          <h5>${info.name}</h5>
          <p>#${info.id}</p>
          <p>Tipo: ${tipos}</p>
        </div>
      `;

      pokedex.appendChild(div);
    }
  } catch (error) {
    console.log("Error al cargar los Pokémon:", error);
  }
}

cargarPokemones();


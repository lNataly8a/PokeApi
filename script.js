let pokemon1 = null;

function buscarPokemon() {
    const nombre = document.getElementById('nombrePokemon').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            return response.json();
        })
        .then(data => {
            pokemon1 = {
                name: data.name,
                image: data.sprites.front_default,
            };
            mostrarPokemon(pokemon1);
        })
        .catch(error => {
            alert(error.message);
            pokemon1 = null;
            document.getElementById('resultado').innerHTML = '';
        });
}

function mostrarPokemon(pokemon) {
    const contenedor = document.getElementById('resultado');
    contenedor.innerHTML = `<div class=pokemonImagen><h3>${pokemon.name}</h3> 
    <img src='${pokemon.image}'alt='${pokemon.name}'/></div>`;
}

function guardarPokemonFavorito() {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (pokemon1 && !favoritos.some(p => p.name === pokemon1.name)) {
        favoritos.push(pokemon1);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        alert('Pokemon guardado correctamente');
        updateFavoritesList();
    } else if (favoritos.some(p => p.name === pokemon1.name)) {
        alert('Este Pokemon ya está guardado como favorito');
    } else {
        alert('No hay Pokemon para guardar');
    }
}

function updateFavoritesList() {
    const contenedor = document.getElementById('favoritos');
    contenedor.innerHTML = '';

    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    favoritos.forEach((pokemon, index) => {
        const div = document.createElement('div');
        div.className = 'pokemonImagen';
        div.innerHTML = `
            <h3>${pokemon.name}</h3>
            <img src="${pokemon.image}" alt="${pokemon.name}" />
            <br>
            <button onclick="eliminarFavorito(${index})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

function mostrarPokemonFavorito(pokemon1) {
    const pokemonGuardado = localStorage.getItem('pokemon1');
    if (pokemonGuardado) {
        const pokemon = JSON.parse(pokemonGuardado);
        const contenedor = document.getElementById('favoritos')
        contenedor.innerHTML = 
        `<div class=pokemonImagen><h3>${pokemon1.name}</h3> 
        <img src='${pokemon1.image}'alt='${pokemon1.name}'/></div>`

    } else {
        alert('No hay Pokemon guardado');
    }
}

function eliminarFavorito(indice) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    favoritos.splice(indice, 1); // Elimina el Pokémon en esa posición

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    updateFavoritesList(); // Actualiza la lista en pantalla
}

window.onload = updateFavoritesList;
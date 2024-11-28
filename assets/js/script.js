const pokemonOl = document.getElementById('pokemonList');
const lernMore = document.getElementById('bttMore');

const maxLimitPage = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
           <span class="name">${pokemon.name}</span>
            <span>#${pokemon.number}</span>
            <div class="status">
                <ul>
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ul>
            </div>
            <div class="img-pokemon">
                <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadMorepage(offset, limit) {
    pokemonApi.getpokemons(offset, limit).then((pokemons = []) => {
        pokemonOl.innerHTML += pokemons.map(convertPokemonToLi).join('');
    })
}



loadMorepage(offset, limit);

lernMore.addEventListener('click', () => {
    offset += limit;

    const loadMaxPage = offset + limit;

    if(loadMaxPage >= maxLimitPage) {
        const maxPokemon = maxLimitPage - offset;
        loadMorepage(offset ,maxPokemon);

        lernMore.parentElement.removeChild(lernMore);

        return
    } else {
        loadMorepage(offset, limit);
    }
})




//  fetch(url)
//      .then((reponse) => reponse.json())
//      .then((jsonBody) => jsonBody.results)
//      .then((pokemonList) => {
//          for (let i = 0; i < pokemonList.length; i++) {
//              const pokemon = pokemonList[i];                          // <=== Código reduzido; Veja acima                                                                     // PODEMOS REDUZIR O CÓDIGO!
//              pokemonOl.innerHTML += convertPokemonToLi(pokemon);
//          }
//      })

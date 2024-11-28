
const pokemonApi = {}

function convertPokemonModelToPokemon(pokeModel) {
    const pokemon = new Pokemon();

    pokemon.number = pokeModel.id;
    pokemon.name = pokeModel.name;

    const types = pokeModel.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeModel.sprites.other.dream_world.front_default;

    return pokemon;
}

pokemonApi.getpokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonModelToPokemon)
}

pokemonApi.getpokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokemonApi.getpokemonDetails))
        .then((listRequest) => Promise.all(listRequest))
        .then((pokemonList) => pokemonList)
}
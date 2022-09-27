const pokemonTypesHTML = (types) => {

    const pokemonTypeCod = types.reduce((accumulator, { type: { name } }) => {
        accumulator += `
            <span class="type ${name}">
                ${name.charAt(0).toUpperCase()}${name.slice(1)}
            </span>`

        return accumulator
        
    }, '')

    return pokemonTypeCod
}

const fetchPokemon = () => {
    const URL = "https://pokeapi.co/api/v2/pokemon/"
    const ARTURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

    const pokemonPromises = []

    for (let i = 1; i <= 151; i++) {
        // Array de promises
        pokemonPromises.push(fetch(URL + i).then(res => res.json()))
    }

    // Recebendo o resultado de todas as promises juntas
    Promise.all(pokemonPromises)
        .then((pokemons) => {

            // transformando o valor do array em string
            const pokemonCards = pokemons.reduce((accumulator, { name, id, types }) => {

                const nameFormated = name.charAt(0).toUpperCase() + name.slice(1)

                accumulator += `
                    <article class="pokemon">
                        <figure>
                            <img class="pokemon-image" src="${ARTURL}${id}.png" alt="${nameFormated}"'>
                        </figure>
                        <div class="pokemon-info">
                            <p>
                                <span class="number">N°${id}</span>
                            </p>
                            <h2>${nameFormated}</h2>
                            <div class="pokemon-types">
                                ${pokemonTypesHTML(types)}
                            </div>
                        </div>
                    </article>
                `

                return accumulator
            }, '')

            const pokemonContainer = document.querySelector(".pokemons-container")

            pokemonContainer.innerHTML = pokemonCards
        })
}

fetchPokemon()


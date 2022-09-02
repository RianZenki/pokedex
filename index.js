const fetchPokemon = () => {
    const URL = "https://pokeapi.co/api/v2/pokemon/ditto"
    const artURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
    
    fetch(URL)
        .then(res => res.json())
        .then(({name, types}) => console.log(name, types[0].type.name))
}

fetchPokemon()

const audioClick = () => {
    const sus = document.querySelector("#sus")

    sus.addEventListener("click", playAudio)
}

const playAudio = () => {
    const player = document.querySelector(".audio")
    player.play();
}

audioClick()
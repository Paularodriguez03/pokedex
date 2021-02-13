const poke_container = document.getElementById('poke-container')
const pokemon_count = 150//cantidad de pokemones que muestra
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)
//una matriz que asigan a los componentes de la constante colors como 
//keys

console.log(main_types)
//al ver el console.log es como agregar todo los elementos de este string en un array

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i)
    /*mientas que i sea menor o igual a 150 entonces a i se le va a ir sumenado 1
    en cada bucle */
    }
}
//ejecuta un ciclo for que nos ejecuta el llamadoo a la API 150 veces

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    //se cre una constante que tiene la api y a esta se le pude el id de cada pokemon
    const res = await fetch(url)
    //a resultado se le asigna que espere el contenido pedido a la url
    const data = await res.json()
    //espera que llege para convertirlo a un formato.json y lo almacena en data
    //en este data ya se tiene el nombre y linkeado dentro otra url con mas información
    //aunque de esta url solo se trae el tipo

    createPokemonCard(data)
    //ejecuta la funcion con la informacion de data
}


//Para crear la carta

const createPokemonCard = (pokemon) => {
    const pokemon1 = document.createElement('div')
    //en la constante pokemon1 se le asuga la creacion de un div en el html
    pokemon1.classList.add('pokemon')
    //a esta mismo se le asigna la clase pokemon


    const src =  pokemon.sprites.other.dream_world.front_default;
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    //en la contante nombre se llama desde la api la infromacion del nombre del pokemon 
    //la letra que este en el puesto o de los nombre va a estar en mayuscula 
    //luego se crea una copia de todo lo que este depues el elementos en la poscicion 1
    //asi se deja la primer aletra de cada numero en mayuscula
    const id = pokemon.id.toString().padStart(3, '0')
    //toString()-Devuelve una cadena que representa al objeto.

    const poke_types = pokemon.types.map(type => type.type.name)
    //se crea una constante para almacenar le imfomacion traida de cada elemento 
    //pokemon. de la carpeta types me va a recorrer el mimo y traer me 
    //el nombre de la carpeta type 

    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    //en esa matriz (array) que se creo buscamos el elemento type dentro de la constante
    //poke_types y se ejecuta el metodo indexOf para 

    //indexOf()devuelve el índice, dentro del objeto String que realiza la llamada, de la primera ocurrencia del valor especificado, comenzando la búsqueda desde indiceDesde; o -1 si no se encuentra dicho valor.
    const color = colors[type]
    //se crea una constante color que toma el valor de colors que concida con el type

    pokemon1.style.backgroundColor = color
    //asigna es color como findo segun el pokemon

    //Se crean elementos a renderizar en el html que llaman la info de la API
    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="${src}" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span> </small>
    </div>
    `
    //<img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
    //las imagenes son traidas desde otra API
    // en esta imagne se trage una url de img y se remplaza el numero por el id para que sea 
    // util en todos los pokemones


    pokemon1.innerHTML = pokemonInnerHTML
    //en el div creado por la contante pokeomn1 se renderiza o visualiza lo contruido en el 
    //pokemonInnerHTML

    poke_container.appendChild(pokemon1)
    //se le asiga el div del pokemon1 como hijo a la constante poke_container
}

fetchPokemons()
//se ejecuta para que se agregan pokemones hasta llegar al 150
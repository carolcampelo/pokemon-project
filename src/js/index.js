const changeThemeButton = document.querySelector('#change-theme-button');
const body = document.querySelector('body');
const changeThemeButtonImage = document.querySelector('.button-image')

changeThemeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    body.classList.contains('dark-mode') 
        ? changeThemeButtonImage.setAttribute('src', './src/images/moon.png') 
        : changeThemeButtonImage.setAttribute('src', './src/images/sun.png');
});

let pokemons = new Array(151);

// Function to fetch information about a Pokemon by ID
async function getPokeInfos(idNumber) {

    const pokemonInfos = await fetch(`https://pokeapi.co/api/v2/pokemon/${idNumber}/`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => data);

    const pokemonDescriptionInfos = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idNumber}/`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => data);

    let pokemon = {
      id: idNumber,
      name: pokemonInfos.name,
      gif: pokemonInfos.sprites.versions['generation-v']['black-white'].animated.front_default,
      types: [],
      description: (pokemonDescriptionInfos.flavor_text_entries[4].flavor_text).replace(/\n/g, ' ').replace(/\f/g, ' '),
    }

    if (pokemonInfos.types && Array.isArray(pokemonInfos.types)) {
      // Iterate over the 'types' array and extract the 'name' property
      pokemonInfos.types.forEach(function(typeObj) {
        if (typeObj.type && typeObj.type.name) {
          const capitalizedType = capitalizeFirstLetter(typeObj.type.name);
          pokemon.types.push(capitalizedType);
        }
      });
    }
    pokemons[idNumber - 1] = pokemon;
}

function createPokemonCard(pokemon) {
  // Create the li element for the Pokemon card
  let card = document.createElement('li');
  card.className = 'pokemon-card';

  // Create the div element for the Pokemon's information
  let infoDiv = document.createElement('div');
  infoDiv.className = 'infos';

  // Create the span element for the Pokemon's name
  let nameSpan = document.createElement('span');
  nameSpan.textContent = pokemon.name;
  infoDiv.appendChild(nameSpan);

  // Create the span element for the Pokemon's ID
  let idSpan = document.createElement('span');
  idSpan.textContent = '#' + pokemon.id;
  infoDiv.appendChild(idSpan);

  // Add the information to the card
  card.appendChild(infoDiv);

  // Create the img element for the Pokemon's image
  let image = document.createElement('img');
  image.src = pokemon.gif;
  image.alt = pokemon.name;
  image.className = 'gif';
  card.appendChild(image);

  // Create the unordered list for the Pokemon's types
  let typesUl = document.createElement('ul');
  typesUl.className = 'types';

  // Iterating over the types and creating corresponding li elements
  pokemon.types.forEach(function(type) {
    let typeLi = document.createElement('li');
    typeLi.className = uncapitalizeFirstLetter(type) + ' type';
    typeLi.textContent = type;
    typesUl.appendChild(typeLi);
  });

  // Add the types to the card
  card.appendChild(typesUl);

  // Create the p element for the Pokemon's description
  let descriptionP = document.createElement('p');
  descriptionP.className = 'description';
  descriptionP.textContent = pokemon.description;
  card.appendChild(descriptionP);

  // Add the card to the existing ul element with the class "pokemon-list"
  let pokemonList = document.querySelector('.pokemon-list');
  pokemonList.appendChild(card);
}

// Function to capitalize the first letter of each word
function capitalizeFirstLetter(string) {
  return string.replace(/\b\w/g, function(match) {
    return match.toUpperCase();
  });
}

function uncapitalizeFirstLetter(string) {
  return string.replace(/\b\w/g, function(match) {
    return match.toLowerCase();
  });
}

let promises = [];
for (let i = 1; i <= 151; i++) {
  promises.push(getPokeInfos(i));
}

Promise.all(promises)
  .then(() => {
    // Create a card for each pokemon
    pokemons.forEach((pokemon) => {
      if (pokemon) {
        createPokemonCard(pokemon);
      }
    });
    console.log('Todos os Pokémons foram carregados em ordem.');
  })
  .catch((error) => console.log('Ocorreu um erro: ', error));
  
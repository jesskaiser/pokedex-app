//pokemonRepository variable to hold what the  IIFE will return, then assign the IIFE to that variable
let pokemonRepository = (function() {
  // create pokemonList array and added Pokemon objects to it
  let pokemonList = [{
      name: 'Bulbasaur',
      height: 0.7,
      type: ['grass', 'poison']
    },
    {
      name: 'Ivysaur',
      height: 1.0,
      type: ['grass', 'poison']
    },
    {
      name: 'Venusaur',
      height: 2.0,
      type: ['grass', 'poison']
    },
    {
      name: 'Charmander',
      height: 0.6,
      type: 'fire'
    },
    {
      name: 'Charmeleon',
      height: 1.1,
      type: 'fire'
    },
    {
      name: 'Charizard',
      height: 1.7,
      type: ['fire', 'flying']
    },
  ];
  //add a single item to the pokemonList array
  function add(pokemon) {
    //check if the pokemon is an object and has the same number of keys as the first item in the list ( === 3)
    if (typeof pokemon === 'object' && Object.keys(pokemon).length === Object.keys(pokemonList[0]).length) {
      //check if each key is the same as in the pokemonList (name, height and type)
      if (Object.prototype.hasOwnProperty.call(pokemon, 'name')) {
        if (Object.prototype.hasOwnProperty.call(pokemon, 'height')) {
          if (Object.prototype.hasOwnProperty.call(pokemon, 'type')) {
            pokemonList.push(pokemon);
          }
        }
      }
    }
  }

  function addListItem(pokemon) {
    //  let text = pokemon.name + ' (height: ' + pokemon.height + ') ';
    let pokemonList = document.querySelector('.pokemon-list');
    //  if (pokemon.height > 1.7) {
    //add label to the biggest Pokemon 
    //  text += '<p>- Wow, that\'s big!</p>';
    // }
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = pokemon.name;
    button.classList.add('button');
    //add pokemon name as ID to li item
    listItem.setAttribute('id', `${pokemon.name}`);
    listItem.appendChild(button);
    //add eventlistener to button click
    button.addEventListener('click', function () {
      displayPokemon(button, pokemon);
    });
    pokemonList.appendChild(listItem);
  }

  //event listener function for button click
  function displayPokemon(button, pokemon) {
    showDetails(pokemon);
  }

  //show pokemon details
  function showDetails(pokemon) {
    console.log(pokemon.name);
    //test
    //document.getElementById(`${pokemon.name}`).firstElementChild.style.background = '#acdade';
  }

  //return all items from pokemonList
  function getAll() {
    return pokemonList;
  }
  
  return {
    add: add,
    addListItem: addListItem,
    displayPokemon: displayPokemon,
    showDetails: showDetails,
    getAll: getAll
  }
})();

//test the add function
pokemonRepository.add({
  name: 'Pikachu',
  height: 0.3,
  type: 'electric'
});

//create a for loop to iterate over the pokemonList and write to DOM, creating separate <div> for each element for styling
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  //create separate <div> for each element with div id set to name -> for CSS styling
  // document.write(`<div id="${pokemon.name}"> ${text} </div>`);
});

//find a pokemon in the list, if it exists find its div id and change its background color 
let findPokemon = function(name) {
  //create an arraylist of pokemon names for filter function
  let pokemonNames = [];
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonNames.push(pokemon.name);
  })
  //filter function to find a pokemon's name on the pokemonNames list
  pokemonNames.filter(function(pokemon) {
    if (pokemon === name) {
      document.getElementById(`${pokemon}`).firstElementChild.style.background = '#acdade';
      console.log(pokemon + ' is found');
    }
  })
};
//test the findPokemon function
//findPokemon('Ivysaur');
//findPokemon('Bulbasaur');
//findPokemon('ladida');

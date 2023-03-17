//pokemonRepository variable to hold what the  IIFE will return, then assign the IIFE to that variable
let pokemonRepository = (function() {
  // create an empty pokemonList array
  let pokemonList = [];
  //API to load from
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //add a single item to the pokemonList array
  function add(pokemon) {
    //check if the pokemon is an object and has name and detailsUrl keys
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
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
    //Pokemon names to start with uppercase letter
    button.innerText = pokemon.name.charAt(0).toUpperCase()+pokemon.name.slice(1);
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
    loadDetails(pokemon).then(function () {
      console.log(pokemon.name);
    });
  }

  //return all items from pokemonList
  function getAll() {
    return pokemonList;
  }
  //load the list of Pokemon, fetch data from API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      //method: 'GET'
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        hideLoadingMessage();
      });
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    })
  }
  //load detailed data of a pokemon
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }
  //show a loading message 
  function showLoadingMessage() {
    let loadingMessage = document.querySelector('.loading-message');
    loadingMessage.classList.remove('hidden');
  }
  //hide a loading message
  function hideLoadingMessage() {
    let loadingMessage = document.querySelector('.loading-message');
    loadingMessage.classList.add('hidden');
  }

  return {
    add: add,
    addListItem: addListItem,
    displayPokemon: displayPokemon,
    showDetails: showDetails,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  }
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  //create a for loop to iterate over the pokemonList and write to DOM
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
    //create separate <div> for each element with div id set to name -> for CSS styling
    // document.write(`<div id="${pokemon.name}"> ${text} </div>`);
  });
});

//find a pokemon in the list, if it exists find its div id and change its background color 
let findPokemon = function (name) {
  //set name to start with lower case
  name = name.charAt(0).toLowerCase() + name.slice(1);
   //create an arraylist of pokemon names for filter function
  let pokemonNames = [];
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonNames.push(pokemon.name);
    })
    console.log(pokemonNames);
    //filter function to find a pokemon's name on the pokemonNames list
    pokemonNames.filter(function (pokemon) {
      if (pokemon === name) {
        document.getElementById(`${pokemon}`).firstElementChild.style.background = '#acdade';
        console.log(name + ' is found');
      }
    })
})
};

pokemonRepository.loadList().then(function() {
  // Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
//test the findPokemon function
//findPokemon('Ivysaur');
//findPokemon('bulbasaur');
//findPokemon('ladida');

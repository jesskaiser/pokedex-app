//pokemonRepository variable to hold what the  IIFE will return, then assign the IIFE to that variable
let pokemonRepository = (function () {
  // create pokemonList array and added Pokemon objects to it
  let pokemonList = [
    { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
    { name: 'Ivysaur', height: 1.0, type: ['grass', 'poison'] },
    { name: 'Venusaur', height: 2.0, type: ['grass', 'poison'] },
    { name: 'Charmander', height: 0.6, type: 'fire' },
    { name: 'Charmeleon', height: 1.1, type: 'fire' },
    { name: 'Charizard', height: 1.7, type: ['fire', 'flying'] },
  ];
  return {
    //add a single item to the pokemonList array 
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    //return all items from pokemonList
    getAll: function () {
      return pokemonList;
    }
  }
})();
//create a for loop to iterate over the pokemonList and write to DOM, creating separate <div> for each element for styling
pokemonRepository.getAll().forEach(function(pokemon) {
  let text = pokemon.name + ' (height: ' + pokemon.height + ') ';
  if (pokemon.height > 1.7) {
    //add label to the biggest Pokemon 
    text += '<p>- Wow, that\'s big!</p>';
  }
   //create separate <div> for each element -> for CSS styling
  document.write(`<div> ${text} </div>`);
});


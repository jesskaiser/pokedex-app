// create pokemonList array and added Pokemon objects to it
let pokemonList = [
  { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
  { name: 'Ivysaur', height: 1.0, type: ['grass', 'poison'] },
  { name: 'Venusaur', height: 2.0, type: ['grass', 'poison'] },
  { name: 'Charmander', height: 0.6, type: 'fire' },
 { name: 'Charmeleon', height: 1.1, type: 'fire' },
  { name: 'Charizard', height: 1.7, type: ['fire', 'flying'] },
];

//create a for loop to iterate over the pokemonList and write to DOM, creating separate <div> for each element for styling
let i = 0;
let text = '';
for (; pokemonList[i];) {
  text = pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ';
  if (pokemonList[i].height > 1.7) {
    //add label to the biggest Pokemon 
    text += '<p>- Wow, that\'s big!</p>';
  }
    //create separate <div> for each element -> for CSS styling
  document.write(`<div> ${text} </div>`);
  i++;
}


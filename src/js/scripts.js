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
    pokemonRepository.loadDetails(pokemon).then(function () {
      let pokemonList = document.querySelector('.list-group');
      //pokemonList.classList.add('d-grid');
      //pokemonList.classList.add('d-grid');
      //  if (pokemon.height > 1.7) {
      //add label to the biggest Pokemon
      //  text += '<p>- Wow, that\'s big!</p>';
      // }
      let newDiv = document.createElement('div');
      //newDiv.setAttribute('class', 'd-flex');
      let listItem = document.createElement('li');
      listItem.classList.add('d-flex', 'flex-column-reverse','justify-center','list-group-item');
      //listItem.classList.add("list-group-item", "text-center", "border-0");

      let button = document.createElement('button');
      button.setAttribute('type', 'button');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#exampleModal');

      //button.type = 'button';
      button.classList.add('btn', 'btn-pokemon');
      //add pokemon name as ID to li item
      listItem.setAttribute('id', `${pokemon.name}`);

      let listItemImageFront = document.createElement('img');

      listItemImageFront.setAttribute('src', pokemon.imageUrlFront);
      listItemImageFront.setAttribute('alt', `image of ${pokemon.name}`);
      listItemImageFront.setAttribute('class', 'pokemon-image');

      //add eventlistener to button click
      button.addEventListener('click', function () {
        displayPokemon(pokemon);
      });
      //Pokemon names to start with uppercase letter
      button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

      newDiv.appendChild(listItem);
      listItem.appendChild(listItemImageFront);
      listItem.appendChild(button);
      pokemonList.appendChild(newDiv);
    })

  }

  //event listener function for button click
  function displayPokemon(pokemon) {
    showDetails(pokemon);
  }

  //show pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      // console.log(pokemon.name);
      showModal(pokemon);
    });
  }

//modalContainer
  let modalContainer = document.querySelector('#exampleModal');

  function showModal(pokemon) {

    let titleElement = $('.modal-title');
    let bodyElement = $('.modal-body');
    let headerElement = $('.modal-header');
    let footerElement = $('.modal-footer');

    titleElement.empty();
    bodyElement.empty();
    footerElement.empty();

    headerElement.attr('class', 'modal-header row');
    titleElement.attr('id', 'title');
    titleElement.attr('class', 'modal-title col');
    let pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    //Pokemon height
    let textElement = $('<div class="col-6 align-self-center">' + '</div>');
    let heightElement = $(`<p><span class="text-style">Height</span>: ${pokemon.height}</p>`);
    let weightElement = $(`<p><span class="text-style">Weight</span>: ${pokemon.weight}</p>`);

    //Pokemon type
    let typeElement = $(`<p><span class="text-style">${`Type(s)</span>: ${pokemon.types[0].type['name']}`}</p>`);
    //If there are two types
    if (pokemon.types[1]) {
      typeElement.append(`, ${pokemon.types[1].type['name']}`);
    }
    //Abilities
    let abilityElement = $(`<p><span class="text-style">${`Abilities</span>: ${pokemon.abilities[0].ability['name']}`}</p>`);
    if (pokemon.abilities[1]) {
      abilityElement.append(`, ${pokemon.abilities[1].ability['name']}`);
    }

    bodyElement.attr('class', 'modal-body justify-content-between align-items-center row');

    //Add image to the modal
    //Front view
    let imageElementFront = $('<img>', {
      class: 'img-fluid modal-img col',
      src: pokemon.imageUrlFront,
      alt: 'front view of '+ pokemonName
    });
    //Rear view
    let imageElementBack = $('<img>', {
      class: 'img-fluid modal-img col hidden',
      src: pokemon.imageUrlBack,
      alt: 'rear view of '+ pokemonName
    });
    //Image flip button
    let flipButton = $('<button />', {
      type: 'button',
      id: 'flip',
      class: 'btn btn-secondary footer-button col',
      text: 'Flip ' + pokemonName
    });
    flipButton.attr('aria-label', 'Flip pokemon image');
    //Modal close
    let closeButton = $('<button />', {
      type: 'button',
      class: 'btn btn-close btn-secondary footer-button col',
      text: 'Close'
    });
    closeButton.attr('aria-label', 'Close');
    closeButton.attr('data-dismiss', 'modal');

    footerElement.attr('class', 'modal-footer row');

    headerElement.append(titleElement.append(pokemonName));
    bodyElement.append(imageElementFront, imageElementBack, textElement.append(heightElement, weightElement, typeElement, abilityElement));
    footerElement.append(flipButton, closeButton);

    //Button click, with delegated event handler
    $('#exampleModal').on('click', '#flip', function () {
      imageElementFront.toggleClass('hidden');
      imageElementBack.toggleClass('hidden');
    });
  }

  //Close the modal
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = details.abilities;
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
    $("#search-input").on("input", function () {
    let inputValue = $("#search-input").val().toLowerCase();
    findPokemon(inputValue);
  });

    return {
      add: add,
      addListItem: addListItem,
      displayPokemon: displayPokemon,
      showDetails: showDetails,
      showModal: showModal,
      hideModal: hideModal,
      getAll: getAll,
      loadList: loadList,
      loadDetails: loadDetails,
      showLoadingMessage: showLoadingMessage,
      hideLoadingMessage: hideLoadingMessage
    };
})();

//find a pokemon in the list
let findPokemon = function (name) {
  name = name.toLowerCase();
  //filter function to find a pokemon's name on the pokemonNames list
  $(".list-group-item button").filter(function () {
     $(this).parent().closest('div').toggle($(this).text().toLowerCase().indexOf(name) > -1);
  })
};

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  //create a for loop to iterate over the pokemonList and write to DOM
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
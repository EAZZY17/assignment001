// ChatGPT Conversation Links:
// 1. https://chatgpt.com/share/67fdec87-2f88-800f-8dd6-3fa949685a05 
// 2.
// Add as many links as needed

// PokeAPI - https://pokeapi.co/


// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const toggleFavourites = document.getElementById('toggle-favourites');
const loading = document.getElementById('loading');
const pokemonDetails = document.getElementById('pokemon-details');
const pokemonModal = document.getElementById('pokemon-modal');
const closeModal = document.getElementById('close-modal');

// State variables
let isViewingFavourites = false;
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

// Event Listeners
searchButton.addEventListener('click', handleSearch);
toggleFavourites.addEventListener('click', toggleFavouritesView);
closeModal.addEventListener('click', () => pokemonModal.classList.add('hidden'));
pokemonModal.addEventListener('click', (e) => {
  if (e.target === pokemonModal) pokemonModal.classList.add('hidden');
});

// Initialize by showing search view
showSearchView();

// Main Functions

async function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  try {
    loading.classList.remove('hidden');
    pokemonDetails.innerHTML = '';
    
    const pokemon = await fetchPokemon(query.toLowerCase());
    displayPokemonCard(pokemon);
    
    searchInput.value = '';
  } catch (error) {
    pokemonDetails.innerHTML = `<p class="error">Pokémon not found. Try another name or ID.</p>`;
  } finally {
    loading.classList.add('hidden');
  }
}

async function fetchPokemon(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) throw new Error('Pokémon not found');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

function displayPokemonCard(pokemon) {
  pokemonDetails.innerHTML = '';
  pokemonDetails.classList.add('centered');
  
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  
  // Capitalize first letter of name
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  // Get types as comma-separated string
  const types = pokemon.types.map(t => t.type.name).join(', ');
  
  // Get abilities as comma-separated string
  const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
  
  card.innerHTML = `
    <h2>${name}</h2>
    <p>ID: #${pokemon.id}</p>
    <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" alt="${name}">
    <p>Types: ${types}</p>
    <p>Abilities: ${abilities}</p>
    <button class="more-info" data-id="${pokemon.id}">More Info</button>
    <button class="add-favourite" data-id="${pokemon.id}">Add to Favourites</button>
  `;
  
  pokemonDetails.appendChild(card);
  
  // Add event listeners to new buttons
  card.querySelector('.more-info').addEventListener('click', () => showPokemonModal(pokemon.id));
  card.querySelector('.add-favourite').addEventListener('click', () => addToFavourites(pokemon));
}

async function showPokemonModal(pokemonId) {
  try {
    const pokemon = await fetchPokemon(pokemonId);
    
    // Set modal content
    document.getElementById('modal-name').textContent = 
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.getElementById('modal-id').textContent = `#${pokemon.id}`;
    document.getElementById('modal-img').src = 
      pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
    
    // Set types
    const typesContainer = document.querySelector('.modal-types .types-container');
    typesContainer.innerHTML = '';
    pokemon.types.forEach(type => {
      const typeBadge = document.createElement('span');
      typeBadge.className = `type-badge type-${type.type.name}`;
      typeBadge.textContent = type.type.name;
      typesContainer.appendChild(typeBadge);
    });
    
    // Set height and weight (convert from decimeters to meters and hectograms to kilograms)
    document.querySelector('#modal-height span').textContent = `${pokemon.height / 10}m`;
    document.querySelector('#modal-weight span').textContent = `${pokemon.weight / 10}kg`;
    
    // Set abilities
    const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
    document.querySelector('#modal-abilities span').textContent = abilities;
    
    // Set stats
    const statsContainer = document.getElementById('modal-stats');
    statsContainer.innerHTML = '';
    pokemon.stats.forEach(stat => {
      const statRow = document.createElement('div');
      statRow.className = 'stat-row';
      
      const statName = document.createElement('span');
      statName.className = 'stat-name';
      statName.textContent = stat.stat.name.replace('-', ' ');
      
      const statBar = document.createElement('div');
      statBar.className = 'stat-bar';
      
      const statFill = document.createElement('div');
      statFill.className = 'stat-fill';
      statFill.style.width = `${Math.min(100, stat.base_stat)}%`;
      
      const statValue = document.createElement('span');
      statValue.className = 'stat-value';
      statValue.textContent = stat.base_stat;
      
      statBar.appendChild(statFill);
      statRow.appendChild(statName);
      statRow.appendChild(statBar);
      statRow.appendChild(statValue);
      statsContainer.appendChild(statRow);
    });
    
    // Show modal
    pokemonModal.classList.remove('hidden');
  } catch (error) {
    console.error('Error showing modal:', error);
  }
}

function addToFavourites(pokemon) {
  // Check if already in favourites
  if (favourites.some(fav => fav.id === pokemon.id)) {
    alert('This Pokémon is already in your favourites!');
    return;
  }
  
  // Check if reached max favourites
  if (favourites.length >= 6) {
    alert('You can only have 6 favourite Pokémon!');
    return;
  }
  
  // Add to favourites
  favourites.push({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
    types: pokemon.types.map(t => t.type.name)
  });
  
  // Save to localStorage
  localStorage.setItem('favourites', JSON.stringify(favourites));
  alert(`${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} added to favourites!`);
}

function toggleFavouritesView() {
  isViewingFavourites = !isViewingFavourites;
  
  if (isViewingFavourites) {
    toggleFavourites.textContent = 'Back to Search';
    showFavouritesView();
  } else {
    toggleFavourites.textContent = 'View Favourites';
    showSearchView();
  }
}

function showFavouritesView() {
  pokemonDetails.innerHTML = '';
  pokemonDetails.classList.remove('centered');
  
  if (favourites.length === 0) {
    pokemonDetails.innerHTML = '<p class="empty">You have no favourite Pokémon yet!</p>';
    return;
  }
  
  favourites.forEach(pokemon => {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const types = pokemon.types.join(', ');
    
    card.innerHTML = `
      <h2>${name}</h2>
      <p>ID: #${pokemon.id}</p>
      <img src="${pokemon.image}" alt="${name}">
      <p>Types: ${types}</p>
      <button class="more-info" data-id="${pokemon.id}">More Info</button>
      <button class="remove-favourite" data-id="${pokemon.id}">Remove</button>
    `;
    
    pokemonDetails.appendChild(card);
    
    // Add event listeners
    card.querySelector('.more-info').addEventListener('click', () => showPokemonModal(pokemon.id));
    card.querySelector('.remove-favourite').addEventListener('click', () => removeFromFavourites(pokemon.id));
  });
}

function showSearchView() {
  pokemonDetails.innerHTML = '<p class="instructions">Search for a Pokémon by name or ID to begin!</p>';
  pokemonDetails.classList.add('centered');
}

function removeFromFavourites(pokemonId) {
  favourites = favourites.filter(pokemon => pokemon.id !== pokemonId);
  localStorage.setItem('favourites', JSON.stringify(favourites));
  showFavouritesView(); // Refresh the view
}


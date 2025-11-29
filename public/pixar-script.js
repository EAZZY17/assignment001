const yearFilter = document.getElementById("movie-year");
const directorFilter = document.getElementById("movie-director");
const orderFilter = document.getElementById("movie-order");
const searchInput = document.getElementById("movie-search");
const movieContainer = document.getElementById("movie-posters");

// Declare global variables
let allMovies = [];
let filteredMovies = [];

// Auto-load JSON file on page load
document.addEventListener("DOMContentLoaded", function() {
    fetch('/pixar.json')
        .then(response => response.json())
        .then(data => {
            allMovies = data.movies;
            filteredMovies = [...allMovies];
            populateFilters();
            displayMovies(filteredMovies);
        })
        .catch(error => {
            console.error("Error loading JSON:", error);
            movieContainer.innerHTML = "<p>Error loading movie data. Please check the console.</p>";
        });
});

// Filters
yearFilter.addEventListener("change", function () {
    searchInput.value = "";
    applyFilterAndSort();
});

directorFilter.addEventListener("change", function () {
    searchInput.value = "";
    applyFilterAndSort();
});

orderFilter.addEventListener("change", function () {
    searchInput.value = "";
    applyFilterAndSort();
});

// Search
searchInput.addEventListener("input", function () {
    yearFilter.value = "All Years";
    directorFilter.value = "All Directors";
    orderFilter.value = "Ascending";

    const searchTerm = searchInput.value.toLowerCase();
    filteredMovies = allMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredMovies);
});

// Helper Functions
function populateFilters() {
    const years = [...new Set(allMovies.map(movie => 
        new Date(movie.releaseDate).getFullYear()))].sort();
    const directors = [...new Set(allMovies.map(movie => movie.director))].sort();
    
    yearFilter.innerHTML = '<option>All Years</option>';
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    directorFilter.innerHTML = '<option>All Directors</option>';
    directors.forEach(director => {
        const option = document.createElement("option");
        option.value = director;
        option.textContent = director;
        directorFilter.appendChild(option);
    });
}

function applyFilterAndSort() {
    filteredMovies = [...allMovies];

    if (yearFilter.value !== "All Years") {
        filteredMovies = filteredMovies.filter(movie => 
            new Date(movie.releaseDate).getFullYear() == yearFilter.value
        );
    }

    if (directorFilter.value !== "All Directors") {
        filteredMovies = filteredMovies.filter(movie => 
            movie.director === directorFilter.value
        );
    }

    filteredMovies.sort((a, b) => {
        const dateA = new Date(a.releaseDate);
        const dateB = new Date(b.releaseDate);
        if (isNaN(dateA) || isNaN(dateB)) return 0;
        return orderFilter.value === "Ascending" ? dateA - dateB : dateB - dateA;
    });

    displayMovies(filteredMovies);
}

function displayMovies(movies) {
    movieContainer.innerHTML = "";
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "movie";
        
        // Prepend "images/" to the posterUrl
        const posterPath = `images/${movie.posterUrl}`;
        
        movieCard.innerHTML = `
            <img src="${posterPath}" alt="${movie.title}" onerror="this.src='./images/default.jpg'">
            <div class="movie-info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-director">${movie.director}</div>
                <div class="movie-year-rating">${new Date(movie.releaseDate).getFullYear()}</div>
            </div>
        `;
        
        movieContainer.appendChild(movieCard);
    });
}


fetch("https://raw.githubusercontent.com/theMungai/Flatiron-movie-theatre/main/db.json")
    .then((response) => response.json())
    .then((movies) => {
        console.log(movies); // Log the fetched data to ensure it's correct
        window.allMovies = movies;

        if (movies.length > 0) {
            loadMovieDetails(movies[0].id);
        }

        movies.forEach((movie) => displayMovies(movie));
    })
    .catch((error) => console.error(error));


function displayMovies(movie) {
    let movieTitle = document.createElement("li");
    movieTitle.innerHTML = `${movie.title} <button class="delete-btn">Delete</button>`;
    document.querySelector("#films").appendChild(movieTitle);

    movieTitle.addEventListener("click", () => loadMovieDetails(movie.id));

    const deleteBtn = movieTitle.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        deleteMovie(movie.id, movieTitle);
    });
}

function loadMovieDetails(movieId) {
    const movie = window.allMovies.find((movie) => movie.id === movieId);

    const movieDetailsContainer = document.querySelector(".movie-details");
    const moviePostersContainer = document.querySelector(".movie-posters");

    movieDetailsContainer.innerHTML = "";
    moviePostersContainer.innerHTML = "";

    const moviePoster = document.createElement("img");
    moviePoster.src = movie.poster;
    moviePoster.alt = `${movie.title} poster`;
    moviePostersContainer.appendChild(moviePoster);

    movieDetailsContainer.innerHTML = `
        <div class="card-header">
            <h2>${movie.title}</h2>
            <p>${movie.runtime} minutes</p>
        </div>
        <div class="movie-descriptions">
            <p>${movie.description}</p>
            <hr>
            <div class="time-and-tickets">
                <p>${movie.showtime}</p>
                <p><span>${movie.capacity - movie.tickets_sold}</span> remaining tickets</p>
            </div>
            <button class="buy-ticket-button">Buy Ticket</button>
        </div>
    `;

    const buyTicketBtn = movieDetailsContainer.querySelector(".buy-ticket-button");
    buyTicketBtn.addEventListener("click", () => handleBuyTicket(movie, movieDetailsContainer));
}

function handleBuyTicket(movie, movieDetailsContainer) {
    let remainingTicketsElement = movieDetailsContainer.querySelector("span");
    let ticketsLeft = parseInt(remainingTicketsElement.textContent);

    if (ticketsLeft > 0) {
        ticketsLeft -= 1;
        remainingTicketsElement.textContent = ticketsLeft;

        updateTicketCount(movie.id, movie.tickets_sold + 1);
    } else {
        remainingTicketsElement.textContent = 0;
        const buyTicketBtn = movieDetailsContainer.querySelector(".buy-ticket-button");
        buyTicketBtn.innerText = "Sold Out";
        buyTicketBtn.disabled = true;
    }
}

// Update tickets
function updateTicketCount(movieId, ticketsSold) {
    fetch(`https://raw.githubusercontent.com/theMungai/Flatiron-movie-theatre/main/db.json${movieId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            tickets_sold: ticketsSold,
        }),
    })
        .then((response) => response.json())
        .then((updatedMovie) => {
            console.log("Updated movie:", updatedMovie);
        })
        .catch((error) => console.error("Error updating ticket count:", error));
}

// Delete movie
function deleteMovie(movieId, movieElement) {
    fetch(`https://raw.githubusercontent.com/theMungai/Flatiron-movie-theatre/main/db.json${movieId}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then(() => {
            movieElement.remove(); // Remove movie from the list
            console.log(`Movie with id ${movieId} deleted`);
        })
        .catch((error) => console.error("Error deleting movie:", error));
}


fetchMovies();

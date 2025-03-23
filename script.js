function fetchMovies(){
    fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((movies) => movies.forEach((movie) => displayMovies(movie)))
    .catch((error) => console.error(error))
}
fetchMovies()

function displayMovies(movie){
    
        // Movie Titles
        let movieTitles = document.createElement("div")
        movieTitles.innerHTML = `<p>${movie.title}  <button>Delete</button> </p>`
        document.querySelector("#films").appendChild(movieTitles)

        movieTitles.addEventListener("click", () => {
            loadMovies(movie.id)
        })

        // Movie Posters
        let moviePosters = document.createElement("div")
        moviePosters.innerHTML = `<img src = "${movie.poster}">`
        document.querySelector(".movie-posters").appendChild(moviePosters)

        // Create movie card
        let card = document.createElement("div")

        card.innerHTML = `
            <div class = "card-header">
                <h2>${movie.title}</h2>
                <p>${movie.runtime} minutes</p>
            </div>

            <div class = "movie-descriptions">
                <p>${movie.description}</p>

                <div class = "time-and-tickets">
                    <p>${movie.showtime}</p>
                    <p><span>${movie.capacity - movie.tickets_sold}</span> remaining tickets</p>
                </div>
                <button class = "buy-ticket-button">Buy Ticket</button>
            </div>
        `;

        document.querySelector(".movie-details").appendChild(card)

        // Buy Ticket EventListener
        const buyTicketBtn = card.querySelector(".buy-ticket-button");
        buyTicketBtn.addEventListener("click",() => {
            
            

            let remainingTickets = card.querySelector("span")
            let ticketsLeft = parseInt(remainingTickets.textContent)
            
            if(ticketsLeft > 0){
                ticketsLeft -= 1
                remainingTickets.textContent = ticketsLeft
                
            }
            else{
                remainingTickets.textContent = 0
                buyTicketBtn.innerText = "Sold Out"
                buyTicketBtn.disabled = "true"
            }
            
        })
           
}


function loadMovies(movieId){
    console.log(movieId);
    
}
function fetchMovies(){
    fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then((movies) => displayMovies(movies))
}
fetchMovies()

function displayMovies(movies){
    
        document.querySelector("#films").innerHTML = movies
        .map((movie) => `<li>${movie.title}</li>`)
    
}
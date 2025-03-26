# Flatiron-movie-theatre

A simple Single Page Application (SPA) built using HTML, CSS, and JavaScript, which allows users to select movies and buy tickets. The application fetches movie data from a `db.json` file and dynamically displays the movie information on the page. When no tickets remain for a movie, the "Buy Ticket" button text changes to "Sold Out."

## Features
- **Movie List**: Displays a list of available movies fetched from a local `db.json` file.
- **Buy Tickets**: Users can click a "Buy Ticket" button to purchase tickets for a movie.
- **Sold Out**: When no tickets remain, the "Buy Ticket" button changes to "Sold Out."
- **Dynamic Updates**: The application automatically updates the UI when a user buys a ticket.

## Technologies Used

- **HTML**: For the structure of the webpage.
- **CSS**: For styling and layout.
- **JavaScript**: For dynamic behavior and interaction.
- **db.json**: A mock database to store movie data and available tickets.

## Installation

1. Clone the repository or download the project files to your local machine.
2. Open the `index.html` file in your preferred browser.
3. The app should be live and ready to use. No server-side setup is required for this simple SPA.

## Usage

1. Open the SPA in your browser.
2. The list of movies is displayed with the number of available tickets.
3. Click the "Buy Ticket" button next to a movie to decrease the number of available tickets.
4. When the tickets run out, the button will automatically change to "Sold Out."


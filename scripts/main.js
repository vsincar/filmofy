document.addEventListener('DOMContentLoaded', () => {
    let films = [];

    const displayFilms = (filmsToDisplay) => {
        const filmList = document.querySelector('#film-list');
        filmList.innerHTML = ''; // Clear existing film cards

        filmsToDisplay.forEach(film => {
            const filmCard = document.createElement('div');
            filmCard.classList.add('film-card');

            const genres = film.genre.split(',').map(genre => `<span class="badge badge-primary genre">${genre.trim()}</span>`).join('');

            filmCard.innerHTML = `
                <a href="film-detail.html?id=${film.id}">
                    <img src="${film.image}" class="film-card rounded-lg">
                    <div class="film-overlay rounded-lg">
                        <div class="film-overlay-content">
                            <div class="film-description mb-2">${film.description}</div>
                            <br><br>
                            <div class="badge badge-info mb-2">${film.language}</div>
                            <div class="film-genres mb-2">${genres}</div>
                            <div class="badge badge-light mb-2">${film.year}</div>
                        </div>
                    </div>
                    <div class="film-imdb">${film.imdbRating}</div>
                    <div class="film-heart"><i class="far fa-heart"></i></div>
                    <div class="film-title rounded-bottom">${film.name}</div>
                </a>
            `;

            const heartIcon = filmCard.querySelector('.film-heart');
            heartIcon.addEventListener('click', (event) => {
                event.preventDefault();
                heartIcon.classList.toggle('liked');
                if (heartIcon.classList.contains('liked')) {
                    heartIcon.innerHTML = '<i class="fas fa-heart"></i>';
                } else {
                    heartIcon.innerHTML = '<i class="far fa-heart"></i>';
                }
            });

            const genreElements = filmCard.querySelectorAll('.genre');
            genreElements.forEach(genre => {
                genre.addEventListener('click', (event) => {
                    event.preventDefault();
                    localStorage.setItem('selectedGenre', genre.textContent.trim());
                    window.location.href = 'index.html';
                });
            });

            filmList.appendChild(filmCard);
        });
    };

    fetch('database/films.json')
        .then(response => response.json())
        .then(data => {
            films = data;

            const selectedGenre = localStorage.getItem('selectedGenre');
            if (selectedGenre) {
                filterFilms(selectedGenre);
                localStorage.removeItem('selectedGenre');
            } else {
                displayFilms(films);
            }
        })
        .catch(error => console.error('Error fetching films:', error));

    window.filterFilms = (genre) => {
        const filteredFilms = films.filter(film => film.genre.includes(genre));
        displayFilms(filteredFilms);
    };

    window.showAllFilms = () => {
        displayFilms(films);
    };
});

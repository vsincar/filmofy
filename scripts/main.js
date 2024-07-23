document.addEventListener('DOMContentLoaded', () => {
    let films = [];
    let currentPage = 1;
    const filmsPerPage = 20;

    const displayFilms = (filmsToDisplay) => {
        const filmList = document.querySelector('#film-list');
        filmList.innerHTML = ''; 

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

    const renderPagination = (totalFilms) => {
        const paginationButtons = document.querySelector('#pagination-buttons');
        paginationButtons.innerHTML = '';

        const totalPages = Math.ceil(totalFilms / filmsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.type = 'button';
            button.classList.add('btn', 'btn-outline-dark', 'mx-1');
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                paginateFilms();
            });
            paginationButtons.appendChild(button);
        }
    };

    const paginateFilms = () => {
        const startIndex = (currentPage - 1) * filmsPerPage;
        const endIndex = startIndex + filmsPerPage;
        const filmsToDisplay = films.slice(startIndex, endIndex);
        displayFilms(filmsToDisplay);
    };

    fetch('database/films.json')
        .then(response => response.json())
        .then(data => {
            films = data;
            renderPagination(films.length);
            paginateFilms();

            const selectedGenre = localStorage.getItem('selectedGenre');
            if (selectedGenre) {
                filterFilms(selectedGenre);
                localStorage.removeItem('selectedGenre');
            } else {
                displayFilms(films.slice(0, filmsPerPage));
            }
        })
        .catch(error => console.error('Error fetching films:', error));

    window.filterFilms = (genre) => {
        const filteredFilms = films.filter(film => film.genre.includes(genre));
        renderPagination(filteredFilms.length);
        displayFilms(filteredFilms.slice(0, filmsPerPage));
    };

    window.showAllFilms = () => {
        renderPagination(films.length);
        displayFilms(films.slice(0, filmsPerPage));
    };
});

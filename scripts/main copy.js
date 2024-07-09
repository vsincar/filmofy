document.addEventListener('DOMContentLoaded', () => {
    fetch('database/films.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(film => {
                const filmCard = document.createElement('div');
                filmCard.classList.add('film-card');

                // Dizi içindeki türleri span.badge içinde oluştur
                const genres = film.genre.split(',').map(genre => `<span class="badge badge-primary genre">${genre.trim()}</span>`).join('');

                filmCard.innerHTML = `
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
                `;

                // Kalp simgesine tıklama olayı ekle
                const heartIcon = filmCard.querySelector('.film-heart');
                heartIcon.addEventListener('click', () => {
                    heartIcon.classList.toggle('liked');
                    if (heartIcon.classList.contains('liked')) {
                        heartIcon.innerHTML = '<i class="fas fa-heart"></i>'; // Kalp simgesini değiştir
                    } else {
                        heartIcon.innerHTML = '<i class="far fa-heart"></i>';
                    }
                });

                // Her bir tür badge'ine tıklama olayı ekle
                const genreElements = filmCard.querySelectorAll('.genre');
                genreElements.forEach(genre => {
                    genre.addEventListener('click', () => {
                        // Burada tür ile ilgili bir işlem yapabilirsiniz (örneğin türe göre filtreleme)
                        console.log('Clicked genre:', genre.textContent);
                    });
                });

                document.querySelector('.row').appendChild(filmCard);
            });
        })
        .catch(error => console.error('Error fetching films:', error));
});

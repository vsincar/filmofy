document.addEventListener('DOMContentLoaded', function() {
    const filmGallery = document.getElementById('film-gallery');

    fetch('database/films.json')
        .then(response => response.json())
        .then(films => {
            films.forEach(film => {
                const filmCard = document.createElement('div');
                filmCard.classList.add('film-card');

                const cardContent = `
                    <div class="card">
                        <img src="${film.image}" class="card-img-top">
                    </div>
                `;

                filmCard.innerHTML = cardContent;
                filmGallery.appendChild(filmCard);

                // Create filmIsmi div for each film and append to film-gallery
                const filmIsmi = document.createElement('div');
                filmIsmi.classList.add('filmIsmi');
                filmIsmi.classList.add('rounded'); //yuvarlatilmis dikdortgen
                filmIsmi.textContent = film.name;
                filmGallery.appendChild(filmIsmi);

                // Initially hide filmIsmi div
                filmIsmi.style.display = 'none';

                // Add mouseover event to show filmIsmi div at mouse position
                filmCard.addEventListener('mouseover', function(event) {
                    // Calculate offset relative to filmGallery
                    const galleryRect = filmGallery.getBoundingClientRect();
                    const offsetX = event.clientX - galleryRect.left;
                    const offsetY = event.clientY - galleryRect.top;

                    // Position filmIsmi div
                    filmIsmi.style.left = `${offsetX}px`;
                    filmIsmi.style.top = `${offsetY}px`;
                    filmIsmi.style.display = 'block';
                });

                // Add mouseout event to hide filmIsmi div
                filmCard.addEventListener('mouseout', function() {
                    filmIsmi.style.display = 'none';
                });
            });
        })
        .catch(error => console.error('Error fetching films:', error));
});

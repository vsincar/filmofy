// favfilm.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('database/films.json')
        .then(response => response.json())
        .then(data => {
            const carouselInner = document.querySelector('#carouselFavorites .carousel-inner');
            let carouselItems = '';

            // Generate carousel items
            data.forEach((film, index) => {
                // Check if the index is divisible by 5 to start a new carousel item
                if (index % 5 === 0) {
                    if (index > 0) {
                        carouselItems += '</div>'; // Close previous carousel item
                    }
                    carouselItems += '<div class="carousel-item' + (index === 0 ? ' active' : '') + '"><div class="row">';
                }

                // Add film card
                carouselItems += `
                    <div class="col">
                        <div class="card">
                            <img src="${film.image}" class="card-img-top" alt="${film.name}">
                        </div>
                    </div>
                `;

                // Close the last carousel item
                if (index === data.length - 1 || (index + 1) % 5 === 0) {
                    carouselItems += '</div></div>';
                }
            });

            // Inject carousel items into carousel inner
            carouselInner.innerHTML = carouselItems;
        })
        .catch(error => console.error('Error fetching the films data:', error));
});

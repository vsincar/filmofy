// favfilm profilim sayfasinda carousel itemleri sergilemeye yarayan js kodu
document.addEventListener("DOMContentLoaded", function () {
  fetch("database/films.json")
    .then((response) => response.json())
    .then((data) => {
      const carouselInner = document.querySelector(
        "#carouselFavorites .carousel-inner"
      );
      let carouselItems = "";

      // Carousel itemleri burada olusturuluyor
      data.forEach((film, index) => {
        // 5 tane item olup olmadigini kontrol ediyoruz
        if (index % 5 === 0) {
          if (index > 0) {
            carouselItems += "</div>"; // onceki carousel itemi burda kapaniyor
          }
          carouselItems +=
            '<div class="carousel-item' +
            (index === 0 ? " active" : "") +
            '"><div class="row" style="background-color:white">';
        }

        // Film kartlari ekleme
        carouselItems += `
                    <div class="col">
                        <div class="card">
                            <img src="${film.image}" class="card-img-top" alt="${film.name}">
                        </div>
                    </div>
                `;

        // Son carousel itemi kapaniyor burada toplamda 5 item gorunmesini sagliyor
        if (index === data.length - 1 || (index + 1) % 5 === 0) {
          carouselItems += "</div></div>";
        }
      });

      // Carousel kartlarini cagiriyoruz
      carouselInner.innerHTML = carouselItems;
    })
    .catch((error) => console.error("Error fetching the films data:", error));
});

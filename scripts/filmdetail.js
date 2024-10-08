//filmlere tiklandiginda acilacak olan film-detail.html sayfasinda ilgili filmin id'si ile
//filme dair detayli bilgiler olusturan js kodu
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const filmId = urlParams.get("id");

  fetch("database/films.json")
    .then((response) => response.json())
    .then((films) => {
      const film = films.find((f) => f.id === parseInt(filmId));
      if (film) {
        displayFilmDetails(film);
      } else {
        document.querySelector("#film-container").innerHTML =
          "<p>Film bulunamadı.</p>";
      }
    })
    .catch((error) => console.error("Error fetching film details:", error));

  const displayFilmDetails = (film) => {
    const filmContainer = document.querySelector("#film-container");
    filmContainer.innerHTML = `
            <div class="col-md-4 p-4">
                <img src="${film.image}" class="img-fluid rounded-lg">
            </div>
            <div class="col-md-8 film-info">
                <h2 class="theme-texts">${film.name}</h2>
                <p class="theme-texts"><strong>Yönetmen:</strong> ${
                  film.director
                }</p>
                <p class="theme-texts"><strong>Oyuncular:</strong> ${
                  film.actors
                }</p>
                <p class="theme-texts"><strong>Yıl:</strong> ${film.year}</p>
                <p class="theme-texts"><strong>Dil:</strong> ${
                  film.language
                }</p>
                <p class="theme-texts"><strong>Ülke:</strong> ${
                  film.country
                }</p>
                <p class="theme-texts"><strong>IMDB Puanı:</strong> <span class="badge badge-warning">${
                  film.imdbRating
                }</span></p>               
                <p class="theme-texts"><strong>Açıklama:</strong> ${
                  film.description
                }</p>               
                <div><strong class="theme-texts">Tür:</strong> ${film.genre
                  .split(",")
                  .map(
                    (genre) =>
                      `<span class="badge badge-primary genre">${genre.trim()}</span>`
                  )
                  .join("")}</div>
                <div class="mt-4">
    <button class="btn btn-outline-danger mr-2">
        <i class="fas fa-heart"></i> Favorilere ekle
    </button>
    <button class="btn btn-outline-info">
        <i class="fas fa-eye mr-2"></i> İzleme listesine ekle
    </button>
</div>

            </div>
        `;
  };
});

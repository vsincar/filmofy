//Arama barinda girecegimiz harf veya kelimeye gore bulmamizi ve ilgili sayfaya yonlendiren js kodu

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const suggestionBox = document.getElementById("suggestion-box");

  function showSuggestions(suggestions) {
    suggestionBox.innerHTML = ""; // Mevcut önerileri temizle
    if (suggestions.length > 0) {
      suggestionBox.style.display = "block"; // Öneri kutusunu göster
      suggestions.forEach((suggestion) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestion-item");
        suggestionItem.innerHTML = `
                    <img src="${suggestion.image}" class="suggestion-img" alt="${suggestion.name}">
                    <span>${suggestion.name}</span>
                `;
        suggestionItem.addEventListener("click", () => {
          window.location.href = `film-detail.html?id=${suggestion.id}`;
        });
        suggestionBox.appendChild(suggestionItem);
      });
    } else {
      suggestionBox.style.display = "none"; // Öneri yoksa kutuyu gizle
    }
  }

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    if (query.length > 0) {
      fetch("database/films.json")
        .then((response) => response.json())
        .then((data) => {
          const filteredSuggestions = data.filter((film) =>
            film.name.toLowerCase().includes(query)
          );
          showSuggestions(filteredSuggestions);
        });
    } else {
      suggestionBox.style.display = "none"; // Query boşsa kutuyu gizle
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !searchInput.contains(event.target) &&
      !suggestionBox.contains(event.target)
    ) {
      suggestionBox.style.display = "none";
    }
  });
});

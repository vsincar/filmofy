//arama barindaki metin animasyonu

let typedInstance;

// Placeholder animasyonunu başlat
function startAnimation() {
  if (!typedInstance) {
    typedInstance = new Typed("#searchInput", {
      strings: [
        "Arama yapın...",
        "Film adı girin...",
        "Filmleri filtreleyin...",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    });
  }
}

// Animasyonu durdur
function stopAnimation() {
  if (typedInstance) {
    typedInstance.destroy();
    typedInstance = null; // Reset the typedInstance
  }
  // Placeholder metnini temizle
  document.getElementById("searchInput").placeholder = "";
}

// Sayfa yüklendiğinde animasyonu başlat
document.addEventListener("DOMContentLoaded", startAnimation);

// Input alanına tıklanıldığında animasyonu durdur ve placeholder metnini temizle
document.getElementById("searchInput").addEventListener("focus", function () {
  stopAnimation();
});

// Sayfa üzerinde herhangi bir yere tıklanıldığında animasyonu yeniden başlat (eğer input boşsa)
document.addEventListener("click", function (event) {
  const inputElement = document.getElementById("searchInput");
  // Eğer tıklanan yer input dışıysa ve input alanı boşsa animasyonu tekrar başlat
  if (!inputElement.contains(event.target) && inputElement.value === "") {
    setTimeout(startAnimation, 100);
  }
});

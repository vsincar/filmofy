

//Kategoriler butonu tiklaninca aktif(beyaz) kalmasini saglamak icin gereken kod 
document.addEventListener('click', function(event) {
            var dropdown = document.querySelector('.custom-link');

            // Dropdown içinde tıklama kontrolü
            var isClickInsideDropdown = dropdown.contains(event.target);

            // Eğer dropdown içinde tıklanmışsa opacity'i 1 yap
            if (isClickInsideDropdown) {
                document.querySelector('.custom-link').style.opacity = '1';
            } 
        });
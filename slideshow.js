document.addEventListener('DOMContentLoaded', () => {
    const imageListElement = document.querySelector('.image-list');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');

    let images = [];
    let currentIndex = 0;
    let interval;

    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            images = data;
            showImages();
            startAutoplay();
        })
        .catch(error => console.error('Could Not Fetch images:', error));

    function showImages() {
        imageListElement.innerHTML = '';
        images.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            imgElement.classList.add('image-item');
            if (index === currentIndex) {
                imgElement.classList.add('active');
            }
            imageListElement.appendChild(imgElement);
        });
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImages();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImages();
    }

    function startAutoplay() {
        interval = setInterval(showNextImage, 3000);
    }

    function stopAutoplay() {
        clearInterval(interval);
    }

    nextButton.addEventListener('click', () => {
        stopAutoplay();
        showNextImage();
        startAutoplay();
    });

    prevButton.addEventListener('click', () => {
        stopAutoplay();
        showPrevImage();
        startAutoplay();
    });

    function initSlider() {
        currentIndex = 0;
        showImages();
    }

    initSlider();
});
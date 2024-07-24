document.addEventListener('DOMContentLoaded', function () {
    const imageList = document.querySelector('.image-list');

    let currentSlide = 0;
    let slideInterval;

    async function fetchImages() {
        try {
            const response = await fetch('images.json');
            const data = await response.json();
            const images = data.images;
            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.url;
                imgElement.alt = image.alt || 'Image';
                imgElement.classList.add('image-item');
                imageList.appendChild(imgElement);
            });
            startSlideshow();
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    function startSlideshow() {
        const slides = document.querySelectorAll('.image-item');
        if (slides.length > 0) {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                updateSlidePosition();
            }, 3000);
        }
    }

    function updateSlidePosition() {
        const slides = document.querySelectorAll('.image-item');
        imageList.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    fetchImages();
});

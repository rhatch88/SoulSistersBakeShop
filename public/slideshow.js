document.addEventListener('DOMContentLoaded', function () {
    const imageList = document.querySelector('.image-list');
    const imageContainer = document.querySelector('.image-container');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 3000; 

    async function fetchImages() {
        try {
            const response = await fetch('images.json');
            const data = await response.json();
            const imagesArray = data.images; 

        //pulls my pics and clones
            imagesArray.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image.url;
                imgElement.alt = image.alt || 'Image';
                imgElement.classList.add('image-item');
                imageList.appendChild(imgElement);
            });

            const cloneImages = Array.from(imageList.children).map(img => img.cloneNode(true));
            cloneImages.forEach(img => imageList.appendChild(img));

            startSlideshow();
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    }

    function startSlideshow() {
        slideInterval = setInterval(() => {
            currentSlide++;
            updateSlidePosition();
        }, slideDuration);
    }

    function updateSlidePosition() {
        const totalSlides = imageList.children.length;
        const slideWidth = imageList.children[0].clientWidth;
        const maxPosition = -(totalSlides / 2 - 1) * slideWidth; 

        if (currentSlide > totalSlides / 2 - 1) {
            imageList.style.transition = 'none';
            imageList.style.transform = `translateX(0)`;
            currentSlide = 0;
            setTimeout(() => {
                imageList.style.transition = 'transform 0.5s ease-in-out';
                imageList.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            }, 50);
        } else {
            imageList.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
    }

    fetchImages();
});

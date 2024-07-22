const initSlider = async (initialIndex = 0) => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");

    let slides = [];

    try {
        const response = await fetch('images.json');
        slides = await response.json();
    } catch (error) {
        console.error("Failed to load images:", error);
        return; // Exit the function if images cannot be loaded
    }

    const doubledSlides = [...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides];

    doubledSlides.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.classList.add('image-item');
        imageList.appendChild(imgElement);
    });

    const slideWidth = imageList.children[0].clientWidth + 20; // Adjust for gap
    const initialScrollLeft = slideWidth * initialIndex; // Calculate initial scroll position

    let slideIndex = initialIndex + slides.length; // Start at the specific slide in the duplicated list
    let autoplayInterval;

    const scrollToSlide = (index, behavior = "smooth") => {
        imageList.scrollTo({
            left: slideWidth * index,
            behavior: behavior
        });
    };

    const updateThumbPosition = () => {
        const scrollFraction = imageList.scrollLeft / (imageList.scrollWidth - imageList.clientWidth);
        scrollbarThumb.style.left = scrollFraction * 100 + "%";
    };

    const handleScrollEnd = () => {
        if (imageList.scrollLeft >= slideWidth * (doubledSlides.length - slides.length)) {
            imageList.scrollLeft = slideWidth * slides.length;
        }
        if (imageList.scrollLeft <= 0) {
            imageList.scrollLeft = slideWidth * (doubledSlides.length - slides.length);
        }
    };

    const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
            slideIndex = (slideIndex + 1) % doubledSlides.length;
            scrollToSlide(slideIndex);
        }, 3000); // Change slide every 3 seconds
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            stopAutoplay();
            if (button.id === "prev-slide") {
                slideIndex = (slideIndex - 1 + doubledSlides.length) % doubledSlides.length;
            } else {
                slideIndex = (slideIndex + 1) % doubledSlides.length;
            }
            scrollToSlide(slideIndex);
            startAutoplay();
        });
    });

    imageList.addEventListener("scroll", () => {
        updateThumbPosition();
        handleScrollEnd();
    });

    scrollbarThumb.addEventListener("mousedown", (event) => {
        stopAutoplay();
        const startX = event.pageX;
        const startLeft = scrollbarThumb.offsetLeft;

        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.pageX - startX;
            const newLeft = Math.max(0, Math.min(startLeft + deltaX, sliderScrollbar.clientWidth - scrollbarThumb.clientWidth));
            const scrollFraction = newLeft / sliderScrollbar.clientWidth;
            imageList.scrollTo({
                left: scrollFraction * (imageList.scrollWidth - imageList.clientWidth),
                behavior: "auto"
            });
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            startAutoplay();
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    // Scroll to the initial position
    imageList.scrollLeft = initialScrollLeft;

    // Start autoplay after a short delay to ensure smooth transition
    setTimeout(startAutoplay, 1000);
};

document.addEventListener("DOMContentLoaded", () => initSlider(0)); // Change 0 to the index of the strawberries image
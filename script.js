const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const autoSlideInterval = 3000; // 3 seconds interval for auto rotation

    let autoSlideTimeout;

    const startAutoSlide = () => {
        autoSlideTimeout = setInterval(() => {
            const scrollAmount = imageList.clientWidth;
            if (imageList.scrollLeft >= maxScrollLeft) {
                imageList.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            }
        }, autoSlideInterval);
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideTimeout);
        startAutoSlide(); // Restart auto slide after user interaction
    };

    // Handles scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
            stopAutoSlide(); // Restart auto slide after button click
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });

    startAutoSlide(); // Start automatic sliding when page loads
};

window.addEventListener("load", initSlider);

function initMap() {
    const location = { lat: 38.283510, lng: -85.823000 }; // Replace with the desired location coordinates
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 20,
        center: location,
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}

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
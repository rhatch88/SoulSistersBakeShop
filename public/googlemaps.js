let map;

var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdT6SPD9g7Ve0bcKY-LQRdW10uMt257aY&callback=initMap';
script.async = true;


window.initMap = async function() {
  const position = { lat: 38.285454, lng: -85.820484 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 15, 
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Soul Sisters Bake Shop Farmers Market Stand <3",
    // icon: {
    //     url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    //     scaledSize: new google.maps.Size(48, 48)
    // }
  });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
      
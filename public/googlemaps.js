// Initialize and add the map
let map;
// import { config } from '../node_modules/dotenv';
// config();
// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdT6SPD9g7Ve0bcKY-LQRdW10uMt257aY&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = async function() {
  const position = { lat: 38.285454, lng: -85.820484 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 15, // Zoom in closer to the location
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at the bakery location
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Soul Sisters Bake Shop Farmers Market Stand <3",
    icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(48, 48)
    }
  });
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
      

// async function initMap() {
  // const position = { lat: 38.285454, lng: -85.820484 };
  // const { Map } = await google.maps.importLibrary("maps");
  // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // map = new Map(document.getElementById("map"), {
  //   zoom: 15, // Zoom in closer to the location
  //   center: position,
  //   mapId: "DEMO_MAP_ID",
  // });

  // // The marker, positioned at the bakery location
  // const marker = new AdvancedMarkerElement({
  //   map: map,
  //   position: position,
  //   title: "Soul Sisters Bake Shop Farmers Market Stand <3",
  //   icon: {
  //       url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  //       scaledSize: new google.maps.Size(48, 48)
  //   }
  // });
// }

// initMap();

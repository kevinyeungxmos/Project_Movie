// Initialize the map
const map = L.map('map')

// Get the tile layer from OpenStreetMaps
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    // Specify the maximum zoom of the map
    maxZoom: 19,

    // Set the attribution for OpenStreetMaps
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Set the view of the map
// with the latitude, longitude and the zoom value
map.setView([43.72567660152833, -79.45219404643115], 16);

// Set the map view to the user's location
// Uncomment below to set map according to user location
// map.locate({setView: true, maxZoom: 16});

// Show a market at the position of the Eiffel Tower
let eiffelMarker = L.marker([43.72567660152833, -79.45219404643115]).addTo(map);

// Bind popup to the marker with a popup
eiffelMarker.bindPopup("Moovit Movies").openPopup();

//direct to /details.html
function viewDetails () {
    window.location = "./details.html";
}
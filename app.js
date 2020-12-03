import "https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js";

// Mapbox token
const mapbox_token =
  "pk.eyJ1IjoiZ3JhY2VrZWFuZSIsImEiOiJja2hmMXZic2MwbGNwMzVsNjVtZ3B1bXpiIn0.sA3v-R0YTud3qMVCET5Q2A";

  // Setting access token to map token
mapboxgl.accessToken = mapbox_token;

// Setting map visuals
var map = new mapboxgl.Map({
  container: "map",
  // Map set to dark mode
  style: "mapbox://styles/mapbox/dark-v10",
  zoom: 1.5,
  center: [0, 20]
});

// Assigning differant color markers with number of cases
const getColorFromCount = count => {
  if (count >= 50 && count < 100) {
    return "red";
  }
  if (count >= 10 && count < 50) {
    return "green";
  }
  if (count >= 1 && count < 10) {
    return "blue";
  }
  return "grey";
};

// Fetching the data from data script
fetch("/data.json")
  .then(response => response.json())
  .then(data => {
    // Pulling places key and reports key from data object
    const { places, reports } = data;

    reports
      // Filter out hidden data
      .filter(report => !report.hide)
      // Looping over reports
      .forEach(report => {
        const { infected, placeId } = report;
        // Searching all places until find match where place id = report string
        const currentPlace = places.find(place => place.id === placeId);
        console.log(infected, currentPlace);
        
        // Creating a marker to put on map
        new mapboxgl.Marker({
          color: getColorFromCount(infected)
        })
          // Marker where ever there is a report
          // Using longitude and latitude to plot
          .setLngLat([currentPlace.longitude, currentPlace.latitude])
          .addTo(map);
      });
  });
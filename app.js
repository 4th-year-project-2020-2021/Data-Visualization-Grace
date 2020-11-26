import "https://api.mapbox.com/mapbox-gl-js/v1.8.0/mapbox-gl.js";

const mapbox_token =
  "pk.eyJ1IjoiZ3JhY2VrZWFuZSIsImEiOiJja2hmMXZic2MwbGNwMzVsNjVtZ3B1bXpiIn0.sA3v-R0YTud3qMVCET5Q2A";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  zoom: 1.5,
  center: [0, 20]
});

const getColorFromCount = count => {
  if (count >= 300 && count < 400) {
    return "red";
  }
  if (count >= 200 && count < 300) {
    return "orange";
  }
  if (count >= 50 && count < 100) {
    return "yellow";
  }
  if (count >= 10 && count < 50) {
    return "purple";
  }
  if (count >= 1 && count < 10) {
    return "blue";
  }
  return "green";
};

fetch("/data.json")
  .then(response => response.json())
  .then(data => {
    const { places, reports } = data;

    reports
      .filter(report => !report.hide)
      .forEach(report => {
        const { infected, placeId } = report;
        const currentPlace = places.find(place => place.id === placeId);
        console.log(infected, currentPlace);
        new mapboxgl.Marker({
          color: getColorFromCount(infected)
        })
          .setLngLat([currentPlace.longitude, currentPlace.latitude])
          .addTo(map);
      });
  });
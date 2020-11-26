function updateMap() {
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data)
            rsp.records.forEach(element => {
                cases = element.cases;
                deaths = element.deaths;

                // Mark on map
                new mapboxgl.Marker({
                    draggable: true
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            });
        })
}

updateMap();
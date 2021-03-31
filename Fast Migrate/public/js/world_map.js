$(document).ready(function(){

    $("#world-map-btn").click(function(event){
        event.preventDefault();
        var mapboxAccessToken = 'pk.eyJ1IjoibW9lODYyMiIsImEiOiJja213cHpyOHkwMTA2MnNxa21oZmd4OXhoIn0.l4J9JjgPki3EWyCjX1T7fw';
        var map = L.map('map').setView([37.8, -96], 4);
        var countriesData = 

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
            id: 'mapbox/light-v10',
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapboxAccessToken
        }).addTo(map);

        $.getJSON("map.geojson",function(data){
            // L.geoJson function is used to parse geojson file and load on to map
            L.geoJson(data).addTo(map);
            });
    })

    function getColor(happiness) {
        return happiness >= 7 ?  '#fee5d9':
        happiness >= 6 ?  '#fcbba1':
        happiness >= 5 ?  '#fc9272':
        happiness >= 4 ?  '#fb6a4a':
        happiness >= 3 ?  '#de2d26':
                          '#a50f15';
    }
});

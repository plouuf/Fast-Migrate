$(document).ready(function(){

    var geoData;
    $("#world-map-btn").click(function(event){
        event.preventDefault();
        var mapboxAccessToken = 'pk.eyJ1IjoibW9lODYyMiIsImEiOiJja213cHpyOHkwMTA2MnNxa21oZmd4OXhoIn0.l4J9JjgPki3EWyCjX1T7fw';
        var map = L.map('map').setView([37.8, -96], 4);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
            id: 'mapbox/light-v10',
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 5,
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapboxAccessToken
        }).addTo(map);

        addHappiness();
        
        L.geoJson(geoData, {
            style: style,
            onEachFeature: function(features, layer){
                layer.bindPopup('<h2>Happiness score</h2>'+'<p>'+features.properties.name+': '+features.properties.happiness+'</p>');
            }
        }).addTo(map);

        
    })

    function getColor(happiness) {
        return happiness >= 7 ?  '#fee5d9':
        happiness >= 6 ?  '#fcbba1':
        happiness >= 5 ?  '#fc9272':
        happiness >= 4 ?  '#fb6a4a':
        happiness >= 3 ?  '#de2d26':
        happiness < 3 ?   '#a50f15':
                          '#fff'
    }

    function addHappiness() {
        var countries =
        $.ajax({
            url: '/country/',
            type: 'GET',
            contentType: 'application/json',
            global: false,
            async: false,                        
            success: function(response){
                return response
            },
            // If there's an error, we can use the alert box to make sure we understand the problem
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        }).responseJSON;

        geoData = 
        $.ajax({
            dataType: "json",
            url: "map.geojson",
            global: false,
            async: false,
            success: function(data){
                return data
            }
        }).responseJSON;

        for(let i=0; i<countries.length; i++){
            for(let j=0; j<geoData.features.length; j++){
                if(countries[i].name == geoData.features[j].properties['name'])
                {
                    geoData.features[j].properties['happiness'] = countries[i].happiness_score;
                    console.log(geoData.features[j].properties['name'], ': ', geoData.features[j].properties['happiness'])
                }
            }
        }
    }


    function style(features){
        return {
            fillColor: getColor(features.properties.happiness),
            weight: 2,
            opacity: 1,
            color: 'gray',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

});

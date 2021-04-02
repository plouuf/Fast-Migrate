var map;
var geoData;
$(document).ready(function(){
    var mapboxAccessToken = 'pk.eyJ1IjoibW9lODYyMiIsImEiOiJja213cHpyOHkwMTA2MnNxa21oZmd4OXhoIn0.l4J9JjgPki3EWyCjX1T7fw';
    map = L.map('map').setView([20, 0], 3);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
        id: 'mapbox/light-v10',
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 5,
        minZoom: 3,
        tileSize: 512,
        zoomOffset: -1,
        maxBoundsViscosity: 1.0,
        accessToken: mapboxAccessToken
    }).addTo(map);

    var legend = L.control({position: 'bottomleft'});

        legend.onAdd = function(map) {
            var div = L.DomUtil.create('div','info legend'),
                hap = [2,3,4,5,6,7],
                labels = [];

            div.innerHTML = '<h3>Happiness Legend</h3>'
            for (var i = 0; i < hap.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(hap[i]) + '"></i> ' +
                    hap[i] + (hap[i + 1] ? '&ndash;' + hap[i + 1] + '<br>' : '+');
            }
            return div;
        }
        legend.addTo(map);

    $("#world-map-btn").click(function(event){
        event.preventDefault();
        map.setMaxBounds([
            [90, 177.5],
            [-90, -180]
        ]);

        addHappiness();
        
        L.geoJson(geoData, {
            style: style,
            onEachFeature: function(features, layer){
                layer.bindPopup('<h2>'+features.properties.name+'</h2>'+
                '<p style="font-size:140%;">Happiness Score: '+features.properties.happiness+'</p>'+
                '<button id = "show_more" class = "show-more-style" onClick = "showMoreDetails(\''+features.properties.name+'\')">Show More</button>'+
                '<section id = "country-info"></section>');
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
                if(countries[i].name == geoData.features[j].properties['name'] 
                || countries[i].name == geoData.features[j].properties['sovereignt'])
                {
                    geoData.features[j].properties['happiness'] = countries[i].happiness_score;
                    //console.log(geoData.features[j].properties['name'], ': ', geoData.features[j].properties['happiness'])
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


function showMoreDetails(name){
    var country =
    $.ajax({
        url: '/country/'+name,
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

    section = document.getElementById('country-info');
    if(country != undefined){
        section.innerHTML = '<p>GDP: '+Math.round(country[0].Gdp*100)/100+'</p>'+
                            '<p>Cost of living index: '+Math.round(country[0].cost_of_living*100)/100+'</p>'+
                            '<p>Crime index: '+Math.round(country[0].crime_index*100)/100+'</p>'+
                            '<p>Health care index: '+Math.round(country[0].health_care_index*100)/100+'</p>'+
                            '<p>Quality of life index: '+Math.round(country[0].quality_of_life*100)/100+'</p>'+
                            '<p>Unemployment rate: '+Math.round(country[0].unemployment_rate*100)/100+'%</p>'
    }
    else{
        section.innerHTML = '<p>Error: Data missing</p>'
    }   

}

$(document).ready(function(){
    $("#search-det-btn").click(function(event){
        event.preventDefault();
        var country_name = $("#det-country-name").val();

        if(country_name == ""){
            throw new Error();
        }
        var country = []
        $.ajax({
            url: '/country/'+country_name,
            type: 'GET',
            contentType: 'application/json',
            async: false,
            global: false,

            success: function(response){
                country.push(response[0].name);
                country.push(response[0].happiness_score);
                country.push(response[0].quality_of_life);
                country.push(response[0].Gdp)
                country.push(response[0].cost_of_living);
                country.push(response[0].health_care_index);
                country.push(response[0].unemployment_rate);
                country.push(response[0].crime_index);
                $("#search-det-out").text(response.msg);
            },                   

            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });

        const fixedDeci = (country_field) => {
            if(country_field == null || country_field == undefined) {
                return "Missing data";
            }
            else{
                return country_field.toFixed(2);
            }
        }

        $(".text-typing").show();
        $(".text-typing").empty();
        $(".text-typing").append(`<p>${country[0]}</p>`);
        $(".text-typing").append(`<p>Happiness Score: ${fixedDeci(country[1])}</p>`);
        $(".text-typing").append(`<p>Quality Of Life: ${fixedDeci(country[2])}</p>`);
        $(".text-typing").append(`<p>Gdp: ${fixedDeci(country[3])}</p>`);
        $(".text-typing").append(`<p>Cost Of Living: ${fixedDeci(country[4])}</p>`);
        $(".text-typing").append(`<p>Health Care: ${fixedDeci(country[5])}</p>`);
        $(".text-typing").append(`<p>Unemployment Rate: ${fixedDeci(country[6])}</p>`);
        $(".text-typing").append(`<p>Crime Rate: ${fixedDeci(country[7])}</p>`);

    });
});
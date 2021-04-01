$(document).ready(function(){
    $("#search-det-btn").click(function(event){
        event.preventDefault();
        let country_name = $("#det-country-name").val();
        $.ajax({
            url: '/country/'+country_name,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                console.log(response);
                console.log(response[0].Gdp)
                $("#search-det-out").text(response.msg);
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});
$(document).ready(function () {

  const getFieldFromRes = (response, field_name) => {
    const { name } = response;
    let country_obj = { name };

    switch (field_name) {

      case "happiness_score":
        const { happiness_score } = response;
        country_obj.happiness_score = happiness_score;
        break;
      
      case "Gdp":
        const { Gdp } = response;
        country_obj.Gdp = Gdp;
        break;
      
      case "unemployment_rate":
        const { unemployment_rate } = response;
        country_obj.unemployment_rate = unemployment_rate;
        break;
      
      case "crime_index":
        const { crime_index } = response;
        country_obj.crime_index = crime_index;
        break;
      
      case "quality_of_life":
        const { quality_of_life } = response;
        country_obj = { quality_of_life };
        break;
      
      case "health_care_index":
        const { health_care_index } = response;
        country_obj.health_care_index = health_care_index;
        break;
      
      case "cost_of_living":
        const { cost_of_living } = response;
        country_obj.cost_of_living = cost_of_living;
        break;
    }
    return country_obj;
  }

  let res1;
  let res2;
  
  $('#search-comp-btn').click(function (event) {
    event.preventDefault();
    let country_1 = $('#country-1-name').val();
    let country_2 = $('#country-2-name').val();
    let field = $('#criteria-select').val();

    $.ajax({
      url: '/country/' + country_1,
      type: 'GET',
      contentType: 'application/json',
      success: function (response1) {
        console.log(response1); //works
        // res1 = getFieldFromRes(response1, field); //undefined
        $('#search-comp-out').text(response1.msg);
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        alert('Error - ' + errorMessage);
      },
    });
    

    $.ajax({
      url: '/country/' + country_2,
      type: 'GET',
      contentType: 'application/json',
      success: function (response2) {
        console.log(response2);
        // res2 = getFieldFromRes(response2, field); //undefined
        $('#search-comp-out').text(response2.msg);
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        alert('Error - ' + errorMessage);
      },
    });

    // console.log("responses: ", responses) //show both responses in an array
    // console.log("1st element: ", responses.length) //undefined 😧
  });
});


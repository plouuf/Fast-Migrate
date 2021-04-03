$(document).ready(function () {

  //function that return a particular field from the response by the given parameter field_name from the dropdown menu
  const getFieldFromRes = (response, field_name) => {
    switch (field_name) {
      case 'Happiness':
        const { happiness_score } = response;
        return happiness_score;

      case 'Gdp':
        const { Gdp } = response;
        return Gdp;

      case 'Unemployment Rate':
        const { unemployment_rate } = response;
        return unemployment_rate;

      case 'Crime Rate':
        const { crime_index } = response;
        return crime_index;

      case 'Quality Of Life':
        const { quality_of_life } = response;
        return quality_of_life;

      case 'Health Care':
        const { health_care_index } = response;
        return health_care_index;

      case 'Cost Of Living':
        const { cost_of_living } = response;
        return cost_of_living;
    }
  };

  //function that returns a sorted array of all countries based on the field selected from the dropdown menu
  const getRanking = (response, field) => {
    switch (field) {
      case 'Happiness':
        //sort by score
        response.sort((country1, country2) => {
          // return country2.happiness_score - country1.happiness_score
          return (country1.happiness_score === null) - (country2.happiness_score === null) || -(country1.happiness_score > country2.happiness_score)||+(country1.happiness_score < country2.happiness_score);
        });
        
        break;

      case 'Gdp':
        //sort by gdp
        response.sort((country1, country2) => {
          // return country2.Gdp - country1.Gdp
          return (country1.Gdp === null) - (country2.Gdp === null) || -(country1.Gdp > country2.Gdp)||+(country1.Gdp < country2.Gdp);
        });
        break;

      case 'Unemployment Rate':
        response.sort((country1, country2) => {
          // return country1.unemployment_rate - country2.unemployment_rate;
          return (country1.unemployment_rate === null) - (country2.unemployment_rate === null) || -(country2.unemployment_rate > country1.unemployment_rate)||+(country2.unemployment_rate < country1.unemployment_rate);
        });
        break;

      case 'Crime Rate':
        response.sort((country1, country2) => {
          // return country1.crime_index - country2.crime_index
          return (country1.crime_index === null) - (country2.crime_index === null) || -(country2.crime_index > country1.crime_index)||+(country2.crime_index < country1.crime_index);
        });
        break;

      case 'Quality Of Life':
        response.sort((country1, country2) => {
          // return country2.quality_of_life - country1.quality_of_life
          return (country1.quality_of_life === null) - (country2.quality_of_life === null) || -(country1.quality_of_life > country2.quality_of_life)||+(country1.quality_of_life < country2.quality_of_life);
        });
        break;

      case 'Health Care':
        response.sort((country1, country2) => {
          // return country2.health_care_index - country1.health_care_index
          return (country1.health_care_index === null) - (country2.health_care_index === null) || -(country1.health_care_index > country2.health_care_index)||+(country1.health_care_index < country2.health_care_index);
        });
        break;

      case 'Cost Of Living':
        response.sort((country1, country2) => {
          // return country1.cost_of_living - country2.cost_of_living
          return (country1.cost_of_living === null) - (country2.cost_of_living === null) || -(country2.cost_of_living > country1.cost_of_living)||+(country2.cost_of_living < country1.cost_of_living);
        });
    }
    return response;
  }

   /**
     * This function binds an event to the search button (under 'compare').
     */
  $('#search-comp-btn').click(function (event) {
    event.preventDefault();
    //empty the div so that the chart always gets updated everytime the button is clicked
    $('.card-container').empty();
    //empty the div so that the top 10 values get updated everytime the button is clicked
    $('#top-ten').empty();
    //stores the name of the country
    let countryLabels = [];
    //stores the field selected 
    let countryFields = [];
    //stores the ranks of the selected field
    let countryRanks = [];
    var countryColors = ['#e41a1c', '#377eb8'];
    //get the first country input
    let country_1 = $('#country-1-name').val();
    //get the second country input
    let country_2 = $('#country-2-name').val();

    //if a country is not input throws an error but would still graph if only one is entered
    if (country_1 == '' || country_2 == '') {
      throw new Error();
    }
    //get the field selected from dropdown menu
    let field = $('#criteria-select').val();

    //ajax call to get the first country inputed
    $.ajax({
      url: '/country/' + country_1,
      type: 'GET',
      async: false,
      global: false,
      contentType: 'application/json',
      success: function (response1) {
        // console.log(response1);
        //stores the first country name in the countryLabels array
        countryLabels.push(response1[0].name);
        //stores the first country selected field in the countryFields array
        countryFields.push(getFieldFromRes(response1[0], field));
        $('#search-comp-out').text();
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        alert('Error - ' + errorMessage);
      },
    });

    //ajax call to get the second country input
    $.ajax({
      url: '/country/' + country_2,
      type: 'GET',
      contentType: 'application/json',
      async: false,
      global: false,
      success: function (response2) {
        // console.log(response2);
        //stores the second country name in the countryLabels array
        countryLabels.push(response2[0].name);
        //stores the second country field selected from the dropdown in the countryField array
        countryFields.push(getFieldFromRes(response2[0], field));
        $('#search-comp-out').text();
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        alert('Error - ' + errorMessage);
      },
    });

    //ajax call to get all countries in the database for ranking purposes
    $.ajax({
      url: '/country/',
      type: 'GET',
      contentType: 'application/json',
      async: false,
      global: false,
      success: function (response) {
        // console.log(response);
        //sort the response by the field selected from the dropdown menu then stores it in the country ranks
        countryRanks = getRanking(response, field);
        // console.log(countryRanks);
        $('#search-comp-out').text();
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        alert('Error - ' + errorMessage);
      },
    });

    //controls the chart div
    $('.card-container').append('<canvas id="bar-chart"></canvas>');
    var barContext = $('#bar-chart');
    //draw the chart
    var barChart = new Chart(barContext, {
      type: 'bar',
      data: {
        labels: countryLabels,
        datasets: [
          {
            label: `${field}`,
            backgroundColor: countryColors,
            data: countryFields,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: `${countryLabels[0]} v/s ${countryLabels[1]}`,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        maintainAspectRatio: false,
        responsive: true,
      },
    });

    //controls the div to add the top 10 countries based on selected field
    $('#top-ten').append(`<p>Top 10 Countries ranked by ${field}</p>`); //append a p tag to make a title
    //for loop to 10 to add first 10 countries to a p tag to display
    for (let i = 0; i < 10; i++) {
      $('#top-ten').append(`<p>${i+1}. ${countryRanks[i].name}</p>`);
    }
    
  });
});

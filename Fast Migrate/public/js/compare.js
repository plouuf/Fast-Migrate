$(document).ready(function () {
  const getFieldFromRes = (response, field_name) => {
    switch (field_name) {
      case 'happiness_score':
        const { happiness_score } = response;
        return happiness_score;

      case 'Gdp':
        const { Gdp } = response;
        return Gdp;

      case 'unemployment_rate':
        const { unemployment_rate } = response;
        return unemployment_rate;

      case 'crime_index':
        const { crime_index } = response;
        return crime_index;

      case 'quality_of_life':
        const { quality_of_life } = response;
        return quality_of_life;

      case 'health_care_index':
        const { health_care_index } = response;
        return health_care_index;

      case 'cost_of_living':
        const { cost_of_living } = response;
        return cost_of_living;
    }
  };

  $('#search-comp-btn').click(function (event) {
    event.preventDefault();
    let countryLabels = [];
    let countryFields = [];
    var countryColors = ['#e41a1c', '#377eb8'];
    let country_1 = $('#country-1-name').val();
    let country_2 = $('#country-2-name').val();

    if (country_1 == '' || country_2 == '') {
      throw new Error();
    }
    let field = $('#criteria-select').val();

    $.ajax({
      url: '/country/' + country_1,
      type: 'GET',
      async: false,
      global: false,
      contentType: 'application/json',
      success: function (response1) {
        // console.log(response1);
        countryLabels.push(response1[0].name);
        countryFields.push(getFieldFromRes(response1[0], field));
        $('#search-comp-out').text();
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
      async: false,
      global: false,
      success: function (response2) {
        // console.log(response2);
        countryLabels.push(response2[0].name);
        countryFields.push(getFieldFromRes(response2[0], field));
        $('#search-comp-out').text();
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        alert('Error - ' + errorMessage);
      },
    });

    console.log(countryLabels);
    console.log(countryFields);

    $('#bar-chart').empty();
    var barContext = $('#bar-chart');
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
        maintainAspectRatio: false,
        responsive: true,
      },
    });
  });
});


$(document).ready(function () {

  const toArrayCompare = (responses) => {
    let array_compare = [];
    for (let i = 0; i < responses.length; i++) {
      const { name, happiness_score } = responses[i];
      let country_obj = { name, happiness_score };
      array_compare.push(country_obj);
    }
    return array_compare;
  }
  
  let responses = [];
  
  $('#search-comp-btn').click(function (event) {
    event.preventDefault();
    let country_1 = $('#country-1-name').val();
    let country_2 = $('#country-2-name').val();
    // let field = $('#selected-field').val(); //to be done after
    $.ajax({
      url: '/country/' + country_1,
      type: 'GET',
      contentType: 'application/json',
      success: function (response1) {
        // response_1 = response1
        responses.push(response1)
        // console.log(response_1);
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
        // response_2 = response2;
        // console.log(response_2);
        responses.push(response2)
        $('#search-comp-out').text(response2.msg);
      },
      error: function (xhr, status, error) {
        var errorMessage = xhr.status + ': ' + xhr.statusText;
        alert('Error - ' + errorMessage);
      },
    });
    console.log("responses: ", responses) //show both responses in an array
    console.log("1st element: ", responses.length) //undefined 😧
  });
});


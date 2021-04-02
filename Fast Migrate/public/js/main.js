//This script adds the main behavior of the tabs.

/* 
 * Each time a tab is clicked, the one that was clicked is identified,
 * call show to this one, and hide to the others.
 */

$(document).ready(function () {
  $('#sec-tab').hide();
  $('#map').hide();
  function changeDivComponents(tab_element_clicked) {
    $('.flex-contents').each(function (index) {
      let this_id = $(this).attr('id');
      if (this_id.includes(tab_element_clicked.toLowerCase())) {
        $(this).show();
        $('#sec-tab').show();
      } else {
        $(this).hide();
      }
    });
  }
  $('.main-tab-links').click(function () {
    changeDivComponents($(this).text());
  });

  /* The following allows the world map to be shown 
   * only if the world map button is clicked, else it is hidden
   */

  $("#world-map-btn").click(function(event){
    $('#map').show();
  });

  $("#detail-btn").click(function(event){
    $('#map').hide();
  });

  $("#compare-btn").click(function(event){
    $('#map').hide();
  });

});
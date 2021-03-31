$(document).ready(function () {
  $('#sec-tab').hide();
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
});
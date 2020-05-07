//for "enter" key input
$('#inputOne').keyup(function (e) {
  var key = e.keyCode;
  if (key === 13) {
    $(this).val('');
    e.preventDefault();
  }
});

//input behavior and other elements around it
$('#inputOne').bind('click focus',
  function () {
    $(this).val('');
    $('#splittedChar').html('');
    $('#split').prop('disabled', false)
      .slideDown(100);
    $('.charHolder').removeClass(
      'dim pink');
  });

//arrays for the characters (carr) and the numbers (narr)
var carr = [],
  narr = [];

//generate view-able characters list
for (j = 32; j < 127; j++) {
  string = String.fromCharCode(j);
  carr.push(string);
  narr.push(j);  
  $('.charWrapper').append(
    '<div class="charHolder"><span>' +
    string +
    '</span><hr><small><small>' + j +
    '</small></small></div>');
}

//change the first character, the space
$('.charHolder').eq(0).children().eq(0).html("<small><sup>space</sup></small>");

//splitting and locating - button click
$('#split').click(function () {
  var string = $('#inputOne').val();
  //if there's no input (blank)
  if (string === '') {
    $('#splittedChar').html(
      'please enter something');
    $('#split').slideUp(100);
  } 
  //yo, there's input
  else {
    for (k = 0; k < string.length; k++) {
      //charAt() method
      var s = string.charAt(k),
      //indexOf() method
        n = carr.indexOf(s);
      //re-generate the input (splitted)
      $('#splittedChar').append(
        '<div class="list"><strong>' +
        s +
        '</strong>&nbsp;&nbsp;&nbsp;<small><sup>keycode is</sup></small>&nbsp;&nbsp;<em>' +
        narr[n] + '</em></div> ');
      
      //locate the characters
      //"hide" the chars list
      $('.charHolder').addClass('dim');
      //popping out only the chars from input
      $('.charHolder').eq(n).addClass(
        'pink');
    }
    $(this).prop('disabled', true).slideUp(
      100);
  }
});
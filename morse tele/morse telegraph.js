$(document).ready(function() {
        var audio = document.createElement('audio'),
            morseCodeOutput = $('.morse-code-output');
        audio.setAttribute('src', './morse.ogg');
  
  $('.telegraph__tapper').mousedown(function(e) {
    audio.play();
  }).mouseup(function(e) {
    audio.pause();
    audio.currentTime = 0;
  });
  
  // Implementing the SpaceBar idea from Lorenzo, thanks dude!
  $(document).keydown(function(e){
    if( e.keyCode == 32 ){
      audio.play();
      $('.telegraph__tapper').css('margin-bottom', '-2px');
    }
  }).keyup(function(e){
    if( e.keyCode == 32 ){
     audio.pause();
     audio.currentTime = 0;
     $('.telegraph__tapper').css('margin-bottom', '0px');
    } 
  });
    
});
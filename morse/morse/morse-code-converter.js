console.clear()
var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----"

var morseList = morseCode.split('|')
morseList = morseList.map(item=> item.split(';'))

morseList.forEach(item=>
$('.codelist').append(`<li>${item[0]} ${item[1]}</li>`)
)

function findCode(letter){
  for(var i=0; i<morseList.length; i++){
    if(morseList[i][0] == letter.toUpperCase()) {
      return morseList[i][1]
    } 
  }
  return letter
}

function findLetter(code) {
  for(var i=0; i<morseList.length; i++){
    if(morseList[i][1] == code) {
      return morseList[i][0]
    } 
  }
  return code 
}

function translateToMorse(str){
 str = str.split('') 
 var result = str.map(cha => findCode(cha))
 result = result.join(' ')
 return result
}

function translateToEng(code){
  code = code.split(' ')
  var result = code.map(code => findLetter(code))
  result = result.join('')
  return result
}

$('#btnMorse').click(function(){
  var input = $('#input').val()
  var result = translateToMorse(input)
  $('.playList').html('') // reset Playlist
  $('#output').val(result)
  $('#output').css('backgroundColor', '#69CDDA').animate({
    backgroundColor: 'white'
  }, 300)
  $('.symbolText').velocity({
    transform: ["rotate(0deg)", "rotate(360deg)"]
  }, 200)
})

$('#btnEng').click(function(){
  var output = $('#output').val()
  var result = translateToEng(output)
  $('.playList').html('') // reset Playlist
  $('#input').val(result)
  $('#input').css('backgroundColor', '#69CDDA').animate({
    backgroundColor: 'white'
  }, 300)
  $('.symbolText').velocity({
    transform: ["rotate(0deg)", "rotate(360deg)"]
  }) 
})

var short = $('audio.short')[0]
var long =  $('audio.long')[0]

short.volume = 0.2
long.volume = 0.2

function playCode(str, nowIndex){
  var word = str[nowIndex]
  var duration = 300
  if(word == '.') {
    short.play()
    duration = 300
  } else if(word == '-') {
    long.play()
    duration = 500
  } else {
    duration = 300
  }
  
  $('.playList span').removeClass('playing')
  $('.playList span').eq(nowIndex).addClass('playing')
  console.log(word, duration)
  
  // Iterate 
  if(str.length > nowIndex) {
    setTimeout(function(){
      playCode(str, nowIndex+1)
    }, duration)
  }
}

$('#btnPlay').click(function(){
  var content = $('#output').val()
  $('.playList').html('') // reset Playlist
  playCode(content , 0)  
  for(var i=0; i<content.length; i++){
    $('.playList').append(`<span>${content[i]}</span>`)
  }
})
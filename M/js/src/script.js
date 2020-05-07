//定義需要用到的資料
var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----"
// console.clear()
var morseList = morseCode.split("|")
console.log(morseList)
for(var i=0;i<morseList.length;i++){
  morseList[i] = morseList[i].split(";")
  console.log(morseList[i])
  $("ul.translist").append("<li>"+morseList[i][0]+"  "+morseList[i][1]+"</li>")
  $("ul.translist").append("<li>"+morseList[i][0]+"  "+morseList[i][1]+"</li>")
}

function findCode(letter){
  
  for(var i=0;i<morseList.length;i++){
    if (morseList[i][0]==letter){
      return morseList[i][1]
    }  
  }
  return letter;
}
function findLetter(morse){
  
  for(var i=0;i<morseList.length;i++){
    if (morseList[i][1]==morse){
      return morseList[i][0]
    }  
  }
  return morse;
}

function translateMorse(text){
  var text = text.toUpperCase()
  var result = ""
  for(var i =0;i<text.length;i++){
    result += findCode(text[i])+" "
  }
  return result
}
function translateText(morse){
  var morse = morse.split(" ")
  var result = ""
  for(var i =0;i< morse.length;i++){
    result += findLetter(morse[i])
  }
  return result
}
var otext = "hello/world"
var ttext = translateMorse(otext)
var btext = translateText(ttext)
console.log(ttext)
console.log(btext)


// //找到文字對應到的密碼
// function findCode(letter){
//   //全部找過一輪傳回對應密碼
//   for(var i=0;i<morseList.length;i++){
//     if (morseList[i][0]==letter){
//       return morseList[i][1]
//     }
//   }
  
//   //如果沒找到就回傳原始的字
//   return letter;
// }
$("#btnMorse").click(function(){
  var code = $("#input").val()
  console.log(code)
  // console.log(translateMorse(code))
  $("#output").val(translateMorse(code))
  $("#input").css({
    backgroundColor: "#292B73"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".symbol").velocity({           //这个不是很谅解
    rotateZ:["0deg","360deg"]
  })
})

$("#btnEng").click(function(){
  let code = $("#output").val()
  console.log(code)
  // console.log(translateMorse(code))
  $("#input").val(translateText(code))
  $("#output").css({
    backgroundColor: "#292B73"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".symbol").velocity({           //这个不是很谅解
    rotateZ:["0deg","360deg"]
  })
})
$("#input").keyup(function(){
  var item = $("#input").val()
  console.log(item)
  item = item.toUpperCase()
  item = item.split(" ").join("")
  $("#input").val(item)
})

$("audio.long")[0].volume = 0.3
$("audio.short")[0].volume = 0.3

function play(texts,nowindex){
  var word = texts[nowindex]
  //抓到字母播放聲音
  var lasttime =300
  if (word=="."){
      lasttime=300;
    $("audio.short")[0].play()
  }else if (word=="-"){
      lasttime=500;
    $("audio.long")[0].play()
  }else{
      lasttime=1000;
  }
  console.log(word,lasttime)
  
  //顯示當下播放的字母
  $(".playlist span").removeClass("playing")
  $(".playlist span")
    .eq(nowindex).addClass("playing")
  
  //如果當下位置<文字長度 繼續呼叫自己
  if (texts.length>nowindex){
    playerTimer=setTimeout(function(){
      play(texts,nowindex+1)
    },lasttime)
  }else{
    $(".playlist").html("")
  }
}

$("#btnPlay").click(function(){
  console.log("播放")
  var item = $("#output").val()
  console.log(item)
  $(".playlist").html("")
  for(var i=0;i<item.length;i++){
    $(".playlist").append("<span>"+item[i]+"</span>")
  }
  play(item,0)
})
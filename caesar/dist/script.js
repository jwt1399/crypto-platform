var plaintext = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(""),
  cipheralpha = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),
  plaint = document.getElementById("plaintext"),
  ciphtex = document.getElementById("ciphertext"),
  outputted = document.getElementById("outputResult"),
  outputciph = document.getElementById("outputCipher"),
  offsetby = 5,
  firsttime = true;

var bootup = function() { //Function that posts the alphabet array to an HTML element
    for (var i = 0; i < plaintext.length; i++) {
      plaint.innerHTML += plaintext[i].toUpperCase() + ' | '; //Todo:Check if last if so don't add |
      ciphtex.innerHTML += cipheralpha[i].toUpperCase() + ' | ';
    }

  },
  resetAlpha = function() { // Reset script for ease - used prior to offsetting
    plaint.innerHTML = "";
    ciphtex.innerHTML = "";
    plaintext = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(""),
      cipheralpha = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    bootup();
  },

  swap = function() { //The magic. Swaps the characters by the offset amount
    resetAlpha(); // Reset to default
    offsetby = document.getElementById("numberInputted").value; // Get offset(HTML input) Value
    for (var i = 0; i < offsetby; i++) { // For loop that adds the offset# of letters to the back of the alphabet
      cipheralpha.push(cipheralpha[i]);
    }
    for (var j = 0; j < offsetby; j++) { // For loop that removes the letters we pushed to the back of the alphabet
      cipheralpha.shift(cipheralpha[j]);
    }
    Crypt(); // Update our HTML elements to show what is happening
  },
  cipherT = function() { // Function updates our HTML element via keys pushed
    var tempk = event.keyCode;
    console.log(tempk);
    if (firsttime) {
      firsttime = false;
      outputted.textContent = "";
    }
    if (tempk === 8) {
      var tempValue = outputted.textContent.slice(-1);
      if (tempValue === '\u00A0') {
        outputted.textContent = outputted.textContent.substring(0, outputted.textContent.length - 4);
        Crypt();
      }
      outputted.textContent = outputted.textContent.substring(0, outputted.textContent.length - 1);
      Crypt();
    } else if (tempk >= 65 && tempk <= 90) {
      outputted.textContent += String.fromCharCode(tempk);
      Crypt();
    } else if (tempk = 32) {
      outputted.textContent += ' ';
      Crypt();
    }

  },
  Crypt = function() {
    ciphtex.textContent = "";
    for (var k = 0; k < cipheralpha.length; k++) {
      ciphtex.textContent += cipheralpha[k].toUpperCase() + " | ";
    }
    outputciph.textContent = "";
    var tempword = outputted.textContent.split("");
    for (var i = 0; i < tempword.length; i++) {
      if (tempword[i] === " ") {
        outputciph.textContent += " ";
      }
      if (plaintext.indexOf(tempword[i]) != -1) {
        var temphold = plaintext.indexOf(tempword[i]);
        outputciph.textContent += cipheralpha[temphold];
      }
    }
  }

bootup(); // Launch default function
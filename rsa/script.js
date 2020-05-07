$(document).ready(function(){
  var $primeToCheck = $('#primeToCheck'),
      $isPrime =$('#isPrime'),
      $prime1 = $('#prime1'),
      $prime2 = $('#prime2'),
      $phiPrimes = $('#phiPrimes'),
      $primeTotal = $('#primeTotal'),
      $keyE = $('#keyE'),
      $keyD = $('#keyD'),
      $message = $('#message'),
      $messageNums = $('#messageNums'),
      $encC = $('#encC');
  
  var prime1 = 0, prime2 = 0, primeTotal = 0, phiPrimes = 0, isPrime = false, primeToCheck = 0, keyE = 0, keyD = 0, message = '', messageNums = '', encC = 0;

  updateVars();

  $('#checkPrime').click(function(e) {
    e.preventDefault();
    updateVars();
    var res = isNumberPrime(primeToCheck) + '';
    $isPrime.html(res);
  });

  $('#multiplyPrimes').click(function(e) {
    e.preventDefault();
    updateVars();
    $primeTotal.html(prime1 * prime2);
    calculatePhi();
  
  });
  
  $('#encrypt').click(function(e){
    e.preventDefault();
    updateVars();
    convertMessageToNumbers();
  });


  function updateVars() {
    primeToCheck = $primeToCheck.val(); 
    isPrime = $isPrime.val(); 
    prime1 = $prime1.val();
    prime2 = $prime2.val();
    primeTotal = $primeTotal.html();
    phiPrimes =  $phiPrimes.html();
    keyE = $keyE.html();
    keyD = $keyD.html();
    message = $message.val();
    messageNums = $messageNums.html();
    encC = $encC.html();
  }

  function calculatePhi() {
    updateVars();
    phiPrimes = (prime1 - 1) * (prime2 - 1);
    $phiPrimes.html(phiPrimes);
    
    calculateKeyE();
  }

  function calculateKeyE() {
    updateVars();
    var phiFactors = getFactors(phiPrimes);
    
    for(var i = 2; i < phiPrimes; i++) {
      if(jQuery.inArray(i, phiFactors) === -1 && isOdd(i)) {
        keyE = i;
        break;
      }
    }
    
    $keyE.html(keyE);
    calculateKeyD();
  }
  
  function calculateKeyD() {
    updateVars();
    keyD = (2 * phiPrimes + 1) / keyE;
    $keyD.html(keyD);
  }
  
  function convertMessageToNumbers() {
    var msgArray = message.split("");
    
    messageNums = '';
    
    for (var i = 0; i < msgArray.length; i++) {
      messageNums += msgArray[i].charCodeAt(0) - 96;
    }
   
    $messageNums.html(messageNums);
    
    encryptMessage();
  }
  
  function encryptMessage() {
    updateVars();
    
    encC = (Math.pow(messageNums, keyE)) % primeTotal;
    $encC.html(encC);
  }
  
  function isNumberPrime(num) {
    for(var i = 2; i < num; i++)
      if(num % i === 0) return false;
    return num !== 1;
  }

  function getFactors(integer){
    var factors = [],
        quotient = 0;

    for(var i = 1; i <= integer; i++){
      quotient = integer/i;

      if(quotient === Math.floor(quotient)){
        factors.push(i); 
      }
    }
    return factors;
  }
  
  function isOdd(num) { return num % 2;}
});
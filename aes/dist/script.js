//main js
function showDetails() {
  if (document.getElementById("logf").style.display === "block") {
    document.getElementById("logf").style.display = "none";
  } else {
    document.getElementById("logf").style.display = "block";
  }
}

function log_encrypt(q, f) {
  var s = q.keySize;
  var g = q.time;
  var w = q.padding;
  var k = f.passphrase;
  var h = f.plaintext;
  var u = f.ciphertext;
  var v = f.key;
  var j = f.keyInBytes;
  var r = f.keyInHex;
  var t = f.keyInBase64;
  var c = f.iv;
  var l = f.ivInBytes;
  var p = f.ivInHex;
  var b = f.ivInBase64;
  var a = f.salt;
  var o = f.saltInBytes;
  var m = f.saltInHex;
  var e = f.saltInBase64;
  var d = f.saltKeyInHex;
  $("#log").show();
  var n = "<label class='bold'>* Encrypt: </label><br/>";
  n += "passphrase: " + k + "<br/>";
  if (j !== "") {
    n += "key (bytes): " + j + "<br/>";
  }
  if (v !== "") {
    n += "key: " + v + "<br/>";
  }
  if (r !== "") {
    n += "key (hex): " + r + "<br/>";
  }
  if (t !== "") {
    n += "key (base64): " + t + "<br/>";
  }
  if (l !== "") {
    n += "iv (bytes): " + l + "<br/>";
  }
  if (c !== "") {
    n += "iv: " + c + "<br/>";
  }
  if (p !== "") {
    n += "iv (hex): " + p + "<br/>";
  }
  if (b !== "") {
    n += "iv (base64): " + b + "<br/>";
  }
  n += "mode: " + block + "<br/>";
  n += "padding: " + w + "<br/>";
  n += "keySize (bits): " + s + "<br/>";
  if (o !== "") {
    n += "salt (bytes): " + o + "<br/>";
  }
  if (a !== "") {
    n += "salt: " + a + "<br/>";
  }
  if (m !== "") {
    n += "salt (hex): " + m + "<br/>";
  }
  if (e !== "") {
    n += "salt (base64): " + e + "<br/>";
  }
  if (d !== "" && d !== undefined) {
    n += "saltKey (hex): " + d + "<br/>";
  }
  n += "length plaintext: " + h.length + "<br/>";
  var i = openssl_base64_encode(u);
  n += "encryption took " + g + " milliseconds.<br/>";
  n += "<br/>";
  n += "ciphertext: " + u.length + " bytes<br/><textarea onclick='this.select();' rows='3' cols='30' class='sidebartextarea' name='_ciphertext' readonly='readonly'>" + u + "</textarea><br/>";
  n += "ciphertext64 (openSSL): " + i.length + " bytes<br/><textarea onclick='this.select();' rows='3' cols='30' class='sidebartextarea' name='_ciphertext64_openssl' readonly='readonly'>" + i + "</textarea><br/>";
  $("#lenc").html(n);
  $("#ldec").html("");
}

function ShowOrHideDiv(a) {
  if (document.getElementById(a).style.display === "block") {
    document.getElementById(a).style.display = "none";
  } else {
    document.getElementById(a).style.display = "block";
  }
}

function ShowOrHideDivTitle(b) {
  var a = document.getElementById(b);
  if (a === undefined) {
    console.log(b + "is undefined!");
    return;
  }
  if (a.style.display === "block") {
    a.style.display = "none";
    document.getElementById("tagT").innerHTML = "View code";
  } else {
    a.style.display = "block";
    document.getElementById("tagT").innerHTML = "Hide code";
  }
}

function resetDivAndButton(a) {
  $("#txtPlaintext").css({
    border: "" });

  $("#txtVerification").css({
    border: "" });

  $("#txtCiphertext").css({
    border: "" });

  $("#success_test").hide();
  if (a !== 1) {
    $("#logf").hide();
    $("#lenc").html("");
    $("#ldec").html("");
  }
}

function myencode(a) {
  return base64_encode(urlencode(utf8_encode(a)));
}

function mydecode(a) {
  return utf8_decode(urldecode(base64_decode(a)));
}

function genPlaintext() {
  $("#txtVerification").css({
    border: "" });

  var c = urldecode(static_plaintext.trim());
  if (document.getElementById("txtPlaintext") !== null) {
    document.getElementById("txtPlaintext").value = c;
    var b = document.getElementById("txtPlaintext").value;
    var a = b.length;
    if (document.getElementById("lenPlaintext") !== null) {
      document.getElementById("lenPlaintext").innerHTML = a;
    }
  }
  if (document.getElementById("txtCiphertext") !== null) {
    document.getElementById("txtCiphertext").value = "";
  }
  if (document.getElementById("txtVerification") !== null) {
    document.getElementById("txtVerification").value = "";
  }
  if (document.getElementById("txtMessages") !== null) {
    document.getElementById("txtMessages").value = "";
  }
}

function genPlaintext2() {
  var b = document.forms.ui;
  var a = urldecode(static_plaintext.trim());
  b.txtPlaintext.value = a;
}

function getSingleValue() {
  try {
    var a = get_json();
  } catch (d) {
    alert("alert: " + d);
    return false;
  }
  var b = getUserAgent();
  var f = new Object();
  f = [{
    json_single_test: a }];

  var c = JSON.stringify(f);
  saveSpeedTest(1, c);
  return false;
}


function genPassphrase() {
  var a = randomPassphrase(_keySizeInBits);
  document.getElementById("passphrase").value = a;
}

function randomPassphrase(c) {
  try {
    var d = String(rand(10000));
    var b = getHash(d, c);
    return b;
  } catch (a) {
    return -1;
  }
}

function genIv() {
  var b = Crypto.util.randomBytes(16);
  var a = Crypto.util.bytesToHex(b);
  document.getElementById("iv").value = a;
}

function genSalt() {
  var b = Crypto.util.randomBytes(8);
  var a = Crypto.util.bytesToHex(b);
  document.getElementById("salt").value = a;
}

function getHash(c, e) {
  var d;
  var b = parseInt(e);
  if (b === 128) {
    d = Crypto.SHA256(c);
    var a = 128 / 4;
    d = troncaNum(d, a);
  } else {
    if (b === 192) {
      d = Crypto.SHA256(c);
      var a = 192 / 4;
      d = troncaNum(d, a);
    } else {
      if (b === 256) {
        d = Crypto.SHA256(c);
      }
    }
  }
  return d;
}

function troncaNum(c, a) {
  var b = c.toString();
  return b.substring(0, a);
}

function Contar(b, a, g, e) {
  var f = getObject(b);
  var c = getObject(a);
  var d = parseInt(f.value.length);
  if (d <= 0) {
    d = 0;
    g = "<span>" + g + "</span>";
  }
  c.innerHTML = g.replace("{CHAR}", d);
}

function getObject(a) {
  if (document.all) {
    if (typeof a === "string") {
      return document.all(a);
    } else {
      return a.style;
    }
  }
  if (document.getElementById) {
    if (typeof a === "string") {
      return document.getElementById(a);
    } else {
      return a.style;
    }
  }
  return null;
}

function getUserAgent() {
  return navigator.userAgent;
}
var stato = 0,
temp = 0;

function showInfo(a) {
  if (a !== undefined) {
    if (temp !== a) {
      for (var b = 0; b < 20; b++) {
        $("#text" + b).hide();
      }
      stato = 0;
    }
    temp = a;
    if (stato === 0) {
      $("#text" + a).fadeIn();
      stato = 1;
    } else {
      $("#text" + a).fadeOut();
      stato = 0;
    }
  }
  return false;
};
<!DOCTYPE html>
<html>
<head>
  <title>Bank</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Latest compiled and minified CSS -->
  <!-- Compiled and minified CSS -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">

  <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha512.js"></script>
  <style type="text/css">
    body {
      font-family: "Roboto";
    }
    .nav-wrapper {
      background-color: #01579b;
    }
    .brand-logo {
      margin-left: 10px;
      font-family: "Roboto";
      font-weight: 300;
    }
    .home {
      text-align: center;
    }
    label {
      font-size: 20px;
    }
  </style>
</head>
<%- include header.ejs %>
<link href="keyboardstyle.css" type="text/css" rel="stylesheet" />


<body>
  <center><h2>Login</h2></center>
  <div class="container">
    <div class="card-panel">
      <div class="row">


        <form class="col s12" method="post" action="/login">
          
          <div class="row">
              <div class="input-field col s12">
                <select name="usertype">
                  <option selected>Choose your account type</option>
                  <option value="1">Regular Employee</option>
                  <option value="2">System Manager</option>
                  <option value="3">System Admin</option>
                  <option value="4">Individual User</option>
                  <option value="5">Merchant</option>
                </select>
              </div>
          </div>
          <div class="row">
            <div class="col s12">
              <label for="email">Email</label>
              <input id="email" type="email" class="validate" name="email" required>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <label for="password">Password</label>
              <input id="password" type="password" class="validate" name="password" required>
                   <a href="#" id="showkeyboard" title="Type in your password using a virtual keyboard.">Keyboard</a> <br />
            </div>
          </div>
          <script src='https://www.google.com/recaptcha/api.js'></script>
<div class="g-recaptcha" data-sitekey="6Lda8S8UAAAAAHvfMbqaeLPXi5ov0OHQO5Oq2X6i"></div>
          <div class="row">
            <div class="col s12">
              <input type="submit" class="waves-effect waves-light btn" value="LOGIN" onclick="abc()" name="login">
            </div>
          </div>
        </form>
      </div>
      <a href="entermailforgotpassword.html">Forgot Password</a>
    </div>
  </div>
  <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  <!-- Compiled and minified JavaScript -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
</body>

<script type="text/javascript">
   $(".button-collapse").sideNav();
   $('.dropdown-button').dropdown({
      constrainWidth: false,
    }
  );
   $(document).ready(function() {
    $('select').material_select();
  });
</script>
<script>
window.onload = function () { history.forward(); }
window.onunload = function() {}; 

function abc(){
  console.log("hello");
    var password=document.getElementById("password").value;

var hash= sha1(password );
    var password=document.getElementById("password");

    //password.value=hash;
}


function sha1(msg)
{
  function rotl(n,s) { return n<<s|n>>>32-s; };
  function tohex(i) { for(var h="", s=28;;s-=4) { h+=(i>>>s&0xf).toString(16); if(!s) return h; } };
  var H0=0x67452301, H1=0xEFCDAB89, H2=0x98BADCFE, H3=0x10325476, H4=0xC3D2E1F0, M=0x0ffffffff; 
  var i, t, W=new Array(80), ml=msg.length, wa=new Array();
  msg += String.fromCharCode(0x80);
  while(msg.length%4) msg+=String.fromCharCode(0);
  for(i=0;i<msg.length;i+=4) wa.push(msg.charCodeAt(i)<<24|msg.charCodeAt(i+1)<<16|msg.charCodeAt(i+2)<<8|msg.charCodeAt(i+3));
  while(wa.length%16!=14) wa.push(0);
  wa.push(ml>>>29),wa.push((ml<<3)&M);
  for( var bo=0;bo<wa.length;bo+=16 ) {
    for(i=0;i<16;i++) W[i]=wa[bo+i];
    for(i=16;i<=79;i++) W[i]=rotl(W[i-3]^W[i-8]^W[i-14]^W[i-16],1);
    var A=H0, B=H1, C=H2, D=H3, E=H4;
    for(i=0 ;i<=19;i++) t=(rotl(A,5)+(B&C|~B&D)+E+W[i]+0x5A827999)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=20;i<=39;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0x6ED9EBA1)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=40;i<=59;i++) t=(rotl(A,5)+(B&C|B&D|C&D)+E+W[i]+0x8F1BBCDC)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    for(i=60;i<=79;i++) t=(rotl(A,5)+(B^C^D)+E+W[i]+0xCA62C1D6)&M, E=D, D=C, C=rotl(B,30), B=A, A=t;
    H0=H0+A&M;H1=H1+B&M;H2=H2+C&M;H3=H3+D&M;H4=H4+E&M;
  }
  return tohex(H0)+tohex(H1)+tohex(H2)+tohex(H3)+tohex(H4);
}

</script>


<div id="keyboard">
  <div id="row0">
    <input name="accent" type="button" value="`" />
    <input name="1" type="button" value="1" />
    <input name="2" type="button" value="2" />
    <input name="3" type="button" value="3" />
    <input name="4" type="button" value="4" />
    <input name="5" type="button" value="5" />
    <input name="6" type="button" value="6" />
    <input name="7" type="button" value="7" />
    <input name="8" type="button" value="8" />
    <input name="9" type="button" value="9" />
    <input name="0" type="button" value="0" />
    <input name="-" type="button" value="-" />
    <input name="=" type="button" value="=" />
    <input name="backspace" type="button" value="Backspace" />
  </div>
  
  <div id="row0_shift">
    <input name="tilde" type="button" value="~" />
    <input name="exc" type="button" value="!" />
    <input name="at" type="button" value="@" />
    <input name="hash" type="button" value="#" />
    <input name="dollar" type="button" value="$" />
    <input name="percent" type="button" value="%" />
    <input name="caret" type="button" value="^" />
    <input name="ampersand" type="button" value="&" />
    <input name="asterik" type="button" value="*" />
    <input name="openbracket" type="button" value="(" />
    <input name="closebracket" type="button" value=")" />
    <input name="underscore" type="button" value="_" />
    <input name="plus" type="button" value="+" />
    <input name="backspace" type="button" value="Backspace" />
  </div>
  
  <div id="row1">
    <input name="q" type="button" value="q" />
    <input name="w" type="button" value="w" />
    <input name="e" type="button" value="e" />
    <input name="r" type="button" value="r" />
    <input name="t" type="button" value="t" />
    <input name="y" type="button" value="y" />
    <input name="u" type="button" value="u" />
    <input name="i" type="button" value="i" />
    <input name="o" type="button" value="o" />
    <input name="p" type="button" value="p" />
    <input name="[" type="button" value="[" />
    <input name="]" type="button" value="]" />
    <input name="\" type="button" value="\" />
  </div>
  
  <div id="row1_shift">
    <input name="Q" type="button" value="Q" />
    <input name="W" type="button" value="W" />
    <input name="E" type="button" value="E" />
    <input name="R" type="button" value="R" />
    <input name="T" type="button" value="T" />
    <input name="Y" type="button" value="Y" />
    <input name="U" type="button" value="U" />
    <input name="I" type="button" value="I" />
    <input name="O" type="button" value="O" />
    <input name="P" type="button" value="P" />
    <input name="{" type="button" value="{" />
    <input name="}" type="button" value="}" />
    <input name="|" type="button" value="|" />
  </div>
  
  <div id="row2">
    <input name="a" type="button" value="a" />
    <input name="s" type="button" value="s" />
    <input name="d" type="button" value="d" />
    <input name="f" type="button" value="f" />
    <input name="g" type="button" value="g" />
    <input name="h" type="button" value="h" />
    <input name="j" type="button" value="j" />
    <input name="k" type="button" value="k" />
    <input name="l" type="button" value="l" />
    <input name=";" type="button" value=";" />
    <input name="'" type="button" value="'" />  
  </div>
  
  <div id="row2_shift">
    <input name="a" type="button" value="A" />
    <input name="s" type="button" value="S" />
    <input name="d" type="button" value="D" />
    <input name="f" type="button" value="F" />
    <input name="g" type="button" value="G" />
    <input name="h" type="button" value="H" />
    <input name="j" type="button" value="J" />
    <input name="k" type="button" value="K" />
    <input name="l" type="button" value="L" />
    <input name=";" type="button" value=":" />
    <input name="'" type="button" value='"' />
  </div>
  
  <div id="row3">
    <input name="Shift" type="button" value="Shift" id="shift" />
    <input name="z" type="button" value="z" />
    <input name="x" type="button" value="x" />
    <input name="c" type="button" value="c" />
    <input name="v" type="button" value="v" />
    <input name="b" type="button" value="b" />
    <input name="n" type="button" value="n" />
    <input name="m" type="button" value="m" />
    <input name="," type="button" value="," />
    <input name="." type="button" value="." />
    <input name="/" type="button" value="/" />
  </div>
  
  <div id="row3_shift">
    <input name="Shift" type="button" value="Shift" id="shifton" />
    <input name="Z" type="button" value="Z" />
    <input name="X" type="button" value="X" />
    <input name="C" type="button" value="C" />
    <input name="V" type="button" value="V" />
    <input name="B" type="button" value="B" />
    <input name="N" type="button" value="N" />
    <input name="M" type="button" value="M" />
    <input name="lt" type="button" value="&lt;" />
    <input name="gt" type="button" value="&gt;" />
    <input name="?" type="button" value="?" />
  </div>
  
  <div id="spacebar">
    <input name="spacebar" type="button" value=" " />
  </div>
  
</div>
<script type="text/javascript" src="jquery-1.2.6.min.js"></script>
<script type="text/javascript" src="jquery-ui-personalized-1.5.2.min.js"></script>
<script type="text/javascript" src="jquery-fieldselection.js"></script>
<script type="text/javascript" src="vkeyboard.js"></script>

</html>

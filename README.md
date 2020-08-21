# poke-jump-part-1
part 1 of  a little game i am coding
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Poke-Jump</title>
  <style>
  *{
    font-family:calibri;
    
  }
  
  canvas{
    border:1px solid #000;
    display:block;
    margin: 0 auto;
    z-index:1
  }
  
  .hide{
    display:none;
  }
  
  center{
    position:absolute;
    left: 345px;
    top:10px
  }
  
  
  
  
  </style>
</head>
<body>
  <div>
  code<b>Myster</b>
  </div>
  <canvas id="can" width="480px" height="700px"></canvas>
  <center>
    <p class="hide" id="la">
  Welcome to Poke - Jump <br>
  Press play to start
  </p>
  <p id="mi">
  Game Over<br>
  Press the replay button
  </p>
  </center>
  
  
  <img class="hide" id="noise" src="https://t5.rbxcdn.com/743137af7c7c21034faaf3e088495794" alt="pokemon sprite"  >
  
  <img class="hide" id="nani" src="https://i.pinimg.com/originals/b2/b0/84/b2b084ad6061dfe2122302266ea8af58.jpg" alt="background">
  
  <img class="hide" id="start" src="https://cplfoundation.org/wp-content/uploads/2019/07/Play-button-450x450.png" alt="start sprite">
  
  <img id="re" class="hide" src="https://img.icons8.com/carbon-copy/2x/repeat.png" alt="restart sprite">
  
  <img id="hi" class="hide" src="https://t3.rbxcdn.com/6dfd7c68e21644c7b3224be3bd0e1a33" alt="pikachu jumping sprite">
  
  
  
  
  
  <script>
  const cvs = document.getElementById('can');
  const cxt = cvs.getContext("2d");
  let frames = 0;

  
 // game state
 const state = {
 current : 0,
 getReady : 0,
 game : 1,
 over : 2
 }
  // control the game
  cvs.addEventListener('click', function(evt){
  switch(state.current){
  case state.getReady:
  state.current = state.game;
  break;
  case state.over:
  state.current = state.getReady;
  break;
    
  }
  
  })
  
  
  
  var xPos = 0;
  var yPos = 600;
  let gravity = 0.9;
  let isJumping = false;
  let isGoingLeft = false;
  let isGoingRight = false;
   function move(e){
   if (isJumping) return;
   let timerId = setInterval(function (){
   if(yPos < 530){
   clearInterval(timerId);
   let timerDownId = setInterval(function(){
    if(yPos > 570){
   clearInterval(timerDownId);
   isJumping = false;
   }
   yPos += 5;
   }, 20)
   }
   
  if(e.keyCode === 38){
  isJumping = true;
   yPos -= 10;
   yPos = yPos * gravity;
   }
  },20)
  
  
   
   }
  
  document.onkeydown = move;
  
  
  
  
  function draw(){
  cxt.fillStyle = "#70c5ce";
  cxt.fillRect(0, 0, cvs.width, cvs.height);
  }
  
  function update(){
 
  }
  
  function drawPika(){
  if(isJumping){
  const hi = document.getElementById('hi');
  cxt.drawImage(hi, xPos, yPos, 85, 80);
  }else{
  const noise = document.getElementById('noise');
  cxt.drawImage(noise, xPos,yPos, 85, 80);
  }
  
  
  }
  
  var bg = new Image();
  bg.src = "https://i.pinimg.com/originals/b2/b0/84/b2b084ad6061dfe2122302266ea8af58.jpg";
  
  function background(){
   this.x = 0, this.y = 0, this.w = bg.width, this.h = bg.height;
   
 
  
  this.render = function(){
  if(state.current == state.getReady || state.current == state.over){
  const nani = document.getElementById('nani');
  cxt.drawImage(nani,0,0);
  }
  if(state.current == state.game){
  cxt.drawImage(bg, this.x--,0);
 if(this.x <= -23){
  this.x = 0;
  }
   
  
  
  }
 
 
  
 }
  
  
  }
  
  
  
  var background = new background();
  
  function star () {
  const la = document.getElementById('la');
  if(state.current == state.getReady || state.current == state.over){
  la.classList.remove('hide');
  }
  if(state.current == state.game){
  la.classList.add('hide');
  }if(state.current == state.over){
  la.classList.add('hide');
  }
  }
  
  function star2 () {
  const mi = document.getElementById('mi');
  if(state.current == state.over){
  la.classList.remove('hide');
  }
  else{
  mi.classList.add('hide');
  }
  }
  
   function drawStart(){
   if(state.current == state.getReady){
     const start = document.getElementById('start');
  cxt.drawImage(start, cvs.height/2-150, cvs.width/2,100,100);
  
   }
  }
  
 
  
 function drawRe(){
  if(state.current == state.over){
  const re = document.getElementById("re");
  cxt.drawImage(re, cvs.height/2-210, cvs.width/2);
  }
  
  }
  
  function loop(){
 update();
  draw();
  frames++;
  
  const cvs = document.getElementById('can');
  const cxt = cvs.getContext("2d");
  
  requestAnimationFrame(loop);
 
  background.render();
 

 drawStart();
 drawRe();
 
 star();
 star2();
 drawPika();
  
  }
  
  
  
  loop();
  
 
  
  </script>
</body>
</html>

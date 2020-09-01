 const cvs = document.getElementById('can');
 const cxt = cvs.getContext("2d");
 let frames = 0;


 // game state
 var  state = {
   current: 0,
   getReady: 0,
   game: 1,
   over: 2
 }
 // control the game
 cvs.addEventListener('click', function(evt) {
   switch (state.current) {
     case state.getReady:
       state.current = state.game;
       break;
       case state.over:
       state.current = state.getReady;
       break;

   }

 });



 var xPos = 0;
 var yPos = 580;
 let gravity = 1;
 let isJumping = false;
 let isGoingLeft = false;
 let isGoingRight = false;
 let animFrames;

 function move(e) {
   if (isJumping) return;
   let timerId = setInterval(function() {
     if (yPos < 200) {
       clearInterval(timerId);
       let timerDownId = setInterval(function() {
         if (yPos > 570) {
           clearInterval(timerDownId);
           isJumping = false;
         }
         yPos += 5;

       }, 20)
     }

     if (e.keyCode == 38) {
       isJumping = true;
       yPos -= 10;
       yPos = yPos * gravity;
       xPos += 1.5;
     }
   }, 20)

 }

 document.onkeydown = move;






 function drawStar() {
   if (state.current == state.getReady) {
     cxt.fillStyle = "black";
     cxt.font = "16px calibri";
     cxt.fillText(" Welcome to Poke - Jump", cvs.height / 2 - 180, 18);
     cxt.fillText("Press play to start ", cvs.height / 2 - 160, 35);
   }
   if (state.current == state.over) {
     cxt.fillStyle = "black";
     cxt.font = "16px calibri";
     cxt.fillText("Game Over", cvs.height / 2 - 140, 18);
     cxt.fillText("Press the replay button ", cvs.height / 2 - 180, 35);
     cancelAnimationFrame(animFrames);
   }
 }


 function drawPika() {
   this.radius = 12;
   if (isJumping) {
     const hi = document.getElementById('hi');
     cxt.drawImage(hi, xPos, yPos, 85, 80);
   } else {
     if (state.current == state.getReady || state.current == state.game) {
       const noise = document.getElementById('noise');
       cxt.drawImage(noise, xPos, yPos, 85, 80);
     }

   }
   if (state.current == state.over) {
     cxt.drawImage(noice, xPos, yPos, 85, 80);
   }

   if (xPos > 400) {
     if (isJumping) return;
     xPos = 10;
     // state.current = state.over;
   }
 }

 noise.radius = 12;
 //Collision detection
 function checkCollision() {
   //Pipes
   if (xPos + 80 > pipes.x && xPos + 40 < (pipes.x + pipes.w) && yPos > 700 - pipes.h) {
     console.log("Collision with Pipe!");
     state.current = state.over;
   }

   //Shells
   if (xPos + 80 > shell.x && xPos + 40 < (shell.x + shell.w) && yPos > 700 - shell.h) {
     console.log("Collision with Shell!");
     state.current = state.over;
   }
 }



 var bg = new Image();
 bg.src = "https://i.pinimg.com/originals/b2/b0/84/b2b084ad6061dfe2122302266ea8af58.jpg";



 function background() {
   this.x = 0, this.y = 0, this.w = bg.width, this.h = bg.height;




   this.render = function() {
     if (state.current == state.getReady || state.current == state.over) {
       const nani = document.getElementById('nani');
       cxt.drawImage(nani, 0, 0);
     }
     if (state.current == state.game) {

       cxt.drawImage(bg, this.x--, 0);
       if (this.x <= -23) {
         this.x = 0;
       }
     }
   }
 }
 var background = new background();
 const no = new Image();
 no.src = "https://raw.githubusercontent.com/CodeExplainedRepo/FlappyBird-JavaScript/master/images/pipeSouth.png";
 no.width = 62;
 no.height = 275;

 function pipes() {
   this.x = 502, this.y = 0, this.w = no.width, this.h = no.height;
   this.render = function() {
     if (state.current == state.getReady || state.current == state.over) {
       cxt.drawImage(nah, 502, 100);
     }
     if (state.current == state.game) {

       cxt.drawImage(no, this.x--, 500);
       if (this.x <= -52) {
         this.x = 502;
       }
     }
   }
 }
 var pipes = new pipes();

 const yes = new Image();
 yes.src = "https://www.mariowiki.com/images/thumb/f/f4/MK7-Spiny-Shell.png/160px-MK7-Spiny-Shell.png";
 yes.height = 154;

 function shell() {
   this.x = 730, this.y = 0, this.w = 50, this.h = 200;

   this.render = function() {
     if (state.current == state.getReady || state.current == state.over) {
       cxt.drawImage(yah, 600, 0);
     }
     if (state.current == state.game) {
       cxt.drawImage(yes, this.x--, 580, 50, 50);
       if (this.x <= -50) {
         this.x = 502;
       }
     }
   }

 }

 var shell = new shell();

 function drawStart() {
   if (state.current == state.getReady) {
     const start = document.getElementById('start');
     cxt.drawImage(start, cvs.height / 2 - 150, cvs.width / 2, 100, 100);

   }
 }

 function draw() {
   cxt.fillStyle = "#70c5ce";
   cxt.fillRect(0, 0, cvs.width, cvs.height);

 }

 function drawRe() {
   if (state.current == state.over) {
     const re = document.getElementById("re");
     cxt.drawImage(re, cvs.height / 2 - 210, cvs.width / 2);
   }

 }

 function update() {

 }

 function loop() {
   animFrames = requestAnimationFrame(loop);
   update();
   draw();
   frames++;
   checkCollision();
   const cvs = document.getElementById('can');
   const cxt = cvs.getContext("2d");


   background.render();
   pipes.render();

   drawStar();
   drawStart();
   drawRe();

   shell.render();
   drawPika();

 }



 loop();

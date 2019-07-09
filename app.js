 const tetrominos = []
 let currentTetromino;
 const height = 16
 const width = 10
 const gameState = 1 //play pause game over
 const color = ["blue", "red", "orange", "yellow", "green"]
 const move = 0
 const filledSpace = []
 let direction = ""
 const score = 0

 const makePlayField = () => {
     const playfield = document.querySelector('.tetris-board')
     playfield.innerText = ''
     let counter = 0
     for(h = 0; h < height; h++) {
       const row = document.createElement('div')
       row.className = "row"
       row.dataset.row = h
       for(w = 0; w < width; w++) {
         const space = document.createElement('div')
         space.className = "space"
         space.dataset.w = w
         space.dataset.h = h
         space.dataset.index = counter
         space.dataset.state = 0
         space.innerText = "0: " + counter
         row.appendChild(space)
         counter ++
       }
       playfield.appendChild(row)
     }
 };

 makePlayField();

 const tetrominoShape = () => {
     let t = [[1, 0], [0,1], [1,1],[2,1]]  //T
     let i = [[0, 0], [0, 1], [0, 2], [0, 3]] // line
     let o = [[0, 0], [0, 1], [1, 0], [1, 1]]  //square
     let l = [[2,0], [0, 1], [1, 1], [2,1]]  //L
     let s = [[0,0], [1,0], [1,1], [2,1]]  //S
     let j = [[2,1], [1,1], [1,0], [0,0]]  //J
     tetrominos.push(t);
     tetrominos.push(i);
     tetrominos.push(o);
     tetrominos.push(l);
     tetrominos.push(s);
     tetrominos.push(j);
 };

 tetrominoShape();

 const createTetromino = () => {
   let randTetro = Math.floor(Math.random() * tetrominos.length)
   let randColor = Math.floor(Math.random() * color.length)
   const center = Math.floor(width / 2)
   let tetromino = tetrominos[randTetro]
   const location = [center, 0]

   currentTetromino = {
     tetromino: tetromino,
     color: color[randColor],
     location: location,
    // index: blockCoordinates(tetromino, location)  used for collision detection
   }
 };

 const drawTetromino = () => {
   //drawing tetris block onto playfield
   let tetromino = currentTetromino.tetromino
   let location = currentTetromino.location

   clearCurrent() //clear current block and update status

   if(direction === 'down') {
     currentTetromino.location[1]++
   }
   else if(direction === 'left') {
     currentTetromino.location[0]--
   }
   else if(direction === 'right') {
     currentTetromino.location[0]++
   }

   //redraw new block
   for(i = 0; i < tetromino.length; i++) {
       let w = tetromino[i][0] + location[0]
       let h = tetromino[i][1] + location[1]
       let space = document.querySelector('[data-w="'+ w +'"][data-h="'+ h +'"]')
       space.classList.add('filled')
       space.style.backgroundColor = currentTetromino.color
   }
 };

 function clearCurrent()
 {
      //reset all blocks
     var tetromino = currentTetromino.tetromino;
     var location = currentTetromino.location;

     for(var i = 0; i < tetromino.length; i++)
     {
         var w = tetromino[i][0] + location[0];
         var h = tetromino[i][1] + location[1];
         var space = document.querySelector('[data-w="' + w + '"][data-h="' + h + '"]');
         space.classList.remove('filled');
         space.style.backgroundColor="";
     }
 }

 function checkKey(e) {
     e.preventDefault();

     e = e || window.event;

     if (e.keyCode == '40') {
          //down arrow
         direction="down";
     }
     else if (e.keyCode == '37') {
          //left arrow
         direction="left";
     }
     else if (e.keyCode == '39') {
          //right arrow
         direction="right";
     }

     drawTetromino();
 }

 function start()
 {
     makePlayField();
     tetrominoShape();
     createTetromino();
     drawTetromino();
     document.onkeydown = checkKey;
 }

 window.addEventListener('load', function(){
     start();
 });

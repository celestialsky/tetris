 const tetrominos = []
 let currentTetromino;
 const height = 16
 const width = 10
 const gameState = 1 //play pause game over
 const colors = ["blue", "red", "orange", "yellow", "green", "black"]
 const move = 0
 const filledSpace = []
 let direction = ""
 const score = 0

 const makePlayField = () => {
     const playfield = document.querySelector('#tetris-board')
     playfield.innerText = ''
     let counter = 0
     for(h = 0; h < height; h++) {
       const row = document.createElement('tr')
       row.className = "row"
       row.dataset.row = h
       for(w = 0; w < width; w++) {
         const space = document.createElement('td')
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

 //makePlayField();

 const tetrominoShape = () => {
     let t = [[1, 0], [0,1], [1,1],[2,1]]  //T
     let i = [[0, 0], [0, 1], [0, 2], [0, 3]] // line
     let o = [[0, 0], [0, 1], [1, 0], [1, 1]]  //square
     let l = [[2,0], [0, 1], [1, 1], [2,1]]  //L
     let s = [[0,0], [1,0], [1,1], [2,1]]  //S
     let j = [[2,1], [1,1], [1,0], [2,0]]  //J
     tetrominos.push(t);
     tetrominos.push(i);
     tetrominos.push(o);
     tetrominos.push(l);
     tetrominos.push(s);
     tetrominos.push(j);
 };

 //tetrominoShape();

 const createTetromino = () => {
   let randTetro = Math.floor(Math.random() * tetrominos.length)
   let randColor = Math.floor(Math.random() * colors.length)
   const center = Math.floor(width / 2)
   let tetromino = tetrominos[randTetro]
   const location = [center, 0]

   currentTetromino = {
     tetromino: tetromino,
     color: colors[randColor],
     location: location,
     //index: blockCoordinates(tetromino, location)  //used for collision detection
   }
 };

 const drawTetromino = () => {
   if (!hitGridWall()){
   //drawing tetris block onto playfield
   let tetromino = currentTetromino.tetromino
   let location = currentTetromino.location

   clearCurrent() //clear current block and update status

   if(direction === 'down') {
     currentTetromino.location[1]++
   }
   else if(direction === 'left' && !hitGridWall()) {
     currentTetromino.location[0]--
   }
   else if(direction === 'right' && !hitGridWall()) {
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
 }
 };

 function clearCurrent()
 {
      //reset all blocks
     let tetromino = currentTetromino.tetromino;
     let location = currentTetromino.location;

     for(let i = 0; i < tetromino.length; i++)
     {
         let w = tetromino[i][0] + location[0];
         let h = tetromino[i][1] + location[1];
         let space = document.querySelector('[data-w="' + w + '"][data-h="' + h + '"]');
         space.classList.remove('filled');
         space.style.backgroundColor="";
     }
     //currentTetromino.index = blockCoordinates(currentTetromino.tetromino, currentTetromino.location)
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

 function clearCoordinates() {
   const spaces = document.querySelectorAll(".space")
   for(let i = 0; i < spaces.length; i++) {
     spaces[i].innerText = ""
   }
 }

 function hitGridWall() {
     // check if the current block is at edge already
     // if any block in shape has an h index of 0 or width - 1
     // or if any element to the left of right is occupied
     let blocks = currentTetromino.tetromino;
     let offset = currentTetromino.location;
     let collision = '';

     // let pos = document.querySelectorAll('.filled')
     //
     // pos.forEach(function(coord){
     //   let cord = pos.getAttribute('data-w');
     //
     //   console.log(coord);
     //   console.log(cord);
     // })
       // let big = document.querySelector('[data-h="' + h + '"]')
       //let fill = pos.ClassName
       // let stack = true
       // if(Math.max(big) + 1 === fill){
       //   console.log(coord);
       //   return stack
       // }
     //   console.log(coord);
     //   console.log(big);
     // })
     // console.log(pos)
     //console.log(yes);

     for(let i = 0; i < blocks.length; i++){
        let block = blocks[i];
        let w = block[0] + offset[0];
        let h = block[1] + offset[1];


        if (direction === "left")
          w--;
        else if (direction === "right")
          w++



        if (direction === "down")
          h++;

        if (w < 0 && direction === "left") {
          collision = "side";
          break;
        }

        else if (w === width && direction === "right") {
          collision = "side";
          break;
        }

        let space = document.querySelector('[data-w="' + w + '"][data-h="' + h + '"]')
        filledSpace.push(space)
        if (filledSpace.indexOf(space.dataset.index) > -1) {
          collision = "side"
          break
        }

        // if(space.className === "space filled") {
        //   collision = "bottom"
        //   break
        // }
        //console.log(currentTetromino)
        //console.log(space);
        //filledSpace.forEach(space => console.log(space.dataset.w) )
        //  ;
        // console.log(filledSpace.indexOf(space.));



        if(direction === "down") {
          h++
        }

        //let index = document.querySelector('[data-w="' + w + '"][data-h="' + h + '"]')
        //filledSpace.push(index)

        if(h === height /*|| filledSpace.indexOf(index.dataset.index) > -1*/) {
          collision = "bottom"
          if(collision === "bottom"){
            createTetromino()
          }
        }


     }

     return collision;
 }

 // function hitVertical() {
 //   let blocks = currentTetromino.tetromino;
 //   let offset = currentTetromino.location;
 //   let collision = '';
 //
 //   for(let i = 0; i < blocks.length; i++){
 //      let block = blocks[i];
 //      let w = block[0] + offset[0];
 //      let h = block[1] + offset[1];
 //
 //      if(direction === "down") {
 //        h++
 //      }
 //
 //      let index = document.querySelector('[data-w="' + w + '"][data-h="' + h + '"]')
 //      filledSpace.push(index)
 //
 //      if(h === height || filledSpace.indexOf(index.dataset.index) > -1) {
 //        collision = "bottom"
 //        break
 //      }
 //
 //      if(collision === "bottom"){
 //        createTetromino()
 //      }
 //
 //    }
 // }


 function start()
 {
     makePlayField();
     tetrominoShape();
     createTetromino();
     drawTetromino();
     document.onkeydown = checkKey;
     hitGridWall()
//     hitVertical()
     clearCoordinates()

 }

 window.addEventListener('load', function(){
     start();
 });

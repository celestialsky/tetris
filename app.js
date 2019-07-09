const tetrominos = []
let currentTetromino;
const height = 16
const width = 10
//const gameState = 1 //play pause game over
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

//makePlayField();

const tetrominoShape = () => {
    let t = [[1, 0], [0,1], [1,1],[2,1]] // T
    let i = [[0, 0], [0, 1], [0, 2], [0, 3]] // line
    let o = [[0, 0], [0, 1], [1, 0], [1, 1]] // square
    let l = [[2,0], [0, 1], [1, 1], [2,1]] // L
    let s = [[0,0], [1,0], [1,1], [2,1]] // S
    let j = [[2,1], [1,1], [1,0], [0,0]] // J
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
  let randColor = Math.floor(Math.random() * color.length)
  const center = Math.floor(width / 2)
  let tetromino = tetrominos[randTetro]
  const location = [center, 0]

  currentTetromino = {
    tetromino: tetromino,
    color: color[randColor],
    location: location,
    //index: blockCoordinates(tetromino, location) // used for collision detection
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
    // reset all blocks
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
        // down arrow
        direction="down";
    }
    else if (e.keyCode == '37') {
        // left arrow
        direction="left";
    }
    else if (e.keyCode == '39') {
        // right arrow
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


//
// var shapes = new Array();
// var currentShape;
// var height = 15;
// var width = 10;
// var state = 1;      // 1 running - 0 paused - 2 game over
// var colors = ['black', 'orange', 'red', 'blue'];
// var move = 0;
// var occupiedblocks = new Array();
// var direction = "";
// var points = 0;
//
// function createBoard()
// {
//     var board = document.getElementsByClassName('tetris-board')[0];
//     board.innerHTML = '';
//     var counter = 0;
//     for (var y = 0; y < height; y++)
//     {
//         var row = document.createElement('div');
//         row.className = 'row';
//         row.dataset.row = y;
//
//         for (var x = 0; x < width; x++)
//         {
//             var block = document.createElement('div');
//             block.className = 'block';
//             block.dataset.x = x;
//             block.dataset.y = y;
//             block.dataset.index = counter;
//             block.dataset.state = 0;
//             block.innerHTML = "0 : " + counter;
//             row.appendChild(block);
//             counter++;
//         }
//
//         board.appendChild(row);
//     }
// }
// function createShapes()
// {
//     var other = [[1, 0], [0,1], [1,1],[2,1]]; //
//     var line = [[0, 0], [0, 1], [0, 2], [0, 3]]; // line
//     var square = [[0, 0], [0, 1], [1, 0], [1, 1]];
//     var l = [[2,0], [0, 1], [1, 1], [2,1]];
//     shapes.push(square);
//     shapes.push(line);
//     shapes.push(other);
//     shapes.push(l);
// }
//
//
// function drawShape()
// {
//     // draw the current shape onto board
//     var shape = currentShape.shape;
//     var location = currentShape.location;
//
//     // update status to unoccupied of current block
//     clearCurrent();
//
//     // based on direction of block, set the offset
//     if (direction=="down")
//         currentShape.location[1]++;
//     else if(direction=="left")
//         currentShape.location[0]--;
//     else if (direction=="right")
//         currentShape.location[0]++;
//
//     // redraw the shape onto the board
//     for(var i = 0; i < shape.length; i++)
//     {
//         var x = shape[i][0] + location[0];    //  x + offset
//         var y = shape[i][1] + location[1];    // y + offset
//         var block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
//         block.classList.add('filled');
//         block.style.backgroundColor = currentShape.color;
//     }
//
//     currentShape.indexes = getBlockNumbers(currentShape.shape, currentShape.location);
// }
//
// function clearCurrent()
// {
//     // reset all blocks
//     var shape = currentShape.shape;
//     var location = currentShape.location;
//
//     for(var i = 0; i < shape.length; i++)
//     {
//         var x = shape[i][0] + location[0];
//         var y = shape[i][1] + location[1];
//         var block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
//         block.classList.remove('filled');
//         block.style.backgroundColor="";
//     }
// }
//
// function checkKey(e) {
//     e.preventDefault();
//
//     e = e || window.event;
//
//     if (e.keyCode == '40') {
//         // down arrow
//         direction="down";
//     }
//     else if (e.keyCode == '37') {
//         // left arrow
//         direction="left";
//     }
//     else if (e.keyCode == '39') {
//         // right arrow
//         direction="right";
//     }
//
//     drawShape();
// }
//
// function start()
// {
//     createBoard();
//     createShapes();
//     createShape();
//     drawShape();
//     document.onkeydown = checkKey;
// }
//
// window.addEventListener('load', function(){
//     start();
// });
//
//
// function hitTheWall()
// {
//     // check if the current block at at the edge already
//     // if any block in shape has an x index of 0 or width - 1
//     // or if any element to the left of right is occupied
//     var blocks = currentShape.shape;
//     var offset = currentShape.location;
//     var collision = false;
//
//     for(var i = 0; i < blocks.length; i++)
//     {
//         var block = blocks[i];
//         var x = block[0] + offset[0];
//         var y = block[1] + offset[1];
//
//         if (direction=="left")
//             x--;
//         else if (direction=="right")
//             x++;
//
//         var blk = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
//
//         if (occupiedblocks.indexOf(blk.dataset.index) > -1)
//         {
//             collision=true;
//             break;
//         }
//
//         if (x < 0 && direction=="left")
//         {
//             collision=true;
//             break;
//         }
//
//         else if (x == width && direction == "right")
//         {
//             collision=true;
//             break;
//         }
//     }
//
//     return collision;
// }
//
// // check if block has a collision
// // if lowest 'y' block in each 'x' has hit an oocupied area
// // predictive
// // will look at the following line, to see if collided
// function collided()
// {
//     var blocks = currentShape.shape;
//     var offset = currentShape.location;
//     var collision = false;
//
//     // determine if next block down will result in collision
//     for(var i = 0; i < blocks.length; i++)
//     {
//         var block = blocks[i];
//         var x = block[0] + offset[0];
//         var y = block[1] + offset[1];
//
//         if (direction =="down")
//             y++;
//
//         var block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
//
//         if (y == height || occupiedblocks.indexOf(block.dataset.index) > -1)
//         {
//             collision = true;
//             break;
//         }
//     }
//
//     // if it does, we will set the state of the shapes current location to occupied
//     // we will then store those occupied index for future lookup
//     // create a new shape
//     // and determine whether we have completed a full row to clear
//     if (collision)
//     {
//         for(var i = 0; i < blocks.length; i++)
//         {
//             var block = blocks[i];
//             var x = block[0] + offset[0];
//             var y = block[1] + offset[1];
//
//             var block = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
//             block.dataset.state = "1";
//         }
//
//         occupiedblocks = occupiedblocks.concat(currentShape.indexes);
//         createShape();
//         checkRows();
//     }
//
//     return collision;
// }
//
// function createShape()
// {
//     var randomShape = Math.floor(Math.random() * shapes.length);
//     var randomColor = Math.floor(Math.random() * colors.length);
//     var center = Math.floor(width / 2);
//     var shape = shapes[randomShape];
//     var location = [center, 0];
//
//     currentShape = {
//         shape: shape,
//         color: colors[randomColor],
//         location: location,
//         indexes: getBlockNumbers(shape, location)
//     };
// }
//
// function checkRows()
// {
//     var counter = 0;
//     var start = 0;
//     // check all rows for complete lines
//     // after collision
//     for (var y = 0; y < height; y++)
//     {
//         var filled = true;
//         for(var x = 0; x < width; x++)
//         {
//             var blk = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
//             if (blk.dataset.state == "0")
//             {
//                 filled=false;
//                 break;
//             }
//         }
//
//         if (filled)
//         {
//             // determines where to start shifting down
//             if (start == 0)
//                 start = y;
//
//             counter++;
//
//             // clear out line
//             for(var i = 0; i < width;i++)
//             {
//                 var blk = document.querySelector('[data-x="' + i + '"][data-y="' + y + '"]');
//                 blk.dataset.state = "0";
//                 blk.style.backgroundColor = "white";
//                 removeIndex(blk.dataset.index);
//             }
//         }
//     }
//
//     if (counter > 0)
//     {
//         points += counter * 100;
//         shiftDown(counter, start);
//         document.getElementById("points").innerHTML = points;
//     }
// }
//
//
//
// // shift down all occupied blocks from top to down
// // update all 'y' coordinates + 1, ending with row we're removing
// function shiftDown(counter, start)
// {
//     for (var i = start-1; i >= 0; i--)
//     {
//         for(var x = 0; x < width; x++)
//         {
//             var y = i + counter;
//             var blk = document.querySelector('[data-x="' + x + '"][data-y="' + i + '"]');
//             var nextblock = document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
//
//             if (blk.dataset.state == "1")
//             {
//                 nextblock.style.backgroundColor = blk.style.backgroundColor;
//                 nextblock.dataset.state = "1";
//                 blk.style.backgroundColor ="white";
//                 blk.dataset.state = "0";
//                 removeIndex(blk.dataset.index);
//                 occupiedblocks.push(nextblock.dataset.index);
//             }
//         }
//     }
// }
//
// // roates current shape
// function rotate()
// {
//     var newShape = new Array();
//     var shape = currentShape.shape;
//
//     for(var i = 0; i < shape.length; i++)
//     {
//         var x = shape[i][0];
//         var y = shape[i][1];
//         var newx = (getWidth() - y);
//         var newy = x;
//         newShape.push([newx, newy]);
//     }
//
//     clearCurrent();
//     currentShape.shape = newShape;
//     currentShape.indexes = getBlockNumbers(newShape, currentShape.location);
// }
//
// function getHeight()
// {
//     var y = 0;
//     // returns the height of current shape
//     // max y found
//     for(var i = 0; i < currentShape.shape.length; i++)
//     {
//         var block = currentShape.shape[i];
//         if (block[1] > y)
//             y = block[1];
//     }
//
//     return y;
// }
//
// function getWidth()
// {
//     var width = 0;
//
//      for(var i = 0; i < currentShape.shape.length; i++)
//     {
//         var block = currentShape.shape[i];
//         if (block[0] > width)
//             width = block[0];
//     }
//
//     return width;
// }

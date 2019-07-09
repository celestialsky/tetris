const tetromino = []
let currentTetromino;
const height = 16
const width = 10
const gameState = 0 //play pause game over
const color = ["blue", "red", "orange", "yellow", "green"]
const move = 0
const filledSpace = []
const direction = ""
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
}

makePlayField()

const tetrominoShape = () => {
    let t = [[1, 0], [0,1], [1,1],[2,1]] // T
    let i = [[0, 0], [0, 1], [0, 2], [0, 3]] // line
    let o = [[0, 0], [0, 1], [1, 0], [1, 1]] // square
    let l = [[2,0], [0, 1], [1, 1], [2,1]] // L
    let s = [[0,0], [1,0], [1,1], [2,1]] // S
    let j = [[2,1], [1,1], [1,0], [0,0]] // J
    tetromino.push(t);
    tetromino.push(i);
    tetromino.push(o);
    tetromino.push(l);
    tetromino.push(s);
    tetromino.push(j);
}

const createTetromino = () => {
  let randTetro = Math.floor(Math.random() * tetromino.length)
  let randColor = Math.floor(Math.random() * color.length)
  const center = Math.floor(width / 2)
  let tetromino = tetromino[randTetro]
  const location = [center, 0]

  currentTetromino = {
    tetromino: tetromino,
    color: color[randColor],
    location: location,
    index: blockCoordinates(tetromino, location) // used for collision detection
  }
}

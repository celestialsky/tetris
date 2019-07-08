const playfield = []
//const tetromino;
const height = 16
const width = 10
const gameState = 0 //play pause game over
const color = ["blue", "red", "orange", "yellow", "green"]
const move = 0
const filledSpace = []
const direction = ""
const score = 0

function makePlayField() {
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

// ===================== CONSTANTES ===================== //
const STATUS_DISPLAY = document.querySelector('.game-notification'),

// Para saber si el jugador ha puesto un simbolo una posicion
GAME_STATE = ['', '', '', '', '', '', '', '', ''],

// Posibilidades de victoria del juego
WINNINGS = [ 
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
  ],

//Son funciones por que la variable cambiara dependiendo de quien gane el juego o que turno sea
WIN_MESSAGE = () => `El jugador ${currentPlayer} ha ganado!`, 
DRAW_MESSAGE = () => `El juego ha terminado en empate!`,
CURRENT_PLAYER_TURN = () => `Turno del jugador ${currentPlayer}`

// ===================== VARIABLES ===================== //

let gameActive = true,
currentPlayer = 'X'


// ===================== FUNCIONES ===================== //

function main() {
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  listeners()
}

function listeners() { 
  document.querySelector('.game-container').addEventListener('click', handleCellClick)
  document.querySelector('.game-reset').addEventListener('click', handleResetGame)
}

function handleStatusDisplay (message) {
  STATUS_DISPLAY.innerHTML = message
}


function handleResetGame () {
  gameActive = true
  currentPlayerSimbol = 'X'
  resetGame()
  handleStatusDisplay(CURRENT_PLAYER_TURN())
  document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = '')
}


function handleCellClick(clickedCellEvent) { // Checa que la posicion de la casilla y si tiene contenido
  const clickedCell = clickedCellEvent.target
  if (clickedCell.classList.contains('game-cell')) {
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
    if (GAME_STATE[clickedCellIndex] !=='' || !gameActive) {
      return
    }
    handleCellPlayed(clickedCell, clickedCellIndex)
    handleResultValidation()
  }
}

function resetGame() { // Reinicia el juego 
  let i = GAME_STATE.length
  while(i--) {
    GAME_STATE[i] = ''
  }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  GAME_STATE[clickedCellIndex] = currentPlayer // Agrega en la posici??n correspondiente el valor ya sea "X" u "O" en el estado actual del juego
  clickedCell.innerText = currentPlayer // Agrega en el HTML el valor del jugador
}

function handleResultValidation() {
  let roundWon = false
  for (let i = 0; i < WINNINGS.length; i++) { // Itera cada uno de las posibles combinaciones ganadores
    const winCondition = WINNINGS[i] // Guarda la combinaci??n por ejemplo: [0, 1, 2]
    let position1 = GAME_STATE[winCondition[0]],
    position2 = GAME_STATE[winCondition[1]],
    position3 = GAME_STATE[winCondition[2]] // Almacena el valor del estado actual del juego seg??n las posiciones de winCondition
    if (position1 === '' || position2 === '' || position3 === '') {
      continue // Si hay alg??n valor vacio nadie ha ganado a??n
    }
    if ( position1 === position2 && position2 === position3) {
      roundWon = true // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
      break
    }
  }
  if (roundWon) {
    handleStatusDisplay(WIN_MESSAGE())
    gameActive = false
    return
  }

  let roundDraw = !GAME_STATE.includes('') // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate

  if(roundDraw) {
    handleStatusDisplay(DRAW_MESSAGE())
    gameActive = false
    return
  }

  HandlePlayerChange()
}

function HandlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X' //Cambia el jugador dependiendo de quien realizo el ultimo movimiento
  handleStatusDisplay(CURRENT_PLAYER_TURN())
}

main()
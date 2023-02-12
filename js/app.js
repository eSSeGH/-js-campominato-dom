console.log("Campo Minato")

// DECLARING OUTSIDE SCOPES VARs
const btnPlay = document.getElementById("btn-play")

const gridEl = document.querySelector(".grid")

let bombArray = []
let warningArray = []
let edgedNorthCells = []
let edgedEastCells = []
let edgedSouthCells = []
let edgedWestCells = []

let scoreEl = document.querySelector(".score")
let score = 0
let highScoreEl = document.querySelector(".high-score")
let highScore = 0

btnPlay.addEventListener("click", startGame)

const winCard = document.querySelector(".you-won")
const winCardScore = document.getElementById("score")
const winCardLevel = document.getElementById("level")


// FUNCTIONS

// START GAME FUNCTION
function startGame() {

    // INVOKING RESET GAME FUNC
    resetGame()

    let sideGrid = parseInt(document.getElementById("level-form").value)
    let exclamationPoint = "!"

    // CORRECT LEVEL INPUT CONTROL
    while (isNaN(sideGrid) || sideGrid > 20 || sideGrid < 10) {
        sideGrid = prompt(`Inserisci un numero compreso tra 10 e 20 ${exclamationPoint} `)
        exclamationPoint += "!!!"

        if (exclamationPoint === "!!!!!!!!!!") {
            alert("Ma sei scemo o mangi i sassi?")
        }
        if (exclamationPoint === "!!!!!!!!!!!!!!!!") {
            alert("Ti diverti? Vabbè, io tempo da perdere ne ho quanto ne vuoi...")
        }
    }

    // GRID WINDOW DIMENSIONS SET 
    setWindowGridWidth(sideGrid)

    // DECLARING CONTROLLER VAR
    const controller = new AbortController

    // CREATE GRID FUNCTION
    function createGrid(sideOfGrid) {

        let cellNum = sideOfGrid**2

        for (i=0; i < cellNum; i++) {

            num = i + 1

            const cellEl = document.createElement("div")

            cellEl.className = "cell"
            cellEl.classList.add(`cell${num}`)
            cellEl.style.width = `calc(100%/ ${sideOfGrid})`
            cellEl.style.height = `calc(100%/ ${sideOfGrid})`
            cellEl.style.color = "black"
            cellEl.innerHTML = num

            gridEl.append(cellEl)

            cellEl.addEventListener("click", onClick, {signal: controller.signal})
        }
    }

    // INVOKING CREATE GRID FUNC
    createGrid(sideGrid)

    let bombNum = parseInt(sideGrid)

    // INVOKING BOMB GEN FUNC
    bombGen(bombNum)
    console.log("le bombe sono:", bombArray)
    // Lascio il seguente console.log per facilitare i test 

    // WARNINGS GEN FUNC
    function surroundWarningGen(bombArray) {

        // PUSHING CELLS INTO EDGED CELLS ARRAYS
        for (i = 0; i < sideGrid; i++) {
            edgedCell = i + 1
            edgedNorthCells.push(edgedCell)
        }       
        for (i = 0; i < sideGrid; i++) {
            edgedCell = (i + 1)*sideGrid
            edgedEastCells.push(edgedCell)
        }
        for (i = 0; i < sideGrid; i++) {
            edgedCell = ((sideGrid**2) - sideGrid) + (i + 1)
            edgedSouthCells.push(edgedCell)
        }
        for (i = 0; i < sideGrid; i++) {
            edgedCell = i*sideGrid + 1
            edgedWestCells.push(edgedCell)
        }

        // GENERATING WARNING CELLS NUMBER
        for (i = 0; i < bombArray.length; i++) {

            let cellNorth = parseInt(bombArray[i] - sideGrid )
            let cellNorthEast = parseInt(bombArray[i] - (sideGrid - 1) )
            let cellEast = parseInt(bombArray[i] + 1 )
            let cellSouthEast = parseInt(bombArray[i] + (sideGrid + 1) )
            let cellSouth = parseInt(bombArray[i] + sideGrid )
            let cellSouthWest = parseInt(bombArray[i] + (sideGrid - 1) )
            let cellWest = parseInt(bombArray[i] - 1 )
            let cellNorthWest = parseInt(bombArray[i] - (sideGrid + 1) )

            // CHECK IF WARNING GENERATED CELL IS out of EDGES

            if (edgedNorthCells.includes(bombArray[i]) === false) {
                warningArray.push(cellNorth)
            }
            if (edgedNorthCells.includes(bombArray[i]) === false &&
                edgedEastCells.includes(bombArray[i]) === false) {
                warningArray.push(cellNorthEast)
            }
            if (edgedEastCells.includes(bombArray[i]) === false) {
                warningArray.push(cellEast)
            }
            if (edgedSouthCells.includes(bombArray[i]) === false &&
                edgedEastCells.includes(bombArray[i]) === false) {
                warningArray.push(cellSouthEast)
            }
            if (edgedSouthCells.includes(bombArray[i]) === false) {
                warningArray.push(cellSouth)
            }           
            if (edgedSouthCells.includes(bombArray[i]) === false &&
                edgedWestCells.includes(bombArray[i]) === false) {
                warningArray.push(cellSouthWest)
            }       
            if (edgedWestCells.includes(bombArray[i]) === false) {
                warningArray.push(cellWest)
            }           
            if (edgedNorthCells.includes(bombArray[i]) === false &&
                edgedWestCells.includes(bombArray[i]) === false) {
                warningArray.push(cellNorthWest)
            }      
        }
    }

    surroundWarningGen(bombArray)

    btnPlay.innerHTML = "RESTART"

    // ON CLICK FUNCTION
    function onClick() {

        const clickedCell = this

        num = parseInt(clickedCell.innerHTML)

        if (bombArray.includes(num)) {
            clickedCell.style.backgroundColor = "red"
            clickedCell.innerHTML = "<i class='fa-solid fa-bomb'></i>"
            scoreEl.style.backgroundColor = "red"
            scoreEl.innerHTML = `YOU LOSE: SCORE(${score})`

            if (score > highScore) {
                highScore = parseInt(score)
                highScoreEl.innerHTML = `HS: ${highScore}`
            }
            controller.abort()

        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 1) {

            clickedCell.style.color = "yellow"
            clickedCell.innerHTML = "1"
            addScore()
        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 2) {

            clickedCell.style.color = "orangered"
            clickedCell.innerHTML = "2"
            addScore()
        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 3) {

            clickedCell.style.color = "red"
            clickedCell.innerHTML = "3"
            addScore()
        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 4) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "4"
            addScore()
        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 5) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "5"
            addScore()
        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 6) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "6"
            addScore()
        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 7) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "7"
            addScore()
        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 8) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "8"
            addScore()
        } else {
            clickedCell.style.backgroundColor = "lightblue"
            clickedCell.style.color = "lightblue"
            addScore()
        }

        let winScore = sideGrid**2 - sideGrid

        if (score === winScore) {
            win()
        }

        clickedCell.removeEventListener("click", onClick)
    }
}

// BOMB GEN FUNCTION
function bombGen(bombNum) {

    while (bombArray.length < bombNum) {

        let range = bombNum**2
        let bomb = randMinMax(1, range)

        if (bombArray.includes(bomb)){
            continue
        } else {
            bombArray.push(bomb)
        }
    }
}

// RANDOM MIN MAX NUMBER FUNCTION
function randMinMax(min, max) {

    variable = Math.floor(Math.random() * (max - min + 1)) + min

    return variable
}

function addScore() {
    score += 1
    scoreEl.innerHTML = score
}


// RESET GAME FUNCTION
function resetGame() {
    scoreEl.style.backgroundColor = "chartreuse"
    score = 0
    scoreEl.innerHTML = "SCORE"
    gridEl.innerHTML = ""
    bombArray = []
    warningArray = []
    edgedNorthCells = []
    edgedEastCells = []
    edgedSouthCells = []
    edgedWestCells = []
    winCard.style.display= "none"
    winCardScore.innerHTML += ""
}

// COUNT IN ARRAY FUNCTION
function countInArray(array, object) {

    let count = 0;

    for (var i = 0; i < array.length; i++) {

        if (array[i] === object) {
            count++;
        }
    }
    return count;
}

// WINNING FUNCTION

function win() {
    winCard.style.display= "block"
    winCardScore.innerHTML += `Il tuo punteggio: ${score}`
}

// WINDOW GRID WIDTH SET
function setWindowGridWidth(sideGrid) {

    if (sideGrid === 10) {
        gridEl.style.maxWidth = "600px"
    } else if (sideGrid === 11)  {
        gridEl.style.maxWidth = "660px"
    } else if (sideGrid === 12) {
        gridEl.style.maxWidth = "720px"
    } else if (sideGrid === 13)  {
        gridEl.style.maxWidth = "780px"
    } else if (sideGrid === 14) {
        gridEl.style.maxWidth = "840px"
    } else if (sideGrid === 15) {
        gridEl.style.maxWidth = "900px"
    } else if (sideGrid === 16) {
        gridEl.style.maxWidth = "970px"
    } else if (sideGrid === 17) {
        gridEl.style.maxWidth = "1070px"
    } else if (sideGrid === 18) {
        gridEl.style.maxWidth = "1180px"
    } else if (sideGrid === 19) {
        gridEl.style.maxWidth = "1300px"
    } else {
        gridEl.style.maxWidth = "1430px"
    }
}

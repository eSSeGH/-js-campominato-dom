console.log("Campo Minato")

// DECLARING OUTSIDE SCOPES VARs
const btnPlay = document.getElementById("btn-play")

const gridEl = document.querySelector(".grid")

let bombArray = []

let scoreEl = document.querySelector(".score")
let score = 0
let highScoreEl = document.querySelector(".high-score")
let highScore = 0

btnPlay.addEventListener("click", startGame)

// FUNCTIONS

// START GAME FUNCTION
function startGame() {

    // INVOKING RESET GAME FUNC
    resetGame()

    let sideGrid = document.getElementById("level-form").value
    let exclamationPoint = "!"

    // CORRECT LEVEL INPUT CONTROL
    while (isNaN(sideGrid) || sideGrid > 30 || sideGrid < 10) {
        sideGrid = prompt(`Inserisci un numero compreso tra 10 e 30 ${exclamationPoint} `)
        exclamationPoint += "!!!"

        if (exclamationPoint === "!!!!!!!!!!") {
            alert("Ma sei scemo o mangi i sassi?")
        }
        if (exclamationPoint === "!!!!!!!!!!!!!!!!") {
            alert("Ti diverti? Vabbè, io tempo da perdere ne ho quanto ne vuoi...")
        }
    }

    // DECLARING CONTROLLER VAR
    const controller = new AbortController

    // CREATE GRID FUNCTION
    function createGrid(sideOfGrid) {

        let cellNum = sideOfGrid**2

        for (i=0; i < cellNum; i++) {

            num = i + 1

            const cellEl = document.createElement("div")

            cellEl.className = "cell"
            cellEl.style.width = `calc(100%/ ${sideOfGrid})`
            cellEl.style.height = `calc(100%/ ${sideOfGrid})`
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

        } else {
            clickedCell.style.backgroundColor = "lightblue"
            score += 1
            scoreEl.innerHTML = score
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


// RESET GAME FUNCTION
function resetGame() {
    scoreEl.style.backgroundColor = "chartreuse"
    score = 0
    scoreEl.innerHTML = "SCORE"
    gridEl.innerHTML = ""
}
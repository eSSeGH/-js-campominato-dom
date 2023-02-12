console.log("Campo Minato")

// DECLARING OUTSIDE SCOPES VARs
const btnPlay = document.getElementById("btn-play")

const gridEl = document.querySelector(".grid")

let bombArray = []
let warningArray = []

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

    // WARNINGS GEN FUNC
    function surroundWarningGen(bombArray) {

        console.log("surroundwarningGen")

        for (i = 0; i < bombArray.length; i++) {
            console.log(`surroundwarningGen cicle nr ${i}` )

            let cellNorth = parseInt(bombArray[i] - sideGrid )
            let cellNorthEast = parseInt(bombArray[i] - (sideGrid - 1) )
            let cellEast = parseInt(bombArray[i] + 1 )
            let cellSouthEast = parseInt(bombArray[i] + (sideGrid + 1) )
            let cellSouth = parseInt(bombArray[i] + sideGrid )
            let cellSouthWest = parseInt(bombArray[i] + (sideGrid - 1) )
            let cellWest = parseInt(bombArray[i] - 1 )
            let cellNorthWest = parseInt(bombArray[i] - (sideGrid + 1) )

            console.log(cellNorth)
            
            warningArray.push(cellNorth)
            warningArray.push(cellNorthEast)
            warningArray.push(cellEast)
            warningArray.push(cellSouthEast)
            warningArray.push(cellSouth)
            warningArray.push(cellSouthWest)
            warningArray.push(cellWest)
            warningArray.push(cellNorthWest)

            console.log(warningArray)          
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

        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 2) {

            clickedCell.style.color = "orangered"
            clickedCell.innerHTML = "2"

        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 3) {

            clickedCell.style.color = "red"
            clickedCell.innerHTML = "3"

        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 4) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "4"

        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 5) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "5"

        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 6) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "6"

        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 7) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "7"

        } else if (warningArray.includes(num) && countInArray(warningArray, num) === 8) {

            clickedCell.style.color = "purple"
            clickedCell.innerHTML = "8"

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
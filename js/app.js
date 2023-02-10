console.log("Campo Minato")

const btnPlay = document.getElementById("btn-play")

const gridEl = document.querySelector(".grid")

btnPlay.addEventListener("click", startGame)



// FUNZIONI

// crea un array da 1 a sidegrid, con numeri random, non doppi

function bombGen(bombNum) {
    console.log("bombGenFunc toggled")

    let numArray = []
    console.log("numArray è stato creato")

    while (numArray.length < bombNum) {

        console.log("ciclo while partito")

        let range = bombNum**2
        let num = randMinMax(1, range)
        console.log("il numero ciclato è", num)
        console.log("l'array di numeri è", numArray)

        if (numArray.includes(num)){
            continue
        } else {
            numArray.push(num)
            console.log("l'array di numeri è stato incrementato", numArray)
        } 
    }
}

function randMinMax(min, max) {

    variable = Math.floor(Math.random() * (max - min + 1)) + min

    return variable
}


// RESET GAME FUNCTION
function resetGame() {
    // azzerare il punteggio
    // svuotare la griglia
    gridEl.innerHTML = ""
    // eliminare eventuali messaggi di game over
}

// START GAME FUNCTION
function startGame() {
    console.log("click play")

    resetGame()

    let sideGrid = document.getElementById("level-form").value
    let exclamationPoint = "!"

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

    createGrid(sideGrid)

    let bombNum = parseInt(sideGrid)

    console.log("la variabile di bombGen:", bombNum)
    bombGen(bombNum)

    btnPlay.innerHTML = "RESTART"
}

// CREATE GRID FUNCTION
function createGrid(sideOfGrid) {

    let cellNum = sideOfGrid**2

    for (i=0; i < cellNum; i++) {

        num = i + 1

        const cellEl = document.createElement("div")
        console.dir

        cellEl.className = "cell"
        cellEl.style.width = `calc(100%/ ${sideOfGrid})`
        cellEl.style.height = `calc(100%/ ${sideOfGrid})`
        cellEl.innerHTML = num

        gridEl.append(cellEl)

        cellEl.addEventListener("click", onClick)
    }
}

// CLICK CELL FUNCTION
function onClick() {

    const clickedCell = this

    num = clickedCell.innerHTML
    console.log(num)

    clickedCell.style.backgroundColor = "lightblue"

    clickedCell.removeEventListener("click", onClick)
}






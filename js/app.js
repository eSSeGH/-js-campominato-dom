console.log("Campo Minato")

const btnPlay = document.getElementById("btn-play")

const gridEl = document.querySelector(".grid")

btnPlay.addEventListener("click", startGame)





// FUNZIONI


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

    btnPlay.innerHTML = "RESTART"
}

// CREATE GRID FUNCTION
function createGrid(sideOfGrid) {

    let cellNum = sideOfGrid**2

    for (i=0; i < cellNum; i++) {

        let num = i + 1
        console.log(i + 1)

        const cellEl = document.createElement("div")
        console.dir

        cellEl.className = "cell"
        cellEl.style.width = `calc(100%/ ${sideOfGrid})`
        cellEl.style.height = `calc(100%/ ${sideOfGrid})`
        cellEl.innerHTML = num

        gridEl.append(cellEl)

        cellEl.addEventListener("click", onClick)
        console.log(`click ${num}`)
    }
}

// CLICK CELL FUNCTION
function onClick() {

    const clickedCell = this

    clickedCell.style.backgroundColor = "rgb(255, 140, 0)"

    clickedCell.removeEventListener("click", onClick)
}






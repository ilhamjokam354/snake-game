let canvas, context, gameLoop
//grid size
let gridSize = 20
let tileSize = 20
let nextX = 0
let nextY = 0
//ular
let defaultTileSize = 1
let tallSize = defaultTileSize
let snakeTrail = []
let snakeY = 10
let snakeX = 10
//apel
let apelY = 5
let apelX = 5
//soundeffect
let eatSoundEffect = document.getElementById("soundEffectEat")
let gameOverSoundEffect = document.getElementById("soundEffectGameOver")
let alertGameOver = document.querySelector(".alert-game-over")
let poinGameOver = document.getElementById("poin-game-over")
window.onload = function()
{
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")
    gameLoop = setInterval(gerak, 200)
}

function gerak()
{
    snakeX += nextX
    snakeY += nextY
    //tembus arena
    if(snakeX < 0)
    {
        
        snakeX = gridSize - 1

    }else if(snakeX > gridSize - 1)
    {
        snakeX = 0
    }else if(snakeY < 0)
    {
        snakeY = gridSize - 1

    }else if(snakeY > gridSize - 1)
    {
        snakeY = 0
    }
    background()
    ular()
    apel()
    poin()
    
}

function apel()
{
    context.fillStyle = "red"
    //context.font("10px Arial" )
    context.fillRect(apelX * gridSize, apelY * gridSize, gridSize, gridSize)
}
function poin()
{
    context.fillStyle = "white"
    context.font = "20px Verdana"
    context.fillText(`Poin Anda : ${tallSize - 1}`, 10, 20)
    localStorage.setItem("poin", `${tallSize - 1}`)
}
function ular()
{
    if(snakeX == apelX && snakeY == apelY)
    {
        eatSoundEffect.play()
        tallSize++
        apelY = Math.floor(Math.random() * gridSize)
        apelX = Math.floor(Math.random() * gridSize)
    }
    context.fillStyle = "green"
    for(let i = 0; i < snakeTrail.length; i++){
        // console.log(snakeTrail[i])
        context.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        )

        if(snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY)
        {
            if(tallSize > 1)
            {
                // alert("Game Over")
                gameOverSoundEffect.play()
                tallSize = defaultTileSize
                alertGameOver.style.display = "block"
                canvas.style.display = "none"
                poinGameOver.innerText = localStorage.getItem("poin")
            }
        }
    }
    snakeTrail.push({x : snakeX, y: snakeY})
    while(snakeTrail.length > tallSize){
        snakeTrail.shift()
    }

}

function background()
{
    context.fillStyle = "black"
    context.fillRect(0,0, canvas.width, canvas.height)
}

document.addEventListener("keydown", function (e) {
    // console.log(e.key);
    if (e.key == "ArrowUp") {
        
        if(nextY != 1)
        {
            nextY = -1
            nextX = 0
        }

    } else if (e.key == "ArrowDown") {
        if(nextY != -1)
        {
            nextY = 1
            nextX = 0

        }
    } else if (e.key == "ArrowLeft") {
        if(nextX != 1)
        {
            nextY = 0
            nextX = -1

        }
    } else if (e.key == "ArrowRight") {
        if(nextX != -1)
        {
            nextY = 0
            nextX = 1

        }
    }
});

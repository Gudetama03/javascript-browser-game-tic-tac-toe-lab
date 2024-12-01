const tiles = document.querySelectorAll(".sqr")
const msg = document.getElementById("message")
const gamemodeButtons = document.querySelectorAll(".gamemodeButton")

console.log(tiles)
msg.textContent="Player 1 turn"


let turn = 0
let gameEnded = false
let gamemode 
const xArray = []
const oArray = []
const usedTiles = []
const unusedTiles=[]
const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

console.log(winCombo)
console.log(gamemode)

const play= (event)=>{
    if(turn==0 || turn%2==0 && !(oArray.includes(Number(event.target.id))) && !(xArray.includes(Number(event.target.id))) && !gameEnded){
        event.target.textContent="X"
        console.log(event.target)
        turn+=1
        console.log(turn)
        xArray.push(Number(event.target.id))
        usedTiles.push(Number(event.target.id))
        console.log(xArray)
        msg.textContent="Player 2 turn"
        winCheck()
        if(gamemode=="bots"){
            setTimeout(botMove,500)
            winCheck()
        }

}

    else if(turn % 2 !== 0 && !(xArray.includes(Number(event.target.id)))&& !(oArray.includes(Number(event.target.id))) && !gameEnded && gamemode == "players"){
        event.target.textContent="O"
        console.log(event.target)
        turn+=1
        console.log(turn)
        oArray.push(Number(event.target.id))
        usedTiles.push(Number(event.target.id))
        console.log(oArray)
        msg.textContent="Player 1 turn"
        winCheck()
    }
}



const winCheck = ()=>{
    winCombo.forEach((combo)=>{
        let winner
        if(combo.every(tileId=>xArray.includes(tileId))){
            msg.textContent="Player 1 Wins"
            winner="Player 1"
            gameEnded = true
            console.log(winner)
        }

        else if(combo.every(tileId=>oArray.includes(tileId))){
            msg.textContent="Player 2 Wins"
            winner= "Player 2"
            gameEnded = true
            console.log(winner)
        }

        else if(oArray.length+xArray.length===9 && winner===undefined){
            msg.textContent="It's a tie"
        }
        


    })
}



// Will implment later
const botMove = () => {
    if(turn % 2 !== 0 && !gameEnded) {
        unusedTiles.length = 0;
        for(let i = 0; i < 9; i++) {
            if(!usedTiles.includes(i)) {
                unusedTiles.push(i);
            }
        }
        if(unusedTiles.length > 0) {
            const randomIndex = Math.floor(Math.random() * unusedTiles.length);
            const tileId = unusedTiles[randomIndex];

            // Get the actual tile element
            const randomTile = tiles[tileId];

            // Make the move
            randomTile.textContent = "O";
            turn += 1;
            oArray.push(tileId);
            usedTiles.push(tileId);
            msg.textContent = "Player 1 turn";

            // Check for win condition after bot move
            winCheck();
        }
    }
}

const gamemodeSelector = () => {
    document.getElementById("gamemodeText").textContent = `Gamemode: ${event.target.textContent}`
    gamemode = event.target.id
    console.log(gamemode)

}


tiles.forEach((tile)=>{
    tile.addEventListener("click",play)
})

gamemodeButtons.forEach(button => {
    button.addEventListener("click",gamemodeSelector)
});


    

console.log(tiles[0])
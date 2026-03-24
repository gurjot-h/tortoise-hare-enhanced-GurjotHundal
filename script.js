//render the track
//start the race with a button click
//trigger the move every second (setInterval())
//move the tortoise randomly (Math.random())
//move the hare randomly
//fic position if they go beyond the range (0 - 70)
//render the track with the new positions
//when one of the animals reach 70+, show result message


const Track_Length = 70 //sometimes constant variables are all CAPS

const startBtn = document.getElementById('startBtn')
const messageEl = document.getElementById('message')
const trackEl = document.getElementById('track')

const tortoiseWinsEl = document.getElementById('tortoiseWins')
const hareWinsEl = document.getElementById('hareWins')

let tortoisePosition = 1
let harePosition = 1
let raceIntervalId = null
let stepCount = 0

//adding tortoise and hare wins
let tortoiseWins = 0
let hareWins = 0


startBtn.addEventListener("click", StartRace)

function StartRace(){

    tortoisePosition = 1
    harePosition = 1

    messageEl.textContent = "BANG!!!! AND THEY'RE OFF!!"

    startBtn.disabled = true

    //this avoids double tracks
    if (raceIntervalId !== null){
        clearInterval(raceIntervalId)
    }

    raceIntervalId = setInterval(raceStep, 1000)


}

function raceStep(){
    stepCount++
//move the tortoise randomly (Math.random())
moveTortoise()
//move the hare randomly
moveHare()
//fic position if they go below the range (0 - 70)
clampPositions()
//when one of the animals reach 70+, show result message

if (tortoisePosition >= Track_Length || harePosition >= Track_Length){
    clearInterval(raceIntervalId)
    raceIntervalId = null
    showResult()
    startBtn.disabled = false
} 

//render the track with the new positions
 renderTrack()


}

function moveTortoise() {
    let roll = Math.floor(Math.random() * 10) + 1

    if(roll >= 1 && roll <=5){
        //1-5 fast plod
    tortoisePosition += 6
    } else if (roll >= 6 && roll <= 7){
        //6-7 slip
        tortoisePosition -= 2
    } else{
        //8-10 slow plod
        tortoisePosition += 3
    }
}


function moveHare() {
    let roll = Math.floor(Math.random() * 10) + 1

    if(roll >= 2 && roll <=5){
        harePosition +=6
    } else if (roll >= 5 && roll <= 6){
        harePosition += 2
    } else if (roll >= 7 && roll <= 8){
        harePosition -= 2
    } else {
        harePosition = 0
    }
}


function clampPositions(){

    tortoisePosition = Math.min(70, Math.max(1, tortoisePosition))
    harePosition = Math.min(Track_Length, Math.max (1, harePosition))

}


function renderTrack(){
    trackEl.innerHTML = ''

    for (let i = 1; i <= Track_Length; i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')

        let isTortoiseHere = tortoisePosition === i
        let isHareHere = harePosition === i

        if (isTortoiseHere && isHareHere){
            cell.classList.add('both')
            cell.textContent = '🔥'
        } else if (isTortoiseHere) {
            cell.classList.add('tortoise')
            cell.textContent = '🐢'
        }else if (isHareHere) {
            cell.classList.add('hare')
            cell.textContent = '🐇'
        }

         trackEl.appendChild(cell);
    }
}


function renderScore() {
    tortoiseWinsEl.textContent = tortoiseWins
    hareWinsEl.textContent = hareWins
}

function showResult(){

    if (tortoisePosition >= Track_Length && harePosition >= Track_Length){
        messageEl.textContent = "It's a tie!!"

    } else if (tortoisePosition >= Track_Length){
        tortoiseWins++
        messageEl.textContent = 'TORTOISE WINS!!!!'

    } else if (harePosition >= Track_Length){
        hareWins++
        messageEl.textContent = 'Hare wins, booooo'

    } else {
        messageEl.textContent = 'try racing again'
    }

    renderScore()
}

renderTrack()
renderScore()
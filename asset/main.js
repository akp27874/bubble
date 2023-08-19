var timer=60;
var count = 0;
var hitNum;
var totalBubbles = 108;
function makeBubble() {
    var clutter = "";
    for (let i = 1; i <= totalBubbles; i++) {
        var rn = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${rn}</div>`;
    }
    document.getElementById("content").innerHTML = clutter;
}


function runTimer(){
  var Timer =   setInterval(function(){
    if(timer>0){
        timer--;
        document.querySelector("#timer").textContent = timer;
    }else{
        clearInterval(Timer);
        reset();
        document.querySelector("#content").innerHTML = `<span class="game-over">Game Over!</span>`;
    }
    },1000);
}

function createHit(){
    hitNum = Math.floor(Math.random()*10);
    document.querySelector("#hit").textContent = hitNum;
}

function calculateScore(){
    count += 10;
    document.querySelector("#score").textContent = count;
}

document.querySelector("#content").addEventListener('click',function(details){
    var selectedBubble = Number(details.target.textContent);
    if(hitNum === selectedBubble){
        calculateScore();
        makeBubble();
        createHit();
    }

    if(details.target.textContent === 'Start'){
        start();
    }
})

function reset(){
    document.querySelector("#hit").textContent = 0;
    document.querySelector("#timer").textContent = 0;
}

function start(){
    runTimer();
    makeBubble();
    createHit(); 
}



// Create a media condition that targets viewports upto 600px wide
const mediaQuery = window.matchMedia('(max-width: 600px)')
// Check if the media query is true
if (mediaQuery.matches) {
  // Then trigger an alert
  totalBubbles = 45;
}



function init(){
    document.querySelector("#content").innerHTML = `<span class="start">Start</span>`;
}

init();

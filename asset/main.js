var timer=60;
var count = 0;
var hitNum;
var gameRunning = false;

function getLaneCount() {
    const content = document.getElementById("content");
    const styles = getComputedStyle(content);
    const innerWidth = content.clientWidth
        - parseFloat(styles.paddingLeft)
        - parseFloat(styles.paddingRight);
    const bubbleSize = window.matchMedia("(max-width: 600px)").matches ? 40 : 50;
    return Math.max(1, Math.floor(innerWidth / (bubbleSize + 12)));
}

function createBubble(laneIndex, laneCount) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = Math.floor(Math.random() * 10);
    bubble.dataset.lane = laneIndex;
    bubble.dataset.laneCount = laneCount;
    bubble.style.setProperty("--float-duration", (16 + Math.random() * 8).toFixed(2) + "s");
    bubble.style.setProperty("--float-delay", (Math.random() * 3).toFixed(2) + "s");
    bubble.style.setProperty("--float-left", ((laneIndex + 0.5) / laneCount * 100).toFixed(2) + "%");
    bubble.style.setProperty("--float-drift", (Math.random() * 8 - 4).toFixed(2) + "px");
    return bubble;
}

function makeBubble() {
    const content = document.getElementById("content");
    content.replaceChildren();
    const laneCount = getLaneCount();
    for (let lane = 0; lane < laneCount; lane++) {
        content.appendChild(createBubble(lane, laneCount));
    }
}

window.addEventListener("resize", function() {
    if (gameRunning) {
        makeBubble();
    }
});


function runTimer(){
  var Timer =   setInterval(function(){
    if(timer>0){
        timer--;
        document.querySelector("#timer").textContent = timer;
    }else{
        clearInterval(Timer);
        gameRunning = false;
        reset();
        document.querySelector("#content").innerHTML = `<span class="game-over">Game Over!</span>`;
    }
    },1000);
}

function createHit(){
    const bubbles = document.querySelectorAll("#content .bubble");
    if (bubbles.length > 0) {
        hitNum = Number(bubbles[Math.floor(Math.random() * bubbles.length)].textContent);
    } else {
        hitNum = Math.floor(Math.random() * 10);
    }
    document.querySelector("#hit").textContent = hitNum;
}

function replaceBubble(bubble) {
    const laneIndex = Number(bubble.dataset.lane);
    const laneCount = Number(bubble.dataset.laneCount);
    bubble.remove();

    if (!gameRunning) {
        return;
    }

    const replacement = createBubble(laneIndex, laneCount);
    const remainingBubbles = document.querySelectorAll("#content .bubble");
    const hitIsPresent = Array.from(remainingBubbles).some(
        currentBubble => Number(currentBubble.textContent) === hitNum
    );
    if (!hitIsPresent) {
        replacement.textContent = hitNum;
    }
    document.querySelector("#content").appendChild(replacement);
}

function calculateScore(){
    count += 10;
    document.querySelector("#score").textContent = count;
}

document.querySelector("#content").addEventListener('click',function(details){
    // Ensure the clicked element is a bubble
    if(details.target.classList.contains("bubble")){
    var selectedBubble = Number(details.target.textContent);
    try{
    if(hitNum === selectedBubble){
        calculateScore();
        // Add burst class only to the clicked bubble
        details.target.classList.add("burst");

        // Remove bubble after burst animation completes
        setTimeout(()=>{
            replaceBubble(details.target);
            if (gameRunning) {
                createHit();
            }
        },600)
    }
    }catch(err){console.log(err)}
    }
    if(details.target.textContent === 'Start'){
        start();
    }
})

document.querySelector("#content").addEventListener("animationend", function(details) {
    if (details.animationName === "rise") {
        replaceBubble(details.target);
    }
});

function reset(){
    document.querySelector("#hit").textContent = 0;
    document.querySelector("#timer").textContent = 0;
}

function start(){
    gameRunning = true;
    runTimer();
    makeBubble();
    createHit(); 
}



function init(){
    document.querySelector("#content").innerHTML = `<span class="start">Start</span>`;
}

init();

/*
    -- Summary -- 
    
    // todo: implement logic for which minutes and hours are correctly accounted for
    //  Method #1: count seconds and convert to min and hours
    //  Method #2: when reaching 60 reset and carry to min or hours X

    // todo: add concept to log

    // status: working, logs one timer for all the day with h, m and s

*/

let initInterval;
let timePassed = {};
const sixty = 60;

document.querySelector("#stop-btn")
    .addEventListener('click', function(event)
    {
        stop();
    }
);

document.querySelector("#start-btn")
    .addEventListener('click', function(event)
    {
        initInterval = setInterval(init, 1000);
    }
);

document.addEventListener('keydown',
                            function(event) 
            {
                if(event.key === ' '){
                    initInterval = setInterval(init, 1000);
                }
            }, false);

function init(){
    let date = new Date();
    let seconds = document.querySelector("#seconds"); 
    let minutes = document.querySelector("#minutes"); 
    let hours = document.querySelector("#hours"); 
    let secCounter; 
    let minCounter = 0;
    let hoursCounter = 0;

    if(parseInt(minutes.innerText) > 0){
        minCounter = parseInt(minutes.innerText);
    }
    if(parseInt(hours.innerText) > 0){
        hoursCounter = parseInt(hours.innerText);
    }

    if(seconds.innerText == '00' ){
        seconds.innerText = 0;

    } else if (minutes.innerText == '00'){
        minutes.innerText = 0;
    } else if (hours.innerText == '00'){
        hours.innerText = 0;
    }
    
    secCounter = parseInt(seconds.innerText);
    secCounter++;

    if(secCounter === sixty){
        minCounter++;
        minutes.innerText = minCounter;
        secCounter = 0;
    }
    if(minCounter === sixty && secCounter === 0) {
        hoursCounter++;
        hours.innerText = hoursCounter;
        minCounter = 0;
        minutes.innerText = 0;
    }

    seconds.innerText = secCounter;

}
function stop(){
    console.log('stopped');
    clearInterval(initInterval);
    let seconds = document.querySelector("#seconds");
    let minutes = document.querySelector("#minutes");
    let hours = document.querySelector("#hours");

    timePassed.hours = parseInt(hours.innerText);
    timePassed.minutes = parseInt(minutes.innerText);
    timePassed.seconds = parseInt(seconds.innerText);

    console.log(timePassed);
}
function save(){
    console.log("Saving...")
    let localTimers = localStorage.getItem("timers") ? JSON.parse(localStorage.getItem("timers")) : []; 
    let today = new Date();
    localTimers[today.toDateString()] = timePassed;
    localStorage.setItem("timers", JSON.stringify(localTimers));
    console.log(localTimers)
}
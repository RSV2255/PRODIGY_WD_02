const playButton = document.getElementsByClassName("play")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const lapButton = document.getElementsByClassName("lap")[0];

const milliseconds = document.getElementsByClassName("ms")[0];
const seconds = document.getElementsByClassName("ss")[0];
const minutes = document.getElementsByClassName("mm")[0];
const hours = document.getElementsByClassName("hh")[0];

const laps = document.getElementsByClassName("lapTimes")[1];
const clearButton = document.getElementsByClassName("clear")[0];

let lapCount = 0;

let centisec = 0;
let sw_cs = 0;

let sec = 0;
let sw_sec = 0;

let min = 0;
let sw_min = 0;

let hr = 0;
let sw_hr = 0;

let isPlay = false;
let isReset = false;

const toggleButton = () => {
    resetButton.classList.remove("hidden");
    lapButton.classList.remove("hidden");
};

const play = () => {
    if (!isPlay && !isReset) {
        playButton.innerHTML = "pause";
        isPlay = true;
        isReset = true;

        sw_cs = setInterval(() => {
            if (centisec == 99) {
                centisec = -1;
            }
            if (centisec < 9) {
                milliseconds.innerHTML = `0${++centisec}`;
            }
            else{
                milliseconds.innerHTML = `${++centisec}`;
            }
            
        },10);

        sw_sec = setInterval(() => {
            if (sec == 59) {
                sec = -1;
                
            }
            if (sec < 9) {
                seconds.innerHTML = `0${++sec}`;
            }
            else {
                seconds.innerHTML = `${++sec}`;
            }
        },1000);

        sw_min = setInterval(() => {
            if (min == 59) {
                min = -1;
            }
            if (min < 9) {
                minutes.innerHTML = `0${++min}`;
            }
            else {
                minutes.innerHTML = `${++min}`;
            }
        },60000);

        sw_hr = setInterval(() => {
            if(hr == 23){
                hr = -1;
            }
            if (hr < 9) {
                hours.innerHTML = `0${++hr}`;
            }
            else {
                hours.innerHTML = `${++hr}`;
            }
        },3600000);


        

        } else {
            playButton.innerHTML = "play";
            clearInterval(sw_cs);
            clearInterval(sw_sec);
            clearInterval(sw_min);
            clearInterval(sw_hr);
            isPlay = false;
            isReset = false;
            };
            
            
            toggleButton();
};

const reset = () => {
    isReset = true;
    play();
    resetButton.classList.add("hidden");
    lapButton.classList.add("hidden");
    milliseconds.innerHTML = `00`;
    seconds.innerHTML = `00`;
    minutes.innerHTML = `00`;
    hours.innerHTML = `00`;
    sec = 0;
    min = 0;
    hr = 0;
    centisec = 0;
    clear();
}

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timestamp = document.createElement("span");

    li.className = "laps";
    number.className = "lapcount";
    timestamp.className = "timestamp";

    number.innerHTML = `#${++lapCount}`;
    timestamp.innerHTML = `
    ${(hr < 9)?`0${hr}`:hr} : 
    ${(min < 9)?`0${min}`:min} : 
    ${(sec < 9)?`0${sec}`:sec} : 
    ${(centisec < 9)?`0${centisec}`:centisec}`;
    
    laps.append(li);
    li.append(number, timestamp);
}

const clear = () => {
    laps.innerHTML = '';
    lapCount = 0;
}
playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click',lap);
clearButton.addEventListener('click', clear);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]"),
    body: document.querySelector("body"),
}

let timerId = null

refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
    timerId = setInterval(() => {
     refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onStopBtnClick() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;

}
//test load 11
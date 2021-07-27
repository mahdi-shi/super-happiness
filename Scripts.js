//date
let clock = document.querySelector(".clock");
let endDate = document.querySelector("input[name = 'endDate']");
let timeStop = true;
let timeInterval;
let saveValue = localStorage.getItem("countdown") || false;

if (saveValue){
    showClock(saveValue)
    let inputValue = new Date(saveValue);
    endDate.valueAsDate = inputValue;
}
else{

}

//event for change
endDate.addEventListener("change",function(e){

    e.preventDefault();
    clearInterval(timeInterval)
    let temp = new Date(endDate.value);
    localStorage.setItem("countdown" , temp);
    showClock(temp);
    timeStop = true;

});

//show time
function showClock(d) {
    function updateCounter() {
        let tl = (calcClock(d));
        if (tl.total <= 0) {
            timeStop = false;
        }

        for (let i in tl) {
            let el = clock.querySelector("." + i);
            if(el) {
                el.innerHTML = tl[i];
            }
        }

    }
    updateCounter();

    if (timeStop) {
        timeInterval = setInterval(updateCounter, 1000);
    }
    else {
        clearInterval(timeInterval);
    }

}

// set time
function calcClock(d) {

    let currentDate = new Date();
    let t = Date.parse(d) - Date.parse(currentDate);

    let seconds = Math.floor((t/1000) % 60);
    let minutes = Math.floor((t/1000) / 60) % 60;
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));

    return{

        "total" : t,
        "days" : days,
        "hours" : hours,
        "minutes" : minutes,
        "seconds" : seconds,

    };

}
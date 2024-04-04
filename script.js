document.addEventListener('DOMContentLoaded', init());
var buttonactivated;
var optionsstudyopened;
var optionspauseopened;
var selectedstudytime;
var selectedpausetime;
var numberofsessions;
var currentsession;

function init(){
    buttonactivated = false;
    optionsstudyopened = false;
    optionspauseopened = false;
    currentsession = 1;
    numberofsessions = 1;
    buttonlistener();
    settingsposition();
    window.addEventListener('resize', function() {
        settingsposition();
    });
    settingslistener();
    closebuttonlistener();
    openoptionslistener();
    openpauseoptionslistener();
    stdoptionslistener();
    psoptionslistener();
}

function timer(totalTime,minutes,seconds,timeElement) {
    var interval = setInterval(function() {
        if (totalTime <= 0) {
            clearInterval(interval);
        } else {
            minutes = Math.floor(totalTime / 60);
            seconds = totalTime % 60;
            timeElement.innerHTML = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            totalTime--;
        }
    }, 1000);
}

function checkbuttonstatus(playbutton) {
    if (buttonactivated == false) {
        playbutton.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0572 33H8.43432C6.24859 33 4.5 31.2 4.5 28.95V7.05C4.5 4.8 6.24859 3 8.43432 3H11.0572C13.2429 3 14.9915 4.8 14.9915 7.05V28.8C15.1372 31.2 13.3886 33 11.0572 33Z" fill="white"/><path d="M27.5625 33H24.9375C22.75 33 21 31.2 21 28.95V7.05C21 4.8 22.75 3 24.9375 3H27.5625C29.75 3 31.5 4.8 31.5 7.05V28.8C31.5 31.2 29.75 33 27.5625 33Z" fill="white"/></svg>';
        buttonactivated = true;
    }else{
        playbutton.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.6693 14.0114L11.6966 2.15371C8.4254 0.342116 4.5 2.48309 4.5 6.27097V29.8217C4.5 33.4449 8.4254 35.7505 11.6966 33.7742L30.6693 21.9165C33.7769 20.1049 33.7769 15.823 30.6693 14.0114Z" fill="white"/></svg>';
        buttonactivated = false;
    }
}

function buttonlistener() {
    playbutton = document.getElementById('play');
    timeElement = document.getElementById('time');
    time = timeElement.innerHTML.split(':');
    minutes = parseInt(time[0]);
    seconds = parseInt(time[1]);
    totalTime = minutes * 60 + seconds;

    playbutton.addEventListener('click', function() {
        checkbuttonstatus(playbutton);
        


    });
}

function settingsposition() {
    const container = document.querySelector('.pom-container');
    const duplicate = document.querySelector('.pom-container-settings');
    
    const containerRect = container.getBoundingClientRect();
    duplicate.style.top = containerRect.top + 'px';
    duplicate.style.left = containerRect.left + 'px';    
}

function settingslistener() {
    settingsbutton = document.getElementById(('settings'));
    containersettings = document.getElementById('container-settings');
    closebutton = document.getElementById('settings-close');
    settingstitle = document.getElementById('title');

    settingsbutton.addEventListener('click',function(){
        containersettings.style.width = '40vh';
        closebutton.style.width = '36px';
        settingstitle.style.display = 'flex';
    });
}

function closebuttonlistener() {
    closebutton = document.getElementById('settings-close');
    containersettings = document.getElementById('container-settings');
    settingstitle = document.getElementById('title');

    closebutton.addEventListener('click',function() {
        containersettings.style.width = '0vh';
        closebutton.style.width = '0vh';
        settingstitle.style.display = 'none';
        closepsopt();
        closestdfopt();
    })


}

function openstdopt() {
    arrowbutton = document.getElementById('study-arrow');
    rectangle = document.getElementById('study-rectangle');
    pausetimesel = document.getElementById('pause-sel');
    rectangle.style.marginTop = "-1vh";
    rectangle.style.marginBottom = "0vh";
    arrowbutton.style.transform = 'rotateX(180deg)';
    pausetimesel.style.marginTop = '-2vh';
    optionsstudyopened = true;
}

function closestdfopt(){
    arrowbutton = document.getElementById('study-arrow');
    rectangle = document.getElementById('study-rectangle');
    pausetimesel = document.getElementById('pause-sel');
    rectangle.style.marginTop = "-5.5vh";
    rectangle.style.marginBottom = "-3vh";
    arrowbutton.style.transform = 'rotateX(0deg)';
    pausetimesel.style.marginTop = '-8vh';
    optionsstudyopened = false;
}
function openpsopt(){
    arrowbutton2 = document.getElementById('pause-arrow');
    rectangle2 = document.getElementById('pause-rectangle');
    rectangle2.style.marginTop = "-1vh";
    rectangle2.style.marginBottom = "0vh";
    arrowbutton2.style.transform = 'rotateX(180deg)';
    optionspauseopened = true;
}
function closepsopt() {
    arrowbutton2 = document.getElementById('pause-arrow');
    rectangle2 = document.getElementById('pause-rectangle');
    rectangle2.style.marginTop = "-5.5vh";
    rectangle2.style.marginBottom = "-3vh";
    arrowbutton2.style.transform = 'rotateX(0deg)';
    optionspauseopened = false;
}

function openoptionslistener(){
    arrowbutton = document.getElementById('study-arrow');
    rectangle = document.getElementById('study-rectangle');
    pausetimesel = document.getElementById('pause-sel');
    arrowbutton.addEventListener('click', function(){
        if(optionsstudyopened==false){
            openstdopt();
            closepsopt();
        }else if (optionsstudyopened==true){
            closestdfopt();
        }
        
    });
}

function openpauseoptionslistener(){
    arrowbutton2 = document.getElementById('pause-arrow');
    rectangle2 = document.getElementById('pause-rectangle');
    
    arrowbutton2.addEventListener('click', function(){
        if(optionspauseopened==false){
            openpsopt();
            closestdfopt();
        }else if (optionspauseopened==true){
            closepsopt();
        }
    });
}

function stdoptionslistener(){
    divsoptions = document.querySelectorAll('.stdop');
    time = document.getElementById('time');
    selstd = document.getElementById('stsel-selected');
    divsoptions.forEach(function(div){
        div.addEventListener('click',function(){
            time.innerHTML = this.innerHTML.replace(/\D/g, '') + ':00';
            selectedstudytime = this.innerHTML.replace(/\D/g, '');
            selstd.innerHTML = this.innerHTML;
            closestdfopt();
        });
    });

}

function psoptionslistener(){
    divsoptions = document.querySelectorAll('.psop');
    selps = document.getElementById('pssel-selected');
    divsoptions.forEach(function(div){
        div.addEventListener('click',function(){
            selectedpausetime = this.innerHTML.replace(/\D/g, '');
            selps.innerHTML = this.innerHTML;
            closepsopt();
        });
    });

}
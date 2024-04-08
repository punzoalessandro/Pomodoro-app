document.addEventListener('DOMContentLoaded', init());
var buttonactivated;
var optionsstudyopened;
var optionspauseopened;
var selectedstudytime;
var selectedpausetime;
var numberofsessions;
var currentsession;
var interval;
var ispausetime;
var currentsecond;
var isnightmode;
function init(){
    buttonactivated = false;
    optionsstudyopened = false;
    optionspauseopened = false;
    ispausetime = false;
    isnightmode = false;
    selectedpausetime = 5;
    selectedstudytime = 25;
    currentsession = 1;
    numberofsessions = 4;
    currentsecond = 0;
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
    changesessionslistener();
}


function timer(timeElement) {
    var timeParts = timeElement.innerHTML.split(':');
    var minutes = parseInt(timeParts[0]);
    var seconds = parseInt(timeParts[1]);
    sessions = document.getElementById('sessions');
    tomato = document.getElementById('tmt');
    interval = setInterval(function() {
        currentsecond += 360/(selectedstudytime*60);
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(interval);
                if(currentsession != numberofsessions ){
                    if(ispausetime == false){
                        timeElement.innerHTML = '0'+ selectedpausetime + ':' + '00';
                        timer(timeElement);
                        ispausetime = true;
                    }else{
                        currentsession++;
                        sessions.innerHTML = currentsession+' of <div><input type="text" value="'+numberofsessions+'" id="ses-selector"></div><div> sessions</div>';
                        timeElement.innerHTML = selectedstudytime + ':' + '00';
                        timer(timeElement);
                        ispausetime = false;
                    }
                }else{
                    //reset tutto
                }
                
                return;
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        tomato.style.transform = 'rotate('+currentsecond+'deg)';
        timeElement.innerHTML = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }, 1000);
}

function checkbuttonstatus(playbutton, interval,currenttime) {
    if (buttonactivated) {
        playbutton.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.6693 14.0114L11.6966 2.15371C8.4254 0.342116 4.5 2.48309 4.5 6.27097V29.8217C4.5 33.4449 8.4254 35.7505 11.6966 33.7742L30.6693 21.9165C33.7769 20.1049 33.7769 15.823 30.6693 14.0114Z" fill="white"/></svg>';
        buttonactivated = false;
        clearInterval(interval);
    } else {
        playbutton.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0572 33H8.43432C6.24859 33 4.5 31.2 4.5 28.95V7.05C4.5 4.8 6.24859 3 8.43432 3H11.0572C13.2429 3 14.9915 4.8 14.9915 7.05V28.8C15.1372 31.2 13.3886 33 11.0572 33Z" fill="white"/><path d="M27.5625 33H24.9375C22.75 33 21 31.2 21 28.95V7.05C21 4.8 22.75 3 24.9375 3H27.5625C29.75 3 31.5 4.8 31.5 7.05V28.8C31.5 31.2 29.75 33 27.5625 33Z" fill="white"/></svg>';
        timer(currenttime);
        buttonactivated = true;
    }
}

function buttonlistener() {
    var playbutton = document.getElementById('play');
    var timeElement = document.getElementById('time');



    playbutton.addEventListener('click', function() {
        checkbuttonstatus(playbutton, interval,timeElement);

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
    optionstext = document.querySelectorAll('#opt');
    titlest = document.getElementById('sttitle');
    sttime = document.getElementById('stsel-selected');
    pslest = document.getElementById('pstitle');
    pstime = document.getElementById('pssel-selected');
    settingsbutton.addEventListener('click',function(){
        containersettings.style.width = '40vh';
        closebutton.style.width = '36px';
        settingstitle.style.display = 'flex';
        optionstext.forEach(function(div){
            div.style.display = 'flex';

        });
        titlest.style.display = 'flex';
        sttime.style.display = 'flex';
        pslest.style.display = 'flex';
        pstime.style.display = 'flex';
    });
}

function closebuttonlistener() {
    closebutton = document.getElementById('settings-close');
    containersettings = document.getElementById('container-settings');
    settingstitle = document.getElementById('title');
    optionstext = document.querySelectorAll('#opt');
    titlest = document.getElementById('sttitle');
    sttime = document.getElementById('stsel-selected');
    pslest = document.getElementById('pstitle');
    pstime = document.getElementById('pssel-selected');
    closebutton.addEventListener('click',function() {
        containersettings.style.width = '0vh';
        closebutton.style.width = '0vh';
        settingstitle.style.display = 'none';
        optionstext.forEach(function(div){
            div.style.display = 'none';

        });
        titlest.style.display = 'none';
        sttime.style.display = 'none';
        pslest.style.display = 'none';
        pstime.style.display = 'none';
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

function changesessionslistener() {
    sessel = document.getElementById('ses-selector');

    sessel.addEventListener('input',function(){
        if(isNaN(sessel.value)!=true){
            console.log(sessel.value);
            numberofsessions = sessel.value;
        }
    });
}

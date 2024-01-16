keys = document.getElementsByClassName('key');

joystick.height = window.innerHeight*.3;
joystick.width = joystick.height;

ctx = joystick.getContext("2d");
centerX = joystick.width/2;
centerY = joystick.height/2;
radius = centerY/2;

function draw(x, y){    
    ctx.clearRect(0, 0, joystick.width, joystick.height)
    ctx.arc(centerX, centerY, centerX, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#6B6B6B';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.lineWidth = 5;
}

ctx.arc(centerX, centerY, centerX, 0, 2 * Math.PI, false);
ctx.fillStyle = '#6B6B6B';
ctx.fill();
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
ctx.fillStyle = 'white';
ctx.fill();
ctx.lineWidth = 5;

rect = joystick.getBoundingClientRect();

vol = 0;
last_vol = 0;
firstMove = 1;
volumeUpdate();

volSldr.addEventListener("input", () => {
    if (volSldr.value != vol){
        vol = volSldr.value;
        volumeUpdate();
        sendData([4, vol]);
    }
});

for (var i = 0; i < keys.length; i++){
    if (i == 11){
        keys[i].addEventListener("touchstart", (e) => {
            sendData([0, e.target.id, 0]);
        }, false);
    }
    else if (i < 12){
        keys[i].addEventListener("touchstart", (e) => {
            sendData([0, e.target.id, 0]);
            e.target.style.backgroundColor = "rgb(157, 157, 157)";
        }, false);
        keys[i].addEventListener("touchend", (e) => {
            e.target.style.backgroundColor = "rgb(107, 107, 107)";
        }, false);
    }
    else{
        keys[i].addEventListener("touchstart", (e) => {
            sendData([0, e.target.id, 1]);
            e.target.style.backgroundColor = "rgb(157, 157, 157)";
        }, false);
        keys[i].addEventListener("touchend", (e) => {
            sendData([0, e.target.id, 2]);
            e.target.style.backgroundColor = "rgb(107, 107, 107)";
        }, false);
    }
}

joystick.addEventListener("touchstart", (e) => {
    jstick(e);
    joystick.addEventListener("touchmove", (ev) => jstick(ev));
});

function jstick(ev){
    x1 = ev.touches[0].clientX - rect.left;
    y1 = ev.touches[0].clientY - rect.top;
    dist = Math.sqrt((centerX-x1)**2+(centerY-y1)**2);
    X = x1;
    Y = y1;
    if (dist <= radius){
        draw(x1, y1);
    }
    else{
        //using section formula
        m = dist-radius;
        n = radius;
        //m+n = dist
        X = (m*centerX + n*x1)/dist;
        Y = (m*centerY + n*y1)/dist;
        draw(X, Y);
    }
    sendData([3, [(X - centerX)/10, (Y - centerY)/10]]);
}

joystick.addEventListener("touchend", () => {
    joystick.removeEventListener("touchmove", (e) => jstick(e));
    draw(centerX, centerY);
});

function sendData(value){}

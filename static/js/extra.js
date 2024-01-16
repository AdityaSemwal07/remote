function volumeUpdate(){
    volumemute.innerHTML = vol+'%';
    if (volSldr.value != vol){
        volSldr.value = vol;
    }
}

volumemute.addEventListener("touchstart", () => {
    if (last_vol == 0){
        last_vol = 1;
        volumeUpdate();
        volumemute.style.backgroundColor = "rgb(157, 157, 157)";
        volumemute.style.textDecoration = "line-through";
    }
    else{
        volumeUpdate();
        volumemute.style.backgroundColor = "rgb(107, 107, 107)";
        volumemute.style.textDecoration = "";
        last_vol = 0;
    }
});

function getRatio(xylist = []){
    x = (xylist[1] > xylist[0]) ? xylist[1] : xylist[0];
    y = (xylist[1] > xylist[0]) ? xylist[0] : xylist[1];
    for (num=x; num>1; num--) {
        if (x % num == 0 && y % num == 0){
            x /= num;
            y /= num;
        }
    }
    return [x, y];
}
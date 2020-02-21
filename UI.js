var slider = document.getElementById("myRange");
slider.oninput = function() {
    frameRate(int(this.value));
}

var buttonStart = document.getElementById('button-start');
buttonStart.onclick = function() {
    propagationIsLocked = true;
}

var buttonPause = document.getElementById('button-pause');
buttonPause.onclick = function() {
    propagationIsLocked = !propagationIsLocked;
}

var buttonStep = document.getElementById('button-step');
buttonStep.onclick = function() {
    propagationIsLocked = false;
    lifeMap.Propagate();
}

var buttonClear = document.getElementById('button-clear');
buttonClear.onclick = function() {
    lifeMap.Clear();
}

var buttonRandom = document.getElementById('button-random');
buttonRandom.onclick = function() {
    lifeMap.Random();
}

var buttonCross = document.getElementById('button-cross');
buttonCross.onclick = function() {
    lifeMap.Cross();
}

var buttonBorder = document.getElementById('button-border');
buttonBorder.onclick = function() {
    lifeMap.Border();
}

var checkBox = document.getElementById("check");
checkBox.onclick = function() {
    lifeMap.drawable = !lifeMap.drawable;
}

var xfield = document.getElementById('xfield');
var yfield = document.getElementById('yfield');
var resfield = document.getElementById('resfield');
var buttonResize = document.getElementById('button-resize');
buttonResize.onclick = function() {
    xsize = int(xfield.value);
    ysize = int(yfield.value);
    resolution = int(resfield.value);
    let drawStatus = lifeMap.drawable;
    setup();
    lifeMap.drawable = drawStatus;
}
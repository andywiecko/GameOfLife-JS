let xsize = 100;
let ysize = 100;
let resolution = 6;
let lifeMap;
let canvas;

function setup() {
    canvas = createCanvas(xsize * resolution, ysize * resolution);
    cols = xsize;
    rows = ysize;

    canvas.mousePressed(xypos);

    lifeMap = new LifeMap(cols, rows);
    lifeMap.Random();

}

function mousePressed() {}

function mouseDragged() {
    if (mouseIsPressed) {
        let xpos = PixelToCell(mouseX);
        let ypos = PixelToCell(mouseY);
        if (lifeMap.drawable &&
            0 <= xpos && xpos < xsize &&
            0 <= ypos && ypos < ysize
        ) {
            console.log('X:', xpos, 'Y:', ypos);
            lifeMap.SetCell(1, xpos, ypos);
        }
    };

}

function xypos() {
    let xpos = PixelToCell(mouseX);
    let ypos = PixelToCell(mouseY);
    if (lifeMap.drawable)
        lifeMap.SetCell(1, xpos, ypos);

    console.log('X:', xpos, 'Y:', ypos);

}

function PixelToCell(x, y) {
    return floor(x / resolution);
}

let propagationIsLocked = true;

function draw() {
    //frameRate(30);
    lifeMap.Draw();
    if (propagationIsLocked)
        lifeMap.Propagate();

}
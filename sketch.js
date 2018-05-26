var word = "";  // An i mal len  change 3rd word
var input;
var wordIndex = 0;

function preload() {
    input = "Enter text here to speed read";
}
function setup() {
    createCanvas(800, 800);
    frameRate(5); // 300/60 300words per minute 5 fps
    noLoop();
    textFont('Roboto');
}

function draw() {
    background(25);
    fill(255);
    textSize(100);
    noStroke();
    rect(canvas.width * 0.4, canvas.height * 0.5 + 10, 2, 30);
    rect(canvas.width * 0.4, canvas.height * 0.5 - 110, 2, 30);
    nextWord();
    changeColour();
}

function changeColour() {
    var index = 0;
    if (word.length < 2) {
        //change first letter
        index = 0;
    } else if (word.length < 6) {
        //change 2nd
        index = 1;
    } else if (word.length < 10) {
        // change 3rd
        index = 2;
    } else if (word.length >= 10) {
        //change 4th
        index = 3;
    }
//after 13 characters the text wraps
    var start = "";
    var middle = "";
    var end = "";
    for (var i = 0; i < word.length; i++) {
        if (i < index) start += word[i];
        else if (i == index) middle += word[i];
        else if (i > index) end += word[i];
    }
    fill(255);
    text(start, canvas.width * 0.4 - (textWidth(middle) * 0.5) + 1 - textWidth(start), canvas.height * 0.5);
    fill(`#d31500`);
    text(middle, canvas.width * 0.4 - (textWidth(middle) * 0.5) + 1, canvas.height * 0.5);
    fill(255);
    text(end, canvas.width * 0.4 + (textWidth(middle) * 0.5) + 1, canvas.height * 0.5);
}

function nextWord() {
    var  words = input.split(" ")
    word = words[wordIndex];
    if(wordIndex < words.length-1) {
        wordIndex++;
    }
}
var word = "Hello";  // An i mal len  change 3rd word
var input = "Enter";
var started = false;
var wordIndex = 0;
var textArea, startButton;
var delayed = false;
var pause = false;

function setup() {
    textFont('Roboto');
    createCanvas(windowWidth, windowHeight);
    frameRate(5); // 300/60 300 words per minute 5 fps speed of delay is relative to wpm
    textArea = createElement('textarea');
    textArea.attribute("rows", "10");
    textArea.attribute("cols", "50");
    textArea.attribute("placeholder", "Enter text here to start speed reading.");
    textArea.html("Enter text here to start speed reading.");
    textArea.position(windowWidth * 0.5, windowHeight * 0.8);
    startButton = createButton('Start');
    startButton.position(textArea.x - 2, textArea.y - startButton.height - 4);
    startButton.mouseClicked(start);
    nextWord();
}

function stop() {
    startButton.html('Start');
    started = false;
}

function start() {
    if (started) {
        stop();
    } else {
        startButton.html('Stop');
        wordIndex = 0;
        input = textArea.value();
        started = true;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    textArea.position(windowWidth * 0.5, windowHeight * 0.8);
    startButton.position(textArea.x - 2, textArea.y - startButton.height - 4);

}

function draw() {
    background(25);
    fill(255);
    textSize(100);
    noStroke();
    rect(canvas.width * 0.4, canvas.height * 0.5 + 10, 2, 30);
    rect(canvas.width * 0.4, canvas.height * 0.5 - 110, 2, 30);
    if (started) {
        if (delayed) {
            delayed = false;
            frameRate(5);
        }
        nextWord();
    }
    drawText();
}

function drawText() {
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
    for (let i = 0; i < word.length; i++) {
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
    var words = input.split(" ");
    if (wordIndex == words.length - 1) {
        stop();
    }
    word = words[wordIndex];
    if (wordIndex < words.length - 1 && !pause) {
        if (words[wordIndex] == words[wordIndex + 1]) {
            pause = true;
        }
        wordIndex++;
        if (word.includes(",") || word.includes(".") || word.includes(";")) {
            frameRate(3);
            delayed = true;
            if (word.includes(".")) pause = true;
        }
    } else if (pause) {
        word = "";
        pause = false;
    }

}
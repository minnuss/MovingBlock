let myBlock;
let movesList;
let movesArray = [];
// array for random moves pick with R key
let randomMovesArray = ['right', 'left', 'up', 'down'];

// check to see if HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ready');
    // styling the block element
    myBlock = document.createElement('div');
    myBlock.innerHTML = 'Hello World';
    myBlock.style.width = '100px';
    myBlock.style.height = '100px';
    myBlock.style.backgroundColor = randomColor();
    myBlock.style.color = 'white';
    myBlock.style.fontWeight = '700';
    myBlock.style.lineHeight = '100px';
    myBlock.style.textAlign = 'center';
    myBlock.style.position = 'absolute';
    myBlock.style.left = '200px';
    myBlock.style.top = '200px';
    // adding the mainBlock element to page
    document.body.appendChild(myBlock);
    // adding the movesList element to page
    movesList = document.createElement('div');
    document.body.appendChild(movesList);
})

// random hexadecimal color logic
function randomColor() {
    return '#' + Math.random().toString(16).slice(-6);
}

// creating move element and adding it on page and into array
function addMove(val) {
    // creating span element with moves VALUE
    let span = document.createElement('span');
    span.textContent = '+' + val;
    span.style.padding = '10px';
    span.style.border = '1px solid #ddd';
    // adding hover effect on span element
    span.addEventListener('mouseover', () => {
        span.style.backgroundColor = 'red';
        span.style.color = 'white';
    })
    span.addEventListener('mouseout', () => {
        span.style.backgroundColor = 'white';
        span.style.color = 'black';
    })
    // removing the span with mouse click
    span.addEventListener('click', () => {
        // getting the index of clicked span element
        let spanId = movesArray.indexOf(span);
        console.log(spanId);
        // removing the clicked span element from array with splice method
        let removeSpan = movesArray.splice(spanId, 1);
        // removing the clicked span element from page
        movesList.removeChild(span);
    })
    // appending span with move information to movesList on page
    movesList.appendChild(span);
    // pushing whole span into array instead of just value because it has abbility to be removed after with mover() function
    movesArray.push(span);
    console.log(movesArray);
}

// setting moves, random move and random color change
document.addEventListener('keydown', (e) => {
    console.log(e.key);
    e.preventDefault();
    // moving the box with arrow keys
    if (e.key === "ArrowUp") addMove('up');
    if (e.key === "ArrowDown") addMove('down');
    if (e.key === "ArrowLeft") addMove('left');
    if (e.key === "ArrowRight") addMove('right');
    // pressing key C will change color of the block
    if (e.key === "c") myBlock.style.backgroundColor = randomColor();
    // adding random movement into array
    if (e.key === "r") {
        let randomMove = randomMovesArray[Math.floor(Math.random() * randomMovesArray.length)];
        addMove(randomMove);
    }
    // moving the block element when enter or space is triggered, space is " "
    if (e.key === 'Enter' || e.key === " ") {
        mover();
    }
})

// variable for pixel movement of the myBlock element
let speed = 50;

// moving the block after enter or space is pressed
function mover() {
    if (movesArray.length > 0) {
        // getting position information of the block with getBoundingClientRect()
        let cur = myBlock.getBoundingClientRect();
        let el = movesArray.shift();
        console.log(el);
        // taking '+' out of the textContent of the span element
        let item = el.textContent.replace('+', '');
        // removing the span when enter or space is triggered
        movesList.removeChild(el);
        // setting inner text of the block with current move from array which was shift()
        myBlock.innerHTML = "Move: " + item;
        console.log(item);

        console.log(cur)

        if (item === "up") myBlock.style.top = cur.top - speed + 'px';
        if (item === "down") myBlock.style.top = cur.top + speed + 'px';
        if (item === "left") myBlock.style.left = cur.left - speed + 'px';
        if (item === "right") myBlock.style.left = cur.left + speed + 'px';

        setTimeout(mover, 500);
    } else {
        // reseting inner text of myBlock
        myBlock.innerHTML = 'Set new path';
        return;
    }
}

function goRight() {
    // offsetLeft is giving a value of an object left of the screen
    let temp = myBlock.offsetLeft;
    temp = temp + speed;
    myBlock.style.left = temp + 'px';
}

function goLeft() {
    let temp = myBlock.offsetLeft;
    temp = temp - speed;
    myBlock.style.left = temp + 'px';
}

function goUp() {
    // offsetTOP is giving a value of an object top of the screen
    let temp = myBlock.offsetTop;
    temp = temp - speed;
    myBlock.style.top = temp + 'px';
}

function goDown() {
    let temp = myBlock.offsetTop;
    temp = temp + speed;
    myBlock.style.top = temp + 'px';
}


/**
 *  @fileOverview Interface of Minesweeper
 *
 *  @author       Ian Farris
 *  @author       Thor Lyche
 *  @author       Robert Nickel
 *  @author       Tony Nguyen
 *  @author       Emilia Paz
 */

/** ------------Global variables ------------ */

let grid;
let cheating = false;
let cols=0;
let rows=0;
let mines=0;
let width=30;
let flags=0;
let isGameover = false;
let isWin = false;

/** ------------ P5 interface ------------ */
/** Creates a canvas with a 2D array according to the input
    * @pre need a valid number of rows and columns to build the board
    * @post the board has been created and filled with mines, the user can now play the game!
    */
function setup() {
    /** Reset globals */
    reset();
    loop();
    /** Gets the dimensions from the user */
    rows = floor(document.getElementById("input1").value);
    cols = floor(document.getElementById("input2").value);
    mines = floor(document.getElementById("input3").value);
    flags = mines;

    /** Boundaries for the grid */
    if (rows<2 || rows>30){
        sizeError();
        return;
    }
    if (cols < 2 || cols > 30){
        sizeError();
        return;
    }
    if(mines<=0){
        minesError();
        return;
    }
    if(mines>=rows*cols){
        minesError();
        return;
    }
    width = max(90 - 2.5*max(rows, cols), 30);
    /** Clear errors */
    document.getElementById("minesBoundsError").hidden = true;
    document.getElementById("sizeBoundsError").hidden = true;
    /** Creates a canvas that holds the amount of cols and rows given according to the set width*/
    let canvas = createCanvas(cols*width +1, rows*width +1);
    canvas.parent('canvas-holder');

    /** Creates a 2D Array with the cols and rows given*/
    grid = create2DArray(cols, rows);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        grid[c][r] = new Box(c*width, r*width, width);
      }
    }

    /** Populates the grid with the amount of mines given */
    mine_population(mines, rows, cols, grid);

    /** Populates the count of each box in the grid */
    generate_playing_field(mines, rows, cols, grid);
    
}

function isIntense() {
    return document.getElementById("intenseModeInput").checked;
}

function minesError() {
    let errorText = "Error: Must have between 1 and " + getMineMax() + " mines.";

    let errorElem = document.getElementById("minesBoundsError");
    errorElem.innerText = errorText;
    errorElem.hidden = false;
    reset();
}

function sizeError() {
    let errorText = "Error: Rows and Columns must be between 2 and 30 spaces.";

    let errorElem = document.getElementById("sizeBoundsError");
    errorElem.innerText = errorText;
    errorElem.hidden = false;
    reset();
}

function getMineMax() {
    return  document.getElementById("input1").value * document.getElementById("input2").value - 1;
}

function checkInputs() {
    let t_rows = document.getElementById("input1").value;
    let t_cols = document.getElementById("input2").value;
    let mineElem = document.getElementById("input3");
    let t_mineMax;
    if (t_rows<2 || t_rows>30 || t_cols<2 || t_cols>30) {
        sizeError();
        t_mineMax = 1;
    } else {
        document.getElementById("sizeBoundsError").hidden = true;
        t_mineMax = t_rows*t_cols - 1;
    }
    mineElem.max = t_mineMax;
}

/**
 * Resets global variables
 */
function reset() {
    grid = [];
    cols=0;
    rows=0;
    mines=0;
    width=30;
    flags=0;
    isGameover = false;
    isWin = false;
   
}
/** Draws the canvas on the site by calling the show function on each box
    * @pre there has been a 2d array built, but it has nothing inside it
    * @post the array is now filled with mines or number of adjacent mines
    * @return none
    */
function draw() {
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
        grid[c][r].show();
        }
    }
    document.getElementById("flagsLeft").innerHTML = ("Remaining flags: " + flags);
    if (isGameover) {
        if (isWin) {
            window.alert("You win!");
        }
        else {
            window.alert("You lose.");
        }
        noLoop();
        reset();
    }
}

/** ------------ Helper Functions ------------ */

/**
 * Creates a 2D Array according to the cols and rows given
 * @param   {number} cols number of columns for the 2D array
 * @param   {number} rows number of rows for the 2D array
 * @return  {array} 2D array with the the numbers of cols and rows
 */
function create2DArray(cols,rows){
    let grid = new Array(cols);
    for (let c=0; c<cols; c++){
        grid[c] = new Array(rows);
    }
    return grid;
}


/** Places a flags where the mouse is located when f is released
  * @pre An array has been created and filled with box objects, some of which contain mines
  * @post Once the f key has been released a flag will be set wherever the cursor hovered when f is pressed
  *       (decrementing flagCount by 1) if this is repeated, the flag will be removed and flagCount will increase by 1
  * @return none
*/
function flag(x,y) {
    if (isGameover) return;
    try {
        grid[x][y].flagged;
    } catch (e) {
        return;
    }
    if (grid[x][y].revealed) {
        return;
    }
    if (grid[x][y].flagged){
        grid[x][y].flagged=false;
        flags = flags + 1;
    }
    else if (flags > 0){
        grid[x][y].flagged=true;
        flags = flags - 1;
    }
    if (win(cols, rows, grid, mines)) {
        grid[x][y].show();
        isGameover = true;
        isWin = true;
    }
}


/** Reveals a space clicked on by the user
  * @pre The game board has been initialized, the game has begun
  * @post triggers winning, losing, or the waterfall reveal if necessary, triggers mine shuffle if we are in intense mode
  * @return none
*/
function reveal(x,y) {
    if (isGameover) return;
    try {
        grid[x][y].flagged;
    } catch (e) {
        return;
    }
    if (grid[x][y].flagged || grid[x][y].revealed) return;
    grid[x][y].revealed=true;
    grid[x][y].hasBeenRevealed = true;
    /** Calls lose function */
    if (grid[x][y].mine) {
        grid[x][y].show();
        isGameover = true;
        return;
    }
   
    /** Generates spaces if the box is an space and not a mine*/
    else if (grid[x][y].count==0) {
        reveal_spaces(x,y,cols,rows,grid);
    }
    /** Calls win function */
    if (win(cols, rows, grid, mines)) {
        grid[x][y].show();
        isGameover = true;
        isWin = true;
    }

    //I'm sorry Zach no ur not
    if(isIntense()){
        mine_shuffle(grid);
    }
    
}

/**
 * Changes the box implementation when it is revealed  the number of mines adjacent to that spot will appear. If they have flagged every
 * mine, they win
 *
 * @pre The board has been created and filled with mines, the user is playing
 * @post if the user clicks a mine, they lose. If they click anything other than a mine,
 * @return none
 */
function mousePressed() {
    /** Gets coordinate of the click input */
    let x = floor(mouseX/width);
    let y = floor(mouseY/width);
    if (mouseButton === LEFT) {
        reveal(x,y);
    }
    else if (mouseButton === RIGHT) {
        flag(x,y);
    }
}

/**
 * Begins the shaking animation
 *
 * @pre The user is in intense mode
 * @post the shake animation starts
 * @return none
 */
function shakeIt(){
	//shake it like a polaroid picture
	canvas = document.getElementById('defaultCanvas0');
	canvas.style.animation = 'shake 0.5s';
	canvas.style.animationIterationCount = 'infinite';
	
}

/**
 * Cease all animations
 *
 * @pre The user is in normal mode
 * @post all animations stop
 * @return none
 */

function stopAnimation(){
    canvas = document.getElementById('defaultCanvas0');
    canvas.style.animation = 'none';
    canvas.style.animationIterationCount = '0';
}


/**
 * Begins the spinning animation
 *
 * @pre The user is in intense mode
 * @post the spin animation starts
 * @return none
 */
function spinIt(){
    //you spin me right round
    canvas = document.getElementById('defaultCanvas0');
    canvas.style.animation = 'spin 30s';
    canvas.style.animationIterationCount = 'infinite';

}


/**
 *  @fileOverview Helper function for DOM manipulation
 *
 *  @author       Zachary Atkins
 *  @author       Jacob Marshall
 */     
/**
 * toggles button text and checkbox state between
 * normal and intense mode
 * 
 * toggles intense mode
 */
function toggleIntenseMode() {
    let button = document.getElementById("intenseMode");
    let checkBox = document.getElementById("intenseModeInput");
    let titleText = document.getElementById('bigText');
    if (button.innerText==="Normal Mode") {
        titleText.innerHTML = "SUPER CRAZY LUDICROUS INTENSE MINESWEEPER WOW";
        shakeIt();
        button.innerText = "INTENSE MODE!!";
        button.style.backgroundColor = "red";
        checkBox.checked = true;
        audioCreator();
        document.body.style.backgroundImage = "url('../minesweeper-game/css/intenseModeHellfire.jpg')";
        document.getElementById("introtext").hidden = true;
        document.getElementById("intenseRules").hidden = false;
        let ptags = document.getElementById("settings").children;
        for (let elem of ptags){
            elem.classList.add("intense");
        }
        let intenseTexts = document.getElementsByClassName("isIntense");
        for (let elem of intenseTexts) {
            elem.classList.add("intense");
        }
    } else {
        titleText.innerHTML = "MINESWEEPER";
        stopAnimation();
        button.innerText = "Normal Mode";
        button.style.backgroundColor = "#ffce00";
        checkBox.checked = false;
        audioStopper();
        document.body.style.backgroundImage = "url('../minesweeper-game/css/background.jpg')";
        document.getElementById("introtext").hidden = false;
        document.getElementById("intenseRules").hidden = true;
        let ptags = document.getElementById("settings").children;
        for (let elem of ptags){
            elem.classList.remove("intense");
        }
        let intenseTexts = document.getElementsByClassName("isIntense");
        for (let elem of intenseTexts) {
            elem.classList.remove("intense");
        }
    }
}

/**
 * toggles button text and checkbox state for cheats
 * 
 * toggles cheats enabled and ghost-reveals all spaces
 */
function toggleCheats(){
    let button = document.getElementById("cheatMode");
    let checkBox = document.getElementById("cheatModeInput");
    if(cheating === true){
        cheating = false;
        button.innerText = "Cheats Off";
        button.style.backgroundColor = "#ffce00";
        checkBox.checked = false;
    }
    else{
        cheating = true;
        button.innerText = "Cheats On";
        button.style.backgroundColor = "red";
        checkBox.checked = true;
    }
    for(x = 0; x < cols; x++){
        for(y = 0; y < rows; y++){
            if(cheating === true){
                grid[x][y].revealed = true;
            }
            else{
                if(grid[x][y].hasBeenRevealed === false){
                    grid[x][y].revealed = false;
                }
            }
        }
    }
    redraw();
}

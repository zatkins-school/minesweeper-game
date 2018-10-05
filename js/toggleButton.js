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
 * toggles cheat mode
 */
function toggleIntenseMode() {
    let button = document.getElementById("intenseMode");
    let checkBox = document.getElementById("intenseModeInput");
    if (button.innerText==="Normal Mode") {
        shakeIt();
        button.innerText = "INTENSE MODE!!";
        button.style.backgroundColor = "red";
        checkBox.checked = true;
				audioCreator();
				document.body.style.backgroundImage = "url('../minesweeper-game/css/intenseModeHellfire.jpg')";
    } else {
        stopAnimation();
        button.innerText = "Normal Mode";
        button.style.backgroundColor = "#ffce00";
        checkBox.checked = false;
				audioStopper();
				document.body.style.backgroundImage = "url('../minesweeper-game/css/background.jpg')";
    }
}


function toggleCheats(){
    let button = document.getElementById("cheatMode");
    let checkBox = document.getElementById("cheatModeInput");
    if(cheating === true){
        cheating = false;
        button.innerText = "CHEATS OFF";
        button.style.backgroundColor = "#ffce00";
        checkBox.checked = false;
    }
    else{
        cheating = true;
        button.innerText = "CHEATS ON";
        button.style.backgroundColor = "red";
        checkBox.checked = true;
    }
    console.log("toggled");
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

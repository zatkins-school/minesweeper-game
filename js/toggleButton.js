/**
 *  @fileOverview Helper function for DOM manipulation
 *
 *  @author       Zachary Atkins
 */
/**
 * toggles button text and checkbox state between
 * normal and intense mode
 */
function toggleIntenseMode() {
    let button = document.getElementById("intenseMode");
    let checkBox = document.getElementById
    ("intenseModeInput");
    if (button.innerText==="Normal Mode") {
        button.innerText = "INTENSE MODE!!";
        button.style.backgroundColor = "red";
        checkBox.checked = true;
				audioCreator();
    } else {
        button.innerText = "Normal Mode";
        button.style.backgroundColor = "#ffce00";
        checkBox.checked = false;
				audioStopper();
    }
}

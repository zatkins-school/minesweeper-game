function toggleIntenseMode() {
    let button = document.getElementById("intenseMode");
    let checkBox = document.getElementById
    ("intenseModeInput");
    if (button.innerText==="Normal Mode") {
        button.innerText = "INTENSE MODE!!";
        button.style.backgroundColor = "red";
        checkBox.checked = true;
    } else {
        button.innerText = "Normal Mode";
        button.style.backgroundColor = "#ffce00";
        checkBox.checked = false;
    }
    console.log(checkBox.checked);
}
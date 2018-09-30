function toggleIntenseMode() {
    let button = document.getElementById("intenseMode");
    if (button.innerText==="Normal Mode") {
        button.innerText = "INTENSE MODE!!";
        button.style.backgroundColor = "red";
    } else {
        button.innerText = "Normal Mode";
        button.style.backgroundColor = "#ffce00";
    }
}
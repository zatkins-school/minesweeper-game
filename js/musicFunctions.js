/**
 * @fileOverview Implementation of the music functions
*/

/** ------------Global variable ------------ */
let state = null;

/** @function
 * When state is null, creates an audio tag for the music and starts the music.
 * when state is true it does nothing, and when state is false it unpauses the music.
 * @pre Music file must exist
 * @post Audio tag in the HTML
*/
function audioCreator()
{
	if(state === null)
	{
		this.music = document.createElement("audio");
		this.music.src = "../minesweeper-game/sound/bensound-highoctane.mp3";
		this.music.setAttribute("preload", "auto");
		this.music.setAttribute("controls", "none");
		this.music.setAttribute("loop", "true");
		this.music.setAttribute("id", "intenseAudio");
		this.music.style.display = "none";
		document.body.appendChild(this.music);
		this.music.play();
		state = true;
	}
	else
	{
		document.getElementById("intenseAudio").play();
		state = true;
	}
}

/** @function
	* When state is null or false it does nothing. When state is true it pauses the music and
	* sets the state to false.
	* @pre Audio tag must exist if state is true
	* @post Music is paused
*/
function audioStopper()
{
		document.getElementById("intenseAudio").pause();
		state = false;
}

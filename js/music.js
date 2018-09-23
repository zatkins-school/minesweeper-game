/**
	* @fileOverview Manages Music
	* whenever required
*/

/**
	*	@class
	*	This class will play songs in the sound folder whenever required.
	* @property {boolean} state - State True = Music plays. State False = No Music.
*/

/**
	* @constructor
	* The this.music syntax is to be used with the HTML5 audio tag
	*	@pre: This code needs to be ran after the page is rendered!
	* @post: Music Plays or Doesn't Play
	* @return: Nothing
*/
function music(state)
{
	this.music = document.createElement("audio");
	this.music.src = "../sound/bensound-extremeaction.mp3";
	this.music.setAttribute("preload", "auto");
	this.music.setAttribute("controls", "none");
	this.music.style.display = "none";
	document.body.appendChild(this.sound);
	this.state = state;
	if(this.state)
	{
		playMusic();
	}
}

/**
	* @function
	* This function will manage whether or not to play a song
	* @pre: None
	* @post: Mus
*/
function toggleMusic()
{
	this.state = !(this.state);
	playMusic();
}

/**
	* @function
	* This function will choose a song and play it if the state is true
	* It will also turn off the music if the state is false
	* @pre: Music is in the src location
	* @post: Music will play
	* @return: Nothing
*/
function playMusic()
{
	if (this.state)
	{
		this.music.play();
	}
	else
	{
		this.music.pause();
	}
}

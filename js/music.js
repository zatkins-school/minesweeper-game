/**
	* @fileOverview Manages Music
	* whenever required
*/

/**
	*	@class
	*	This class will randomly play a song in the sound folder whenever required.
	* @property {boolean} state - If Rock music needs to be played or not.
	* @property {string} src - Music source string
*/

/**
	* @constructor
	*	@pre: This code needs to be ran after the page is rendered!
	* @post: Music Plays or Doesn't Play
	* @return: Nothing
*/
function music(state)
{
	this.state = state;
	this.src = "../sound/";
}

/**
	* @
*/

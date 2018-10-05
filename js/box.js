/**
 *  @fileOverview Box class
 *
 *  @author       Ian Farris
 *  @author       Thor Lyche
 *  @author       Robert Nickel
 *  @author       Tony Nguyen
 *  @author       Emilia Paz
 */


 /**
  * A class to represent boxes in the grid
  * @class
  *

  *
  * @property {number} x the box's x coordinate
  * @property {number} y the box's y coordinate
  * @property {number} w the box's width
  * @property {boolean} mine  contains or not a mine
  * @property {boolean} revealed  whether or not the box is revealed
  * @property {number} count number of mines surrounding this space
  * @property {boolean} flagged   contains or not a flag
  * @property {boolean} hasBeenRevealed tracks whether the space has been revealed during the session
  */


/**
  * @constructor
  * @pre: need valid grid inputs
  * @Post: a box object which is available to be shown has been generated
  * @return: undefined
*/
function Box(x,y,width)
{
    this.x = x;
    this.y = y;
    this.w = width;
    this.mine = false;
    this.revealed = false;
    this.count = 0;
    this.flagged = false;
    this.hasBeenRevealed = false;
}

/**
   * @pre: grid has been created and filled with values
   * @post: reveals the value of the grid that was clicked on
   * @returntype: undefined
*/
Box.prototype.show = function() {
    
    fill(250, 250, 250  );
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed && this.flagged==false){
        
        if(this.mine==true){
            // red
            fill(179, 0, 0);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
        else if(this.count==1){
            // yellow 1
            fill(255, 235, 59);
            beginShape();
            vertex( this.x + this.w / 2 + this.w * (2 / 30), this.y + this.w * (3/30)); //top right
            vertex( this.x + this.w / 2 + this.w * (2 / 30), this.y + this.w * 3 / 4); //right trunk meets base
            vertex( this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w * 3 / 4); //right base top
            vertex( this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w * 3 / 4 + this.w * (3 / 30)); //right base bottom
            vertex( this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * 3 / 4 + this.w * (3 / 30)); //left base bottom
            vertex( this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * 3 / 4); //left base top
            vertex( this.x + this.w / 2 - this.w * (2 / 30), this.y + this.w * 3 / 4); //left trunk meets base
            vertex( this.x + this.w / 2 - this.w * (2 / 30), this.y + this.w / 4); // leaf meets trunk bottom
            vertex( this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w / 4); //leaf point
            endShape(CLOSE);
        }
        else if(this.count==2){
            // light green
            fill(190, 220, 57);
            beginShape();
            vertex(this.x + this.w / 2 + this.w * (9 / 30), this.y + this.w * 3 / 4 + this.w * (3 / 30)); //base right bottom
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * 3 / 4 + this.w * (3 / 30)); //base left bottom
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * 3 / 4 - this.w * (2 / 30)); //base left top
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w / 2); //middle right inside
            vertex(this.x + this.w / 2, this.y + this.w * (7 / 30)); //top point inside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (7 / 30)); //top left point inside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (3 / 30)); //top left point outside
            vertex(this.x + this.w / 2 + this.w * (2 / 30), this.y + this.w * (3 / 30)); //top point top
            vertex(this.x + this.w / 2 + this.w * (9 / 30), this.y + this.w / 2 + this.w * (1 / 30)); //right point right
            vertex(this.x + this.w / 2 - this.w * (3 / 30), this.y + this.w * 3 / 4); //base left inside
            vertex(this.x + this.w / 2 + this.w * (9 / 30), this.y + this.w * 3 / 4); //base right top
            endShape(CLOSE);

        }
        else if(this.count==3){
            // dark green
            fill(76, 175, 80);
            beginShape();
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (3 / 30)); //top left outside
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w * (3 / 30)); //top right outside
            vertex(this.x + this.w / 2, this.y + this.w / 2 - this.w * (4 / 30)); //middle left inside
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w / 2 - this.w * (4 / 30)); //middle right outside
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w * 3 / 4 + this.w * (3 / 30)); //bottom right outside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * 3/4 + this.w * (3 / 30)); //bottom left outside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * 3/4 -1); //bottom left inside
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w * 3 / 4 - this.w * (1 / 30)); //bottom right inside
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w / 2); //middle right inside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w / 2); //middle left outside
            vertex(this.x + this.w / 2, this.y + this.w * (7 / 30)); //top right inside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (7 / 30)); //top left inside
            endShape(CLOSE);
        }
        else if(this.count==4){
            // light blue
            fill(0, 188, 212  );
            beginShape();
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w * 3 / 4 + this.w * (3 / 30)); //base right
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w * (3 / 30)); //top outside right
            vertex(this.x + this.w / 2, this.y + this.w * (3 / 30)); //top outside left
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w / 2); //left outside top
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w / 2 + this.w * (4 / 30)); //left outside bottom
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w / 2 + this.w * (4 / 30)); //right bottom
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w / 2); //right top
            vertex(this.x + this.w / 2 - this.w * (4 / 30), this.y + this.w / 2); //left inside
            vertex(this.x + this.w / 2, this.y + this.w * (9 / 30)); //top inside
            vertex(this.x + this.w / 2, this.y + this.w * 3/4 + this.w * (3 / 30)); //base left
            endShape(CLOSE);
        }
        else if(this.count==5){
            // blue
            fill(33, 150, 243);
            beginShape();
            vertex(this.x + this.w / 2 + this.w * (9 / 30), this.y + this.w * (3 / 30)); //base right bottom
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (3 / 30)); //base left bottom
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (8 / 30)); //base left top
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w / 2 + this.w * (1 / 30)); //middle right inside
            vertex(this.x + this.w / 2, this.y + this.w * 3 / 4 + this.w * (3 / 30)); //top point inside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * 3 / 4 + this.w * (3 / 30)); //top left point inside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * 3 / 4 + this.w * (7 / 30)); //top left point outside
            vertex(this.x + this.w / 2 + this.w * (3 / 30), this.y + this.w * 3 / 4 + this.w * (7 / 30)); //top point top
            vertex(this.x + this.w / 2 + this.w * (9 / 30), this.y + this.w / 2); //right point right
            vertex(this.x + this.w / 2 - this.w * (3 / 30), this.y + this.w * (7 / 30)); //base left inside
            vertex(this.x + this.w / 2 + this.w * (9 / 30), this.y + this.w * (7 / 30)); //base right top
            endShape(CLOSE);
        }
        else if(this.count==6){
            // dark blue
            fill(63, 81, 181);
            beginShape();
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w * (3 / 30)); //top right outside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (3 / 30)); //top left outside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w - this.w * (3 / 30)); //bottom left outside
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w - this.w * (3 / 30)); //bottom right outside
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w / 2 - this.w * (2 / 30)); //middle right outside
            vertex(this.x + this.w / 2 - this.w * (4 / 30), this.y + this.w / 2 - this.w * (2 / 30)); //middle left top
            vertex(this.x + this.w / 2 - this.w * (4 / 30), this.y + this.w / 2 + this.w * (2 / 30)); //middle left bottom
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w / 2 + this.w * (2 / 30)); //middle right inside
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w - this.w * (7 / 30)); //bottom right inside
            vertex(this.x + this.w / 2 - this.w * (4 / 30), this.y + this.w - this.w * (7 / 30)); //bottom left inside
            vertex(this.x + this.w / 2 - this.w * (4 / 30), this.y + this.w * (7 / 30)); //top left inside
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w * (7 / 30)); //top right inside
            endShape(CLOSE);
        }
        else if(this.count==7){
            // purple
            fill(103, 58, 183);
            beginShape();
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (3 / 30)); //top left outside
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w * (3 / 30)); //top right outside
            vertex(this.x + this.w / 2 + this.w * (2 / 30), this.y + this.w - this.w * (3 / 30)); //bottom right
            vertex(this.x + this.w / 2 - this.w * (3 / 30), this.y + this.w - this.w * (3 / 30)); //bottom left
            vertex(this.x + this.w / 2 + this.w * (2 / 30), this.y + this.w * (7 / 30)); //top right inside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (7 / 30)); //top left inside
            endShape(CLOSE);
        }
        else if(this.count==8){
            // pink
            fill(170, 44, 192);
            beginShape();
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w * (3 / 30)); //top right outside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w * (3 / 30)); //top left outside
            vertex(this.x + this.w / 2 - this.w * (8 / 30), this.y + this.w - this.w * (3 / 30)); //bottom left outside
            vertex(this.x + this.w / 2 + this.w * (8 / 30), this.y + this.w - this.w * (3 / 30)); //bottom right outside
            endShape(CLOSE);

            fill(250, 250, 250);

            //top hole
            beginShape();
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w / 2 - this.w * (2 / 30)); //middle right outside
            vertex(this.x + this.w / 2 - this.w * (4 / 30), this.y + this.w / 2 - this.w * (2 / 30)); //middle left top
            vertex(this.x + this.w / 2 - this.w * (4 / 30), this.y + this.w * (7 / 30)); //top left inside
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w * (7 / 30)); //top right inside
            endShape(CLOSE);

            //bottom hole
            beginShape();
            vertex(this.x + this.w / 2 - this.w * (4 / 30), this.y + this.w / 2 + this.w * (2 / 30)); //middle left bottom
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w / 2 + this.w * (2 / 30)); //middle right inside
            vertex(this.x + this.w / 2 + this.w * (4 / 30), this.y + this.w - this.w * (7 / 30)); //bottom right inside
            vertex(this.x + this.w / 2 - this.w * (4 / 30), this.y + this.w - this.w * (7 / 30)); //bottom left inside
           endShape(CLOSE);
        }
        else{
            // gray
            fill(224, 224, 224);
            ellipseMode(CORNER);
            ellipse(this.x+5, this.y+5, this.w -10 , this.w -10);
        }
    }
    else if (this.flagged){
        //flag
        fill(179, 0, 0);
        triangle(this.x + this.w/2, this.y + this.w * (2 / 30), this.x + this.w, this.y + this.w/2, this.x + this.w/2, this.y + this.w/2);
        fill(0,0,0);
        quad(this.x + this.w/2, this.y + this.w * (2 / 30), this.x + this.w/2 - this.w * (4 / 30), this.y + this.w * (2 / 30), this.x + this.w/2 - this.w * (4 / 30), this.y + this.w - this.w * (2 / 30), this.x + this.w/2, this.y + this.w - this.w * (2 / 30));
    }

}

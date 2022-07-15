export class Keyboard {
    constructor(){

        this.walkNorth = false;
        this.walkSouth = false;
        this.walkEast = false;
        this.walkWest = false;

    }

    keyUp(key){
        switch(key){
            case 'w':
                this.walkNorth = false;
                break;
            case 'a':
                this.walkEast = false;
                break
            case 's':
                this.walkSouth = false;
                break;
            case 'd':
                this.walkWest = false;
                break
        }

    }

    keyDown(key){
        switch(key){
            case 'w':
                this.walkNorth = true;
                break;
            case 'a':
                this.walkEast = true;
                break
            case 's':
                this.walkSouth = true;
                break;
            case 'd':
                this.walkWest = true;
                break
        }
    }

}
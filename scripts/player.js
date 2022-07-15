import { Coordinates } from "./coordinates.js";

export class Player {
    constructor(keyboard) {
        this.keyboard = keyboard;

        this.icon = 'icon';
        this.dir = 'N';
        this.pos = new Coordinates();

        this.walkTick = 0;
    }

    movePlayer() {
        if (this.walkTick < 6){
            this.walkTick ++;
            return;
        } else {
            this.walkTick = 0;
        }

        this.dir = '';
        const w = this.keyboard;

        if (w.walkNorth){
            this.pos.y -= 1;
            this.dir += 'N';
        }
        if (w.walkSouth){
            this.pos.y += 1;
            this.dir += 'S';
        }
        if (w.walkEast){
            this.pos.x -= 1;
            this.dir += 'E';
        }
        if (w.walkWest){
            this.pos.x += 1;
            this.dir += 'W';
        }

        // switch (key) {
        //     case 'w':
        //         this.direction = 'N';
        //         this.pos.y -= 1;
        //         break;
        //     case 'a':
        //         this.direction = 'W';
        //         this.pos.x -= 1;
        //         break;
        //     case 's':
        //         this.direction = 'S';
        //         this.pos.y += 1;
        //         break;
        //     case 'd':
        //         this.direction = 'E';
        //         this.pos.x += 1;
        //         break;
        //     default:
        //         // console.log(`Can't move with ${key}`)
        //         break;
        // }


    }
}
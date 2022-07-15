import { Coordinates } from "./coordinates.js";

export class Player {
    constructor() {

        this.icon = 'icon';
        this.direction = 'N';
        this.pos = new Coordinates();
    }

    updateDirection(dir) {
        this.direction = dir;
    }

    getPlayerDirection(dir) {

    }

    movePlayer(key) {
        switch (key) {
            case 'w':
                this.direction = 'N';
                this.pos.y -= 1;
                break;
            case 'a':
                this.direction = 'W';
                this.pos.x -= 1;
                break;
            case 's':
                this.direction = 'S';
                this.pos.y += 1;
                break;
            case 'd':
                this.direction = 'E';
                this.pos.x += 1;
                break;
            default:
                console.log(`Can't move with ${key}`)
                break;
        }


        console.log(`${this.direction}, ${this.pos.x}`)
    }
}
import { Coordinates } from "./coordinates.js";
import PlayerInfo from "./sprite/player.json" assert {type: 'json'};
import { Sprite } from "./sprite/sprite.js"
export class Player {
    constructor(keyboard) {
        this.keyboard = keyboard;

        this.icon = 'icon';
        this.dir = 'S';
        this.pos = new Coordinates();

        this.NW = this.getImage(PlayerInfo.Directions.PlayerFacingNW);
        this.N = this.getImage(PlayerInfo.Directions.PlayerFacingN);
        this.NE = this.getImage(PlayerInfo.Directions.PlayerFacingNE);
        this.W = this.getImage(PlayerInfo.Directions.PlayerFacingW);
        this.E = this.getImage(PlayerInfo.Directions.PlayerFacingE);
        this.SW = this.getImage(PlayerInfo.Directions.PlayerFacingSW);
        this.S = this.getImage(PlayerInfo.Directions.PlayerFacingS);
        this.SE = this.getImage(PlayerInfo.Directions.PlayerFacingSE);

        this.dirSprite = this.S;

        this.walkTick = 0;
    }

    getImage(dir) {
        return new Sprite(dir);
    }

    updateSpriteOrientation() {
        switch (this.dir) {
            case 'NW': this.dirSprite = this.NW; break;
            case 'N': this.dirSprite = this.N; break;
            case 'NE': this.dirSprite = this.NE; break;
            case 'W': this.dirSprite = this.W; break;
            case 'E': this.dirSprite = this.E; break;
            case 'SW': this.dirSprite = this.SW; break;
            case 'S': this.dirSprite = this.S; break;
            case 'SE': this.dirSprite = this.SE; break;
        }

    }

    movePlayer() {
        if (this.walkTick < 8) {
            this.walkTick++;
            return;
        } else {
            this.walkTick = 0;
        }

        const w = this.keyboard;
        let walkAction = 0;
        if (w.walkNorth) {
            walkAction++;
        }
        if (w.walkSouth) {
            walkAction++;
        }
        if (w.walkEast) {
            walkAction++;
        }
        if (w.walkWest) {
            walkAction++;
        }

        if (walkAction === 1) {
            //Simple walk
            if (w.walkNorth) {
                this.pos.x -= 1;
                this.pos.y -= 1;
                this.dir = 'N';
            } else if (w.walkSouth) {
                this.pos.x += 1;
                this.pos.y += 1;
                this.dir = 'S';
            } else if (w.walkEast) {
                this.pos.x += 1;
                this.pos.y -= 1;
                this.dir = 'E';
            } else if (w.walkWest) {
                this.pos.x -= 1;
                this.pos.y += 1;
                this.dir = 'W';
            }
        } else if (walkAction === 2) {
            if (w.walkNorth && w.walkEast) {
                this.pos.y -= 1;

                this.dir = 'NE';
            }
            if (w.walkNorth && w.walkWest) {
                this.pos.x -= 1;

                this.dir = 'NW';
            }
            if (w.walkSouth && w.walkEast) {
                this.pos.x += 1;
                this.dir = 'SE';
            }
            if (w.walkSouth && w.walkWest) {
                this.pos.y += 1;

                this.dir = 'SW';
            }
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
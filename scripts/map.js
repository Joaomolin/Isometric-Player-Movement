import { Tile } from "./tile.js";
import { Sprite } from "./sprite/sprite.js";
import PlayerInfo from "./sprite/player.json" assert {type: 'json'};
import { Coordinate } from "./coordinate.js";
export class Map {
    constructor(ctx, cartCtx, gridLastTile, isometric, spriteTypes, selectedTile){
        this.isoCtx = ctx;
        this.cartCtx = cartCtx;
        this.cartTileSize = 79;
        this.iso = isometric;
        this.spriteTypes = spriteTypes;
        this.selectedTile = selectedTile;
        this.floor = [];
        this.objects = [];

        this.createMap(gridLastTile);
    }


    createMap(gridLastTile){
        for (let y = 0; y < gridLastTile; y++){
            let arr = [];
            for (let x = 0; x < gridLastTile; x++){
                arr.push(new Tile(new Coordinate(x, y), new Sprite(PlayerInfo.PlayerIcon)));
            }
            this.floor.push(arr);
        }
    }

    printCartFloor(a = this.selectedTile.x, b = this.selectedTile.y){
        this.cartCtx.clearRect(0, 0, 1000, 1000);
        this.cartCtx.lineWidth = 3;

        for (let y = 0; y < 5; y++){
            for (let x = 0; x < 5; x++){
                const xCoord = a + (x - 2);
                const yCoord = b + (y - 2);
                if (xCoord >= 0 && yCoord >= 0 && xCoord < this.floor[y].length && yCoord < this.floor.length){
                    this.cartCtx.fillStyle = '#91db69';
                    if (x === 2 && y === 2) this.cartCtx.fillStyle = '#52c6ff';
                    this.cartCtx.fillRect(x * this.cartTileSize + 2, y * this.cartTileSize + 3, this.cartTileSize, this.cartTileSize); 
                    this.cartCtx.fillStyle = 'black';
                    this.cartCtx.strokeRect(x * this.cartTileSize + 2 , y * this.cartTileSize + 3, this.cartTileSize, this.cartTileSize); 
                    this.cartCtx.fillText(`${xCoord}, ${yCoord}`,10 + (x * this.tileSize),this.tileSize + (y * this.tileSize), this.tileSize, this.tileSize);
                }
            }
        }
        
    }

    printCartFloorTile(){

    }

    printIsoFloor(){
        for (let y = 0; y < this.floor.length; y++){
            for (let x = 0; x < this.floor[y].length; x++){
                this.printIsoFloorTile(x, y);
            }
        }
    }

    printIsoFloorTile(x, y) {
        const tileX = this.iso.IsoToScreenX(x - 1, y);
        const tileY = this.iso.IsoToScreenY(x, y);
        let tile = this.spriteTypes[0];
        console.log(tile)
        this.isoCtx.globalAlpha = 1;
        this.isoCtx.drawImage(
          tile.img,
          tile.imgX,
          tile.imgY,
          tile.imgW,
          tile.imgH,
          tileX,
          tileY,
          this.iso.IsoW * 2,
          this.iso.IsoH * 4
        );
      }
}
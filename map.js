import { Tile } from "./tile.js";
export class Map {
    constructor(isoCtx, cartCtx, gridLastTile, isometric, tileTypes, selectedTile){
        this.isoCtx = isoCtx;
        this.CartCtx = cartCtx;
        this.iso = isometric;
        this.tileTypes = tileTypes;
        this.selectedTile = selectedTile;
        this.floor = [];
        this.objects = [];

        this.createMap(gridLastTile);
    }


    createMap(gridLastTile){
        for (let y = 0; y < gridLastTile; y++){
            let arr = [];
            for (let x = 0; x < gridLastTile; x++){
                arr.push(0);
            }
            this.floor.push(arr);
        }
    }

    printCartFloor(a = this.selectedTile.x, b = this.selectedTile.y){
        for (let y = 0; y < 5; y++){
            for (let x = 0; x < 5; x++){
                const xCoord = a + (x - 2);
                const yCoord = b + (y - 2);
                if (xCoord >= 0 && yCoord >= 0 && xCoord < this.map.floor[y].length && yCoord < this.map.floor.length){
                    this.isoCtx.fillRect(x * this.tileSize + 2, y * this.tileSize + 3, this.tileSize, this.tileSize); 
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
        let tile = this.tileTypes[1];
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
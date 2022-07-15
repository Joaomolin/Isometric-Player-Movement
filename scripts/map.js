import { Tile } from "./tile.js";
import TilesInfo from "./sprite/tiles.json" assert { type: "json" };
import IsoConfig from "../isometricConfig.json" assert { type: "json" };
import { Coordinates as Coord } from "./coordinates.js";
export class Map {
  constructor(ctx, cartCtx, gridLastTile, isometric, selectedTile) {
    this.isoCtx = ctx;
    this.cartCtx = cartCtx;
    this.cartTileSize = 79;
    this.iso = isometric;
    this.selectedTile = selectedTile;
    this.floor = [];
    this.objects = [];

    this.createMap(gridLastTile);
  }

  createMap(gridLastTile) {
    for (let y = 0; y < gridLastTile; y++) {
      let arr = [];
      for (let x = 0; x < gridLastTile; x++) {
        arr.push(new Tile(new Coord(x, y), TilesInfo.FlatTilesBigGrass));
      }
      this.floor.push(arr);
    }
  }

  printCartFloor() {
    this.cartCtx.clearRect(0, 0, 10000, 10000);
    this.cartCtx.lineWidth = 3;

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        this.printCartFloorTile(x, y);
      }
    }
  }

  printCartFloorTile(x, y) {
    const xCoord = this.selectedTile.coord.x + (x - 2);
    const yCoord = this.selectedTile.coord.y + (y - 2);
    if (xCoord >= 0 && yCoord >= 0 && xCoord < this.floor[y].length && yCoord < this.floor.length) {
      const tile = this.floor[xCoord][yCoord];
      console.log(tile);
      this.cartCtx.fillStyle = tile.color;
      if (x === 2 && y === 2) {
        this.cartCtx.fillStyle = this.selectedTile.spriteInfo.color;
      }
      this.cartCtx.fillRect(
        x * this.cartTileSize + 2,
        y * this.cartTileSize + 3,
        this.cartTileSize,
        this.cartTileSize
      );

      this.cartCtx.strokeRect(
        x * this.cartTileSize + 2,
        y * this.cartTileSize + 3,
        this.cartTileSize,
        this.cartTileSize
      );
      this.cartCtx.fillStyle = 'black'
      this.cartCtx.fillText(`${xCoord}, ${yCoord}`, 10 + (x * this.cartTileSize),this.cartTileSize - 5 + (y * this.cartTileSize), this.cartTileSize, this.cartTileSize);

    }
  }

  printIsoFloor() {
    this.isoCtx.clearRect(0, 0, 10000, 10000);
    for (let y = 0; y < this.floor.length; y++) {
      for (let x = 0; x < this.floor[y].length; x++) {
        this.newPrintIsoFloorTile(this.floor[y][x]);
      }
    }

  }

  newPrintIsoFloorTile(tile) {
    const tileX = this.iso.IsoToScreenX(
      tile.coordinates.x - 1,
      tile.coordinates.y
    );
    const tileY = this.iso.IsoToScreenY(tile.coordinates.x, tile.coordinates.y);

    this.isoCtx.globalAlpha = 1;

    this.isoCtx.drawImage(
      tile.sprite.img,
      tile.sprite.imgX,
      tile.sprite.imgY,
      tile.sprite.imgW,
      tile.sprite.imgH,
      tileX,
      tileY,
      IsoConfig.cellWidth * 2,
      IsoConfig.cellHeight * 4
    );
  }
}

import { Tile } from "./tile.js";
import TilesInfo from "./sprite/tiles.json" assert { type: "json" };
import IsoConfig from "../isometricConfig.json" assert { type: "json" };
import { Coordinates } from "./coordinates.js";
export class Map {
  constructor(ctx, cartCtx, gridLastTile, isometric, selectedTile, player) {
    this.isoCtx = ctx;
    this.cartCtx = cartCtx;
    this.cartTileSize = 79;
    this.iso = isometric;
    this.selectedTile = selectedTile;
    this.floor = [];
    this.objects = [];
    this.playerTile = player.pos;
    this.player = player;

    this.createMap(gridLastTile);
  }

  createMap(gridLastTile) {
    for (let y = 0; y < gridLastTile; y++) {
      let arr = [];
      for (let x = 0; x < gridLastTile; x++) {
        let infoToSend = TilesInfo.FlatTilesBigGrass;
        const seed = Math.random();
        if (seed > 0.7) {
          infoToSend = TilesInfo.FlatTilesBigWater;
        }
        if (seed > 0.9) {
          infoToSend = TilesInfo.FlatTilesBigDirt;
        }

        arr.push(new Tile(new Coordinates(x, y), infoToSend));
      }
      this.floor.push(arr);
    }
  }

  printPlayer() {
    this.printIsoPlayer();
    
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
    const xCoord = Math.floor(this.player.pos.x) + (x - 2);
    const yCoord =  Math.floor(this.player.pos.y) + (y - 2);
    if (xCoord >= 0 && yCoord >= 0 && xCoord < this.floor[y].length && yCoord < this.floor.length) {
      const tile = this.floor[yCoord][xCoord];

      this.cartCtx.fillStyle = tile.color;
      
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

      if (xCoord == Math.floor(this.player.pos.x) && yCoord == Math.floor(this.player.pos.y)) { 
        // this.cartCtx.fillStyle = this.selectedTile.spriteInfo.color;
        const tile = this.selectedTile.spriteIcon;
        this.cartCtx.drawImage(
          tile.sprite.img,
          tile.sprite.imgX,
          tile.sprite.imgY,
          tile.sprite.imgW,
          tile.sprite.imgH / 2,
          x * this.cartTileSize - 5,
          y * this.cartTileSize - 10,
          IsoConfig.cellWidth * 2,
          IsoConfig.cellHeight * 4
        );
      }

      this.cartCtx.fillStyle = 'black'
      this.cartCtx.fillText(`${xCoord}, ${yCoord}`, 10 + (x * this.cartTileSize), this.cartTileSize - 5 + (y * this.cartTileSize), this.cartTileSize, this.cartTileSize);

    }
  }

  printIsoFloor() {
    this.isoCtx.clearRect(0, 0, 10000, 10000);
    for (let y = 0; y < this.floor.length; y++) {
      for (let x = 0; x < this.floor[y].length; x++) {
        this.newPrintIsoFloorTile(this.floor[x][y]);
      }
    }

  }
  printIsoPlayer() {
    this.player.updateSpriteOrientation();

    const dir = this.player.dirSprite;

    const tileX = this.iso.IsoToScreenX(
      this.playerTile.x - 1,
      this.playerTile.y
    );

    const tileY = this.iso.IsoToScreenY(this.playerTile.x, this.playerTile.y);
    this.isoCtx.drawImage(
      dir.img,
      dir.imgX,
      dir.imgY,
      dir.imgW,
      dir.imgH,
      tileX + IsoConfig.cellWidth / 2,
      tileY - IsoConfig.cellHeight * 2,
      IsoConfig.cellWidth,
      IsoConfig.cellHeight * 4
    );



  }

  newPrintIsoFloorTile(tile) {

    const tileX = this.iso.IsoToScreenX(
      tile.coordinates.x - 1,
      tile.coordinates.y
    );
    const tileY = this.iso.IsoToScreenY(tile.coordinates.x, tile.coordinates.y);

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

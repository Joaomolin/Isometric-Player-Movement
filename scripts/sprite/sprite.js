export class Sprite {
    constructor(spriteInfo) {
        const image = new Image();
        image.src = spriteInfo.src;
        this.img = image;
    
        this.imgX = spriteInfo.sheetPosX;
        this.imgY = spriteInfo.sheetPosY;
        this.imgW = spriteInfo.sheetPosWidth;
        this.imgH = spriteInfo.sheetPosHeight;
    }
}
import { BlockData } from './Data/BlockData';
import { Sprite } from 'pixi.js';

export class Block {

    public blockData: BlockData;

    public sprite: Sprite;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    constructor(blockData: BlockData, x: number, y: number, width: number, height: number) {

        this.blockData = blockData;

        this.sprite = new Sprite(this.blockData.texture);

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.sprite.width = this.width;
        this.sprite.height = this.width;
    }
}
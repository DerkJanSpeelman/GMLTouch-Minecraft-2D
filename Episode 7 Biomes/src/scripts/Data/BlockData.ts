import { Texture } from 'pixi.js';


export class BlockData {

    public name: string;
    public texture: Texture;

    constructor(blockData: { name: string, img: string }) {

        this.name = blockData.name;

        const img = require('../../' + blockData.img);
        this.texture = Texture.from(img);
    }
}
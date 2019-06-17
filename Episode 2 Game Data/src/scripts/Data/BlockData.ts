import { Texture } from 'pixi.js';

export class BlockData {

    public name: string;
    public img: Texture;
    
    constructor(blockData: { name: string, img: string }) {

        this.name = blockData.name;
        this.img = Texture.from(blockData.img);
    }
}
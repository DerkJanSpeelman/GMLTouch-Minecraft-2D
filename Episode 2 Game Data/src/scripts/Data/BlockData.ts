import { Texture } from "pixi.js";

export class BlockData {

    public name: string;
    public img: Texture;

    constructor(blockData: { name: string, img: Texture }) {
        
        this.name = blockData.name;
        this.img = blockData.img;
    }
}
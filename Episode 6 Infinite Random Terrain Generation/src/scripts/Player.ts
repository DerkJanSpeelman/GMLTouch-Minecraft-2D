import { Sprite, Texture } from "pixi.js";

export class Player {

    public sprite: Sprite;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number) {

        this.sprite = new Sprite(Texture.from('src/assets/textures/blocks/dirt.png'));

        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.sprite.width = width;
        this.sprite.height = height;
    }
}
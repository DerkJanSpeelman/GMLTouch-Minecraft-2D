import * as PIXI from 'pixi.js';

export class Game {

    private container: HTMLElement | null = null;

    public app: PIXI.Application;

    constructor() {

        this.container = document.querySelector('.game-container');

        if (this.container === null) {

            this.container = document.body;
        }
        
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        this.app = new PIXI.Application({
            transparent: true,
            resizeTo: this.container,
        });

        this.container.prepend(this.app.view);

        var texture = PIXI.Texture.from('src/assets/textures/blocks/dirt.png'),
            sprite = new PIXI.Sprite(texture);
        
        sprite.x = 50;
        sprite.y = 50;

        sprite.width = 200;
        sprite.height = 200;

        this.app.stage.addChild(sprite);
    }
}
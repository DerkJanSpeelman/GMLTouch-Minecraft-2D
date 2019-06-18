import { Application } from "pixi.js";
import { GameData } from "./Data/GameData";
import { Player } from "./Player";
import { View } from "./View";

export class World {

    public app: Application;
    public gameData: GameData;

    public player: Player;
    public view: View;

    constructor(app: Application) {

        this.app = app;
        this.gameData = new GameData();

        this.player = new Player(0, 0, this.gameData.blockSize, this.gameData.blockSize * 2);
        this.app.stage.addChild(this.player.sprite);
        this.view = new View(0, 0, this.app.view.width, this.app.view.height);

        window.onresize = this.resize;
        
        this.app.ticker.add(this.update);
    }

    private update = (): void => {

        let bs: number = this.gameData.blockSize,
            view: View = this.view,
            player: Player = this.player;

        this.view.x = (player.x * bs) + (player.width / 2) - (view.width / 2);
        this.view.y = (player.y * bs) + (player.height / 2) - (view.height / 2);

        this.player.sprite.x = (player.x * bs) - view.x;
        this.player.sprite.y = (player.y * bs) - view.y;

        this.player.x++;
    }

    private resize = (): void => {
        
        this.view.width = this.app.view.width;
        this.view.height = this.app.view.height;
    }
}
import { Application } from "pixi.js";
import { GameData } from "./Data/GameData";
import { Player } from "./Player";
import { View } from "./View";
import { Chunk } from "./Chunk";
import { Block } from "./Block";

export class World {

    public app: Application;
    public gameData: GameData;

    public player: Player;
    public view: View;

    public chunkMap: {[key: string]: Chunk} = {};

    constructor(app: Application) {

        this.app = app;
        this.gameData = new GameData();

        this.player = new Player(0, 0, this.gameData.blockSize, this.gameData.blockSize * 2);
        this.app.stage.addChild(this.player.sprite);
        this.view = new View(0, 0, this.app.view.width, this.app.view.height);

        window.onresize = this.resize;
        
        this.app.ticker.add(this.update);
    }

    private renderChunks = (): void => {

        let data: GameData = this.gameData,
            renderDist: number = data.renderDistance,
            playerChunkX: number = Math.round(this.player.x / data.chunkSize.width),
            playerChunkY: number = Math.round(this.player.y / data.chunkSize.height);

        for (let x = playerChunkX - renderDist; x < playerChunkX + renderDist; x++) {
            for (let y = playerChunkY - renderDist; y < playerChunkY + renderDist; y++) {
                
                if (this.chunkMap[x + ',' + y] === undefined) {

                    const chunk: Chunk = new Chunk(data, x, y);
                    this.chunkMap[x + ',' + y] = chunk;

                    for (const key in chunk.blockMap) {
                        if (chunk.blockMap.hasOwnProperty(key)) {

                            const block = chunk.blockMap[key];
                            this.app.stage.addChild(block.sprite);
                        }
                    }
                }
            }
        }
    }

    private drawBlocks = (): void => {

        for (const c in this.chunkMap) {
            if (this.chunkMap.hasOwnProperty(c)) {

                const chunk: Chunk = this.chunkMap[c];
                
                for (const b in chunk.blockMap) {
                    if (chunk.blockMap.hasOwnProperty(b)) {

                        const block: Block = chunk.blockMap[b];
                        
                        block.sprite.x = (block.x * this.gameData.blockSize) - this.view.x;
                        block.sprite.y = (block.y * this.gameData.blockSize * -1) - this.view.y;
                    }
                }
            }
        }
    }

    private update = (): void => {

        let bs: number = this.gameData.blockSize,
            view: View = this.view,
            player: Player = this.player;

        this.view.x = (player.x * bs) + (player.width / 2) - (view.width / 2);
        this.view.y = (player.y * bs * -1) + (player.height / 2) - (view.height / 2);

        this.player.sprite.x = (player.x * bs) - view.x;
        this.player.sprite.y = (player.y * bs * -1) - view.y;

        this.renderChunks();

        this.drawBlocks();
    }

    private resize = (): void => {
        
        this.view.width = this.app.view.width;
        this.view.height = this.app.view.height;
    }
}
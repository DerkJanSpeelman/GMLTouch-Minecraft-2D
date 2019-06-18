import { GameData } from './Data/GameData';
import { Block } from './Block';

export class Chunk {

    public gameData: GameData;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public blockMap: {[key: string]: Block} = {};

    constructor(gameData: GameData, x: number, y: number) {

        this.gameData = gameData;

        this.x = x;
        this.y = y;

        this.width = this.gameData.chunkSize.width;
        this.height = this.gameData.chunkSize.height;

        this.createBlock('dirt', x * this.width, y * this.width);
    }

    private createBlock = (name: string, x: number, y: number): void => {

        if (name in this.gameData.blocks) {

            const block: Block = new Block(this.gameData.blocks[name], x, y, this.gameData.blockSize, this.gameData.blockSize);
            this.blockMap[x + ',' + y] = block;
        }
    }
}
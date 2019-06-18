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

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {

                const X: number = x + this.x * this.width,
                      Y: number = y + this.y * this.height;
                
                let blockName: string = 'stone';

                if (Y > 62 - 5 && Y < 62) {
                    blockName = 'dirt';
                }
                if (Y == 62) {
                    blockName = 'grass_block';
                }

                if (Y >= 0 && Y <= 62) {

                    this.createBlock(blockName, X, Y);
                }
            }
        }
    }

    private createBlock = (name: string, x: number, y: number): void => {

        if (name in this.gameData.blocks) {

            const block: Block = new Block(this.gameData.blocks[name], x, y, this.gameData.blockSize, this.gameData.blockSize);
            this.blockMap[x + ',' + y] = block;
        }
    }

    public delete = (): void => {
        for (const key in this.blockMap) {
            if (this.blockMap.hasOwnProperty(key)) {

                this.blockMap[key].sprite.destroy();
            }
        }
    }
}
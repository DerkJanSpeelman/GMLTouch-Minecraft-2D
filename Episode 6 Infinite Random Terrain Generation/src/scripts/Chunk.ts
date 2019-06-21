import { GameData } from './Data/GameData';
import { PRNG } from './PRNG';
import { Noise } from './Noise';
import { Block } from './Block';

export class Chunk {

    public gameData: GameData;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public blockMap: {[key: string]: Block} = {};

    private prng: PRNG;

    public heightMap: number[] = [];

    constructor(gameData: GameData, prng: PRNG, x: number, y: number) {

        this.prng = prng;

        this.gameData = gameData;

        this.x = x;
        this.y = y;

        this.width = this.gameData.chunkSize.width;
        this.height = this.gameData.chunkSize.height;

        this.heightMap = Noise.heightMap(this.width, this.x * this.width, 123, 30, 2, .5, 2);

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {

                let height: number = Math.round(this.heightMap[x] * 10) + 62;

                const X: number = x + this.x * this.width,
                      Y: number = y + this.y * this.height;
                
                let blockName: string = 'stone';

                if (Y > height - 5 && Y < height) {
                    blockName = 'dirt';
                }

                if (Y > height - 7 && Y <= height - 5) {
                    if (this.prng.next() > .5) {
                        blockName = 'dirt';
                    }
                }

                if (Y === 2 && this.prng.next() < .25) {
                    blockName = 'bedrock';
                }
                if (Y === 1 && this.prng.next() < .75) {
                    blockName = 'bedrock';
                }
                if (Y === 0) {
                    blockName = 'bedrock';
                }

                if (Y == height) {
                    blockName = 'grass_block';
                }

                if (Y >= 0 && Y <= height) {

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
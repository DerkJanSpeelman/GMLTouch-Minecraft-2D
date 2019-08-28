import { World } from './World';
import { PRNG } from './PRNG';
import { Terrain } from './Terrain';
import { Block } from './Block';

export class Chunk {

    public world: World;

    private prng: PRNG;

    public x: number;
    public y: number;

    public width: number;
    public height: number;

    public blockMap: {[key: string]: Block} = {};
    public heightMap: number[] = [];

    constructor(world: World, prng: PRNG, x: number, y: number) {

        this.world = world;;

        this.prng = prng;

        this.x = x;
        this.y = y;

        this.width = this.world.gameData.chunkSize.width;
        this.height = this.world.gameData.chunkSize.height;

        this.heightMap = Terrain.heightMap(this.width, this.x * this.width, 123, 30, 2, .5, 2);
        console.log(Terrain.heightMap(this.width, this.x * this.width, 123, 333, 2, .5, 2));

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

        if (name in this.world.gameData.blocks) {

            const block: Block = new Block(this.world.gameData.blocks[name], x, y, this.world.gameData.blockSize, this.world.gameData.blockSize);
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
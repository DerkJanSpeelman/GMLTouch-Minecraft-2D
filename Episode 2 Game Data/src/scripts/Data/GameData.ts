import { Texture } from 'pixi.js';
import { BlockData } from './BlockData';

import gameDataJSON from '../../data/gamedata.json';
import blockDataJSON from '../../data/blockdata.json';

export class GameData {

    public blocks: {[key: string]: BlockData} = {};

    public blockSize: number;
    public renderDistance: number;
    public chunkSize: {
        width: number,
        height: number,
    }

    constructor() {

        let gameData: any = (<any>gameDataJSON),
            blockData: any = (<any>blockDataJSON);

        this.blockSize = gameData.blockSize;
        this.renderDistance = gameData.renderDistance;
        this.chunkSize = gameData.chunkSize;

        for (let key in blockData) {

            if (blockData.hasOwnProperty(key)) {
                blockData[key].img = Texture.from(blockData[key].img);
                this.blocks[key] = new BlockData(blockData[key]);
            }
        }
    }
}
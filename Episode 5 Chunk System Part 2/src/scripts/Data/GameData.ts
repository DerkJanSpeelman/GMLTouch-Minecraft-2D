import { BlockData } from './BlockData';

import gameDataJSON from '../../data/gamedata.json';
import blockDataJSON from '../../data/blockdata.json';

export class GameData {

    public blocks: {[key: string]: BlockData} = {};

    public blockSize: number;
    public renderDistance: number;
    public chunkSize:  {
        width: number,
        height: number
    }

    constructor() {

        let gameData: any = (<any>gameDataJSON);

        this.blockSize = gameData.blockSize;
        this.renderDistance = gameData.renderDistance;
        this.chunkSize = gameData.chunkSize;

        let blockData: any = (<any>blockDataJSON);

        for (let key in blockData) {
            this.blocks[key] = new BlockData(blockData[key]);
        }
    }
}
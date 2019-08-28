import { BlockData } from './BlockData';
import { BiomeData } from './BiomeData';

import gameDataJSON from '../../data/gamedata.json';
import blockDataJSON from '../../data/blockdata.json';
import biomeDataJSON from '../../data/biomedata.json';

export class GameData {
    public blockSize: number;
    public renderDistance: number;
    public chunkSize:  {
        width: number,
        height: number
    }

    public blocks: {[key: string]: BlockData} = {};
    public biomes: {[key: string]: BiomeData} = {};

    protected dataClasses: any = {
        BlockData,
        BiomeData
    };

    constructor() {
        let gameData: any = (<any>gameDataJSON);

        this.blockSize = gameData.blockSize;
        this.renderDistance = gameData.renderDistance;
        this.chunkSize = gameData.chunkSize;

        this.setData(this.blocks, blockDataJSON, 'BlockData');
        this.setData(this.biomes, biomeDataJSON, 'BiomeData');
    }

    private setData = (array: any, json: any, className: string): void => {
        let data: any = (<any>json);

        for (let key in data) {
            array[key] = new this.dataClasses[className](data[key]);
        }

        if (className === 'BiomeData') {

            console.log(data);

            let dataSort: {[key: string]: BiomeData} = {};

            Object.keys(data).sort((a, b): number => {
                if(data[a].temperature < data[b].temperature) { return -1; }
                if(data[a].temperature > data[b].temperature) { return 1; }
                return 0;
            }).forEach(function(key) {
                const element = data[key];
                if (element.overworld && element.category !== 'Ocean') {
                    dataSort[key] = data[key];
                }
            });

            for (const key in dataSort) {
                if (dataSort.hasOwnProperty(key)) {
                    const element = dataSort[key];
                    console.log(element.temperature, key);console.log(element.category);
                }
            }
            // console.log(JSON.stringify(dataSort));
        }
    }
}
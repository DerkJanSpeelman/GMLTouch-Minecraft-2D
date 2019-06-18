import { GameData } from "./Data/GameData";

export class World {

    public gameData: GameData;

    constructor() {

        this.gameData = new GameData();

        console.log(this.gameData.blocks.dirt);
    }
}
export class BiomeData {

    public id: number;
    public name: string;
    public temperature: number;
    public category: string;
    public overworld: boolean | null;

    constructor(biomeData: {
        id: number,
        name: string,
        temperature: number,
        category: string,
        overworld: boolean | null
    }) {
        this.id = biomeData.id;
        this.name = biomeData.name;
        this.temperature = biomeData.temperature;
        this.category = biomeData.category;
        this.overworld = biomeData.overworld;
    }
}
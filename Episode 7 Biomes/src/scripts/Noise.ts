import { Perlin } from "./Perlin";

export class Noise {

    public static heightMap = (
        width: number,
        offset: number,
        seed: number,
        scale: number,
        octaves: number,
        persistence: number,
        lacunarity: number
    ): number[] => {

        let map: number[] = [];

        if (scale <= 0) scale = 0.001;

        for (let x: number = 0; x < width; x++) {
            
            let height: number = 0,
                frequency: number = 1,
                amplitude: number = 1;
            
            for (let i: number = 0; i < octaves; i++) {

                const X: number = (x + offset) / scale * frequency;
                
                height += Perlin.noise(seed, X) * amplitude;

                amplitude *= persistence;
                frequency *= lacunarity;
            }

            map[x] = height;
        }

        return map;
    }
}

/**
 * 
 * A non-binary JavaScript version of Lehmer's random number generator (1998)
 * with extra possibilities for shifting the seed for "more randomness"
 * and getting a random number between two points.
 * 
 * https://en.wikipedia.org/wiki/Lehmer_random_number_generator
 * 
 */
export class PRNG {

    public seed: number;

    public m: number;
    public a: number;

    constructor(seed?: number | string) {

        this.m = 2147483647;
        this.a = 16807;

        let s: number;

        if (seed === undefined) {
            
            s = this.calc(Math.random());

        } else {
            
            if (typeof seed === 'string') {

                let n: number = 0;

                for (let i = 0; i < seed.length; i++) {
                    
                    n += seed.charCodeAt(i);
                }

                s = this.calc(n);

            } else {

                s = seed;
            }
        }

        this.seed = s % this.m;

        if (this.seed <= 0) this.seed += this.m - 1;

        this.shift();
    }

    public readonly calc: ((
        n: number
    ) => number) = (
        n: number
    ): number => {

        return Math.round(n * this.m - 1);
    }

    public readonly shift: (() => void) = (): void => {

        this.seed = this.seed * this.a % this.m;
    }

    public readonly next: ((
        minOrMax?: number,
        max?: number
    ) => number ) = (
        minOrMax?: number,
        max?: number
    ): number => {

        this.shift();

        let min: number | undefined = minOrMax;

        if (min === undefined) min = 0;

        if (max === undefined) {

            max = min;
            min = 0;
        }

        if (min === 0 || (max === undefined || max === 0 || max === 1)) {

            return this.seed / this.m;
        }

        if (min === max) return this.seed / this.m + min;

        if (min > max) {

            minOrMax = max;
            max = min;
            min = minOrMax;
        }

        return (this.seed / this.m) * (max - min) + min;
    }
}

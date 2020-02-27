/**
 * 
 * A non-binary JavaScript version of Lehmer's random number generator (1998)
 * with extra possibilities for shifting the seed for "more randomness"
 * and getting a random number between two points.
 * 
 * https://en.wikipedia.org/wiki/Lehmer_random_number_generator
 * 
 */

/**
 * @exports
 * @class PRNG
 */
export class PRNG {

    public seed: number;

    public m: number;
    public a: number;

    /**
     * Creates a PRNG instance
     * 
     * @param {number | string | undefined} seed
     */
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

    /**
     * Calculates a "random" number based on its input
     * 
     * @public
     * @readonly
     * 
     * @param   {number} n
     * @returns {number} Math.round( n * this.m - 1 )
     */
    public readonly calc: ((
        n: number
    ) => number) = (
        n: number
    ): number => {
        return Math.round(n * this.m - 1);
    }

    /**
     * Shifts the seed to a different seed.
     * 
     * @public
     * @readonly
     * @void
     */
    public readonly shift: (() => void) = (): void => {
        this.seed = this.seed * this.a % this.m;
    }

    /**
     * Shifts the seed to a different seed.
     * 
     * @public
     * @readonly
     * @param {number | undefined} minOrMax
     * @returns {number | undefined}
     */
    public readonly next: ((
        minOrMax?: number,
        max?: number
    ) => number ) = (
        minOrMax?: number,
        max?: number
    ): number => {
        this.shift();

        let min: number | undefined = minOrMax;

        if (min === undefined) {
            min = 0;
        }

        if (max === undefined) {
            max = min;
            min = 0;
        }

        if (min === 0 || (max === undefined || max === 0 || max === 1)) {
            return this.seed / this.m;
        }

        if (min === max){
            return this.seed / this.m + min;
        }

        if (min > max) {
            minOrMax = max;
            max = min;
            min = minOrMax;
        }

        return (this.seed / this.m) * (max - min) + min;
    }
}

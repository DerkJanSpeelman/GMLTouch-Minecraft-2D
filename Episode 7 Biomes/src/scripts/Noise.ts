class Grad {
    private x: number
    private y: number
    private z: number

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public dot1 = (x: number): number => {
        return this.x * x;
    }

    public dot2 = (x: number, y: number): number => {
        return this.dot1(x) + this.y * y;
    }

    public dot3 = (x: number, y: number, z: number): number => {
        return this.dot2(x, y) + this.z * z;
    }
}

export class Noise {
    private static p: number[] = [ 151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180 ];
    public static perm: number[] = new Array(512);
    public static gradP: Grad[] = new Array(512);

    private static grad3: Grad[] = [
        new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
        new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
        new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)
    ];

    public static perlin2 = (seed: number, x: number, y: number): number => {
        let perm: number[] = Noise.perm;
        let gradP: Grad[] = Noise.gradP;

        if (seed > 0 && seed < 1) {
            seed *= 65536;
        }

        seed = Math.floor(seed);
        if(seed < 256) {
            seed |= seed << 8;
        }

        for(var i = 0; i < 256; i++) {
            var v;
            if (i & 1) {
                v = Noise.p[i] ^ (seed & 255);
            } else {
                v = Noise.p[i] ^ ((seed>>8) & 255);
            }

            perm[i] = perm[i + 256] = v;
            gradP[i] = gradP[i + 256] = Noise.grad3[v % 12];
        }

        let X: number = Math.floor(x);
        let Y: number = Math.floor(y);

        x = x - X;
        y = y - Y;

        X = X & 255;
        Y = Y & 255;

        const n00: number = gradP[X +     perm[Y    ]].dot2(x,     y    );
        const n01: number = gradP[X +     perm[Y + 1]].dot2(x,     y - 1);
        const n10: number = gradP[X + 1 + perm[Y    ]].dot2(x - 1, y    );
        const n11: number = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);

        const u: number = Noise.fade(x);

        return Noise.lerp(
                Noise.lerp(n00, n10, u),
                Noise.lerp(n01, n11, u),
            Noise.fade(y));
    }

    private static fade = (t: number): number => {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    private static lerp = (a: number, b: number, t: number): number => {
        return (1 - t) * a + t * b;
    }
}
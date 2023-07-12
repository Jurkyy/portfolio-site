interface Gradient {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

class ClassicalNoise {
  private readonly grad3: Gradient[] = [
    { x: 1, y: 1, z: 0 }, { x: -1, y: 1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: -1, y: -1, z: 0 },
    { x: 1, y: 0, z: 1 }, { x: -1, y: 0, z: 1 }, { x: 1, y: 0, z: -1 }, { x: -1, y: 0, z: -1 },
    { x: 0, y: 1, z: 1 }, { x: 0, y: -1, z: 1 }, { x: 0, y: 1, z: -1 }, { x: 0, y: -1, z: -1 }
  ];
  private readonly p: number[] = [];
  private readonly perm: number[] = [];

  constructor() {
    const r = Math;

    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(r.random() * 256);
    }

    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  private dot(g: Gradient, x: number, y: number, z: number): number {
    return g.x * x + g.y * y + g.z * z;
  }

  private mix(a: number, b: number, t: number): number {
    return (1.0 - t) * a + t * b;
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }

  public noise(x: number, y: number, z: number): number {
    let X = Math.floor(x);
    let Y = Math.floor(y);
    let Z = Math.floor(z);

    x -= X;
    y -= Y;
    z -= Z;

    X = X & 255;
    Y = Y & 255;
    Z = Z & 255;

    const gi000 = this.perm[X + this.perm[Y + this.perm[Z]]] % 12;
    const gi001 = this.perm[X + this.perm[Y + this.perm[Z + 1]]] % 12;
    const gi010 = this.perm[X + this.perm[Y + 1 + this.perm[Z]]] % 12;
    const gi011 = this.perm[X + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;
    const gi100 = this.perm[X + 1 + this.perm[Y + this.perm[Z]]] % 12;
    const gi101 = this.perm[X + 1 + this.perm[Y + this.perm[Z + 1]]] % 12;
    const gi110 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z]]] % 12;
    const gi111 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;

    const n000 = this.dot(this.grad3[gi000], x, y, z);
    const n100 = this.dot(this.grad3[gi100], x - 1, y, z);
    const n010 = this.dot(this.grad3[gi010], x, y - 1, z);
    const n110 = this.dot(this.grad3[gi110], x - 1, y - 1, z);
    const n001 = this.dot(this.grad3[gi001], x, y, z - 1);
    const n101 = this.dot(this.grad3[gi101], x - 1, y, z - 1);
    const n011 = this.dot(this.grad3[gi011], x, y - 1, z - 1);
    const n111 = this.dot(this.grad3[gi111], x - 1, y - 1, z - 1);

    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);

    const nx00 = this.mix(n000, n100, u);
    const nx01 = this.mix(n001, n101, u);
    const nx10 = this.mix(n010, n110, u);
    const nx11 = this.mix(n011, n111, u);

    const nxy0 = this.mix(nx00, nx10, v);
    const nxy1 = this.mix(nx01, nx11, v);

    const nxyz = this.mix(nxy0, nxy1, w);

    return nxyz;
  }
}

const canvas = document.getElementById('waves') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const perlin = new ClassicalNoise();
const variation = 0.001;
const amp = 750;
const maxLines = 48;
const speed = 0.001; // Increased speed
const variators: number[] = [];
const color = "147, 21, 255"; // Updated color
let canvasWidth: number;
let canvasHeight: number;
let startY: number;

for (let i = 0, u = 0; i < maxLines; i++, u += 0.016) {
  variators[i] = u;
}

let resolution = 10;
let increment = 10;

function draw() {
  let y: number = 0;
  for (let i = 0; i <= maxLines; i++) {
    ctx.beginPath();
    ctx.moveTo(0, startY);

    for (let x = 0; x <= canvasWidth; x += resolution) {
      y = perlin.noise(x * variation + variators[i], x * variation, 0);
      ctx.lineTo(x, startY + amp * y);
    }

    const alpha = Math.min(Math.abs(y), 0.8) + 0.1;
    ctx.strokeStyle = `rgba(${color}, ${alpha})`;
    ctx.stroke();
    ctx.closePath();

    variators[i] += speed;
  }

  resolution += increment;
  if (resolution > 1) {
    increment = 0;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  draw();
  requestAnimationFrame(animate);
}

function resizeCanvas() {
  canvasWidth = document.documentElement.clientWidth;
  canvasHeight = document.documentElement.clientHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  startY = canvasHeight / 2;
}

(function init() {
  resizeCanvas();
  animate();
  window.addEventListener('resize', resizeCanvas);
})();


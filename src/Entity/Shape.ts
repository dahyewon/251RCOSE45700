export interface Shape {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  draw(ctx: CanvasRenderingContext2D | null): void;
  //TODO: move, resize 추가
  move(dx: number, dy: number): void;
  //resize(w: number, h:number)
}

export class Rectangle implements Shape {
  constructor(
    public id: number,
    public startX: number,
    public startY: number,
    public endX: number,
    public endY: number,
    public color: string
  ) {}

  get width(): number {
    return this.endX - this.startX;
  }

  get height(): number {
    return this.endY - this.startY;
  }

  get centerX(): number {
    return (this.endX + this.startX) / 2;
  }

  get centerY(): number {
    return (this.endY + this.startY) / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error("context is null");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.startX, this.startY, this.width, this.height);
  }

  move(dx: number, dy: number): void {
    this.startX += dx;
    this.startY += dy;
    this.endX += dx;
    this.endY += dy;
  }
}

export class Ellipse implements Shape {
  constructor(
    public id: number,
    public startX: number,
    public startY: number,
    public endX: number,
    public endY: number,
    public color: string
  ) {}

  get centerX(): number {
    return (this.endX + this.startX) / 2;
  }

  get centerY(): number {
    return (this.endY + this.startY) / 2;
  }

  get radiusX(): number {
    return Math.abs(this.endX - this.startX) / 2;
  }

  get radiusY(): number {
    return Math.abs(this.endY - this.startY) / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(
      this.centerX,
      this.centerY,
      this.radiusX,
      this.radiusY,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  move(dx: number, dy: number): void {
    this.startX += dx;
    this.startY += dy;
    this.endX += dx;
    this.endY += dy;
  }
}

//TODO: image, line 추가

export interface Shape {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  draw(ctx: CanvasRenderingContext2D | null): void;
  //TODO: move, resize 추가
  move(dx: number, dy: number): void;
  getResizeHandles(): { x: number; y: number; cursor: string }[];
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

  getResizeHandles(): { x: number; y: number; cursor: string }[] {
    return [
      { x: this.startX, y: this.startY, cursor: "nwse-resize" }, // top-left
      { x: this.endX, y: this.startY, cursor: "nesw-resize" }, // top-right
      { x: this.endX, y: this.endY, cursor: "nwse-resize" }, // bottom-right
      { x: this.startX, y: this.endY, cursor: "nesw-resize" }, // bottom-left
    ];
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
  getResizeHandles(): { x: number; y: number; cursor: string }[] {
    return [
      { x: this.startX, y: this.startY, cursor: "nwse-resize" }, // top-left
      { x: this.endX, y: this.startY, cursor: "nesw-resize" }, // top-right
      { x: this.endX, y: this.endY, cursor: "nwse-resize" }, // bottom-right
      { x: this.startX, y: this.endY, cursor: "nesw-resize" }, // bottom-left
    ];
  }
}

export class Line implements Shape {
  constructor(
    public id: number,
    public startX: number,
    public startY: number,
    public endX: number,
    public endY: number,
    public color: string,
    public lineWidth: number = 1
  ) {}

  get dx(): number {
    return this.endX - this.startX;
  }

  get dy(): number {
    return this.endY - this.startY;
  }

  get length(): number {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!ctx) throw new Error("context is null");
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  }

  move(dx: number, dy: number): void {
    this.startX += dx;
    this.startY += dy;
    this.endX += dx;
    this.endY += dy;
  }

  getResizeHandles(): { x: number; y: number; cursor: string }[] {
    return [
      { x: this.startX, y: this.startY, cursor: "nwse-resize" }, // top-left
      { x: this.endX, y: this.startY, cursor: "nesw-resize" }, // top-right
      { x: this.endX, y: this.endY, cursor: "nwse-resize" }, // bottom-right
      { x: this.startX, y: this.endY, cursor: "nesw-resize" }, // bottom-left
    ];
  }
}

//TODO: image 추가

import { Shape, Property } from "./Shape";

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

  getResizeHandles(): { x: number; y: number; pos: string }[] {
    return [
      { x: this.startX - 5, y: this.startY - 5, pos: "top-left" }, // top-left
      { x: this.endX - 5, y: this.startY - 5, pos: "top-right" }, // top-right
      { x: this.endX - 5, y: this.endY - 5, pos: "bottom-right" }, // bottom-right
      { x: this.startX - 5, y: this.endY - 5, pos: "bottom-left" }, // bottom-left
    ];
  }

  resize(dx: number, dy: number, pos: string): void {
    switch (pos) {
      case "top-left":
        this.startX += dx;
        this.startY += dy;
        break;
      case "top-right":
        this.endX += dx;
        this.startY += dy;
        break;
      case "bottom-right":
        this.endX += dx;
        this.endY += dy;
        break;
      case "bottom-left":
        this.startX += dx;
        this.endY += dy;
        break;
    }
  }

  isPointInside(x: number, y: number): boolean {
    return (
      x >= Math.min(this.startX, this.endX) &&
      x <= Math.max(this.startX, this.endX) &&
      y >= Math.min(this.startY, this.endY) &&
      y <= Math.max(this.startY, this.endY)
    );
  }

  getProperties(): Property[] {
    return [
      {
        name: "가로 위치",
        value: this.centerX,
        editable: true,
      },
      {
        name: "세로 위치",
        value: this.centerY,
        editable: true,
      },
      { name: "높이", value: this.height, editable: true },
      { name: "너비", value: this.width, editable: true },
      { name: "색", value: this.color, editable: true },
    ];
  }

  setProperties(name: string, value: any): void {
    switch (name) {
      case "가로 위치":
        const newX = Number(value);
        const width = this.width;
        this.startX = newX - width / 2;
        this.endX = newX + width / 2;
        break;
      case "세로 위치":
        const newY = Number(value);
        const height = this.height;
        this.startY = newY - height / 2;
        this.endY = newY + height / 2;
        break;
      case "높이":
        const centerY = this.centerY;
        this.startY = centerY - Number(value) / 2;
        this.endY = centerY + Number(value) / 2;
        break;
      case "너비":
        const centerX = this.centerX;
        this.startX = centerX - Number(value) / 2;
        this.endX = centerX + Number(value) / 2;
        break;
      case "색":
        this.color = value.toString();
        break;
      default:
        throw new Error("Invalid property name");
    }
  }
}

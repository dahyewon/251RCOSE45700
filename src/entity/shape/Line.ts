import { Shape, Property } from "./Shape";

export class Line implements Shape {
  private color = "#000000";
  private lineWidth: number = 1;
  constructor(
    public id: number,
    public startX: number,
    public startY: number,
    public endX: number,
    public endY: number
  ) {
    this.color = "#000000";
    this.lineWidth = 1;
  }

  get dx(): number {
    return this.endX - this.startX;
  }

  get dy(): number {
    return this.endY - this.startY;
  }

  get length(): number {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  get centerX(): number {
    return (this.startX + this.endX) / 2;
  }
  get centerY(): number {
    return (this.startY + this.endY) / 2;
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

  getResizeHandles(): { x: number; y: number; pos: string }[] {
    return [
      { x: this.startX - 5, y: this.startY - 5, pos: "top-left" }, // starting point
      { x: this.endX - 5, y: this.endY - 5, pos: "bottom-right" }, // ending point
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

  isPointInside(x: number, y: number, tolerance: number = 5): boolean {
    // 직선의 방정식 ax + by + c = 0
    const a = this.endY - this.startY; // dy
    const b = this.startX - this.endX; // -dx
    const c = this.endX * this.startY - this.startX * this.endY; // 상수항

    // 점과 직선 사이의 거리 공식
    const distance = Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);

    // 점이 선의 범위 있는지 확인
    const withinBounds =
      x >= Math.min(this.startX, this.endX) - tolerance &&
      x <= Math.max(this.startX, this.endX) + tolerance &&
      y >= Math.min(this.startY, this.endY) - tolerance &&
      y <= Math.max(this.startY, this.endY) + tolerance;

    // 점이 "직선"과 가까운지
    // 선 박스 내에 있는지
    return distance <= tolerance && withinBounds;
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
      { name: "길이", value: Math.round(this.length), editable: true },
      { name: "선 굵기", value: this.lineWidth, editable: true },
      { name: "색", value: this.color, editable: true },
    ];
  }

  setProperties(name: string, value: number): void {
    switch (name) {
      case "가로 위치":
        const width = this.dx;
        const newX = Number(value);
        this.startX = newX - width / 2;
        this.endX = newX + width / 2;
        break;
      case "세로 위치":
        const height = this.dy;
        const newY = Number(value);
        this.startY = newY - height / 2;
        this.endY = newY + height / 2;
        break;
      case "길이":
        const centerX = this.centerX;
        const centerY = this.centerY;
        const newLength = Number(value);
        const angle = Math.atan2(this.dy, this.dx);
        this.startX = centerX - (newLength / 2) * Math.cos(angle);
        this.startY = centerY - (newLength / 2) * Math.sin(angle);
        this.endX = centerX + (newLength / 2) * Math.cos(angle);
        this.endY = centerY + (newLength / 2) * Math.sin(angle);

        break;
      case "선 굵기":
        this.lineWidth = Number(value);
        break;
      case "색":
        this.color = value.toString();
        break;
      default:
        throw new Error("Invalid property name");
    }
  }
}

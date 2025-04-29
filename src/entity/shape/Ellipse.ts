import { Shape, Property } from "./Shape";

export class Ellipse implements Shape {
  private borderWidth: number = 0;
  private borderColor: string = "#000000";
  private color: string = "#000000";

  private shadowColor: string = "#000000";
  private shadowOffsetX: number = 0;
  private shadowOffsetY: number = 0;
  private shadowBlur: number = 0;

  constructor(
    public id: number,
    public startX: number,
    public startY: number,
    public endX: number,
    public endY: number
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

  get shadowAngle(): number {
    return Math.atan2(this.shadowOffsetY, this.shadowOffsetX);
  }

  get shadowRadius(): number {
    return Math.round(
      Math.sqrt(
        this.shadowOffsetX * this.shadowOffsetX +
          this.shadowOffsetY * this.shadowOffsetY
      )
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = this.borderWidth;

    this.setShadow(ctx);
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
    ctx.closePath();

    if (this.borderWidth > 0) {
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
      ctx.stroke();
      ctx.closePath();
    }
  }

  setShadow(ctx: CanvasRenderingContext2D): void {
    ctx.shadowColor = this.shadowColor;
    ctx.shadowOffsetX = this.shadowOffsetX;
    ctx.shadowOffsetY = this.shadowOffsetY;
    ctx.shadowBlur = this.shadowBlur;
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
    const centerX = this.centerX;
    const centerY = this.centerY;
    const radiusX = this.radiusX;
    const radiusY = this.radiusY;

    // 타원의 방정식
    return (
      Math.pow(x - centerX, 2) / Math.pow(radiusX, 2) +
        Math.pow(y - centerY, 2) / Math.pow(radiusY, 2) <=
      1
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
      { name: "높이", value: this.radiusY * 2, editable: true },
      { name: "너비", value: this.radiusX * 2, editable: true },
      { name: "색", value: this.color, editable: true },
      { name: "테두리 굵기", value: this.borderWidth, editable: true },
      { name: "테두리 색", value: this.borderColor, editable: true },
      {
        name: "그림자 각도",
        value: Math.round(this.shadowAngle * (180 / Math.PI)),
        editable: true,
      },
      { name: "그림자 간격", value: this.shadowRadius, editable: true },
      { name: "그림자 흐리게", value: this.shadowBlur, editable: true },
      { name: "그림자 색", value: this.shadowColor, editable: true },
    ];
  }

  setProperties(name: string, value: number): void {
    switch (name) {
      case "가로 위치":
        const newX = Number(value);
        const width = this.radiusX;
        this.startX = newX - width;
        this.endX = newX + width;
        break;
      case "세로 위치":
        const newY = Number(value);
        const height = this.radiusY;
        this.startY = newY - height;
        this.endY = newY + height;
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
      case "테두리 굵기":
        this.borderWidth = Number(value);
        break;
      case "테두리 색":
        this.borderColor = value.toString();
        break;
      case "그림자 색":
        this.shadowColor = value.toString();
        break;
      case "그림자 각도":
        const newAngle = Number(value) * (Math.PI / 180);
        const radius = this.shadowRadius;
        this.shadowOffsetX = radius * Math.cos(newAngle);
        this.shadowOffsetY = radius * Math.sin(newAngle);
        break;
      case "그림자 간격":
        const newRadius = Number(value);
        const angle = this.shadowAngle;
        this.shadowOffsetX = newRadius * Math.cos(angle);
        this.shadowOffsetY = newRadius * Math.sin(angle);
        break;
      case "그림자 흐리게":
        this.shadowBlur = Number(value);
        break;
      default:
        throw new Error("Invalid property name");
    }
  }
}

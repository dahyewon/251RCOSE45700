export interface Shape {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  draw(ctx: CanvasRenderingContext2D | null): void;
  move(dx: number, dy: number): void;
  getResizeHandles(): { x: number; y: number; pos: string }[];
  resize(dx: number, dy: number, pos: string): void;
  isPointInside(x: number, y: number): boolean;
  getProperties(): Property[];
  setProperties(name: string, value: number): void;
}

export interface Property {
  name: string;
  value: string | number;
  editable: boolean;
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
      default:
        throw new Error("Invalid property name");
    }
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
      default:
        throw new Error("Invalid property name");
    }
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
      default:
        throw new Error("Invalid property name");
    }
  }
}

//TODO: image 추가

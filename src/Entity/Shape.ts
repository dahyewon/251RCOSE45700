export interface Shape {
  id: number;
  topLeftX: number,
  topLeftY: number,
  bottomRightX: number,
  bottomRightY: number, 
  draw(ctx: CanvasRenderingContext2D | null): void;
  //TODO: move, resize 추가
  //move(dx: number, dy: number),
  //resize(w: number, h:number)
}

export class Rectangle implements Shape {
  constructor(
    public id: number,
    public topLeftX: number,
    public topLeftY: number,
    public bottomRightX: number,
    public bottomRightY: number, 
    public color: string
  ) {}

  get width(): number {
    return this.bottomRightX - this.topLeftX;
  }

  get height(): number {
    return this.bottomRightY - this.topLeftY;
  }

  get centerX(): number {
    return (this.bottomRightX + this.topLeftX) / 2;
  }

  get centerY(): number {
    return (this.bottomRightY + this.topLeftY) / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error("context is null");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.topLeftX, this.topLeftY, this.width, this.height);
  }
}

export class Ellipse implements Shape {
  constructor(
    public id: number,
    public topLeftX: number,
    public topLeftY: number,
    public bottomRightX: number,
    public bottomRightY: number,
    public color: string
  ) {}

  get centerX(): number {
    return (this.bottomRightX + this.topLeftX) / 2;
  }

  get centerY(): number {
    return (this.bottomRightY + this.topLeftY) / 2;
  }

  get radiusX(): number {
    return Math.abs(this.bottomRightX - this.topLeftX) / 2;
  }

  get radiusY(): number {
    return Math.abs(this.bottomRightY - this.topLeftY) / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.centerX, this.centerY, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

//TODO: image, line 추가

// vm
// class ShapeViewModel {
//   createRectangle(startX: number, startY: number, endX: number, endY: number): Rectangle {
//     const width = Math.abs(endX - startX);
//     const height = Math.abs(endY - startY);
//     return new Rectangle(startX, startY, width, height);
//   }

//   createCircle(centerX: number, centerY: number, endX: number, endY: number): Circle {
//     const radius = Math.sqrt((endX - centerX) ** 2 + (endY - centerY) ** 2);
//     return new Circle(centerX, centerY, radius);
//   }
// }

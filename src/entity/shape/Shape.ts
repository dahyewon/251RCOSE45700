import { DEFAULT_SHAPE, ResizeHandlePosition } from "../../constants";
import { Property, PropertyHandler } from "../property/PropertyHandlers";

export interface Shape {
  readonly id: number;
  readonly startX: number;
  readonly startY: number;
  readonly endX: number;
  readonly endY: number;

  draw(ctx: CanvasRenderingContext2D | null): void;
  move(dx: number, dy: number): void;
  getResizeHandles(): { x: number; y: number; pos: ResizeHandlePosition }[];
  resize(dx: number, dy: number, pos: string): void;
  isPointInside(x: number, y: number): boolean;
  getProperties(): Property[];
  setProperties(name: string, value: any): void;
}

export abstract class AbstractShape implements Shape {
  constructor(
    public id: number,
    public startX: number,
    public startY: number,
    public endX: number,
    public endY: number
  ) {}
  textContent: string = "";
  fontSize: number = DEFAULT_SHAPE.FONT_SIZE;
  fontFamily: string = DEFAULT_SHAPE.FONT_FAMILY;
  fontColor: string = "#fff";
  color: string = "#000000";

  shadowColor: string = "#000000";
  shadowOffsetX: number = 0;
  shadowOffsetY: number = 0;
  shadowBlur: number = 0;

  get width(): number {
    return this.endX - this.startX;
  }
  get height(): number {
    return this.endY - this.startY;
  }
  get centerX(): number {
    return (this.startX + this.endX) / 2;
  }
  get centerY(): number {
    return (this.startY + this.endY) / 2;
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

  move(dx: number, dy: number): void {
    this.startX += dx;
    this.startY += dy;
    this.endX += dx;
    this.endY += dy;
  }

  setShadow(ctx: CanvasRenderingContext2D): void {
    ctx.shadowColor = this.shadowColor;
    ctx.shadowOffsetX = this.shadowOffsetX;
    ctx.shadowOffsetY = this.shadowOffsetY;
    ctx.shadowBlur = this.shadowBlur;
  }

  // 4개 꼭지점 기준
  // Line은 override 필요
  getResizeHandles(): { x: number; y: number; pos: ResizeHandlePosition }[] {
    return [
      {
        x: this.startX - 5,
        y: this.startY - 5,
        pos: ResizeHandlePosition.TopLeft,
      },
      {
        x: this.endX - 5,
        y: this.startY - 5,
        pos: ResizeHandlePosition.TopRight,
      },
      {
        x: this.endX - 5,
        y: this.endY - 5,
        pos: ResizeHandlePosition.BottomRight,
      },
      {
        x: this.startX - 5,
        y: this.endY - 5,
        pos: ResizeHandlePosition.BottomLeft,
      },
    ];
  }

  resize(dx: number, dy: number, pos: ResizeHandlePosition): void {
    const actions: Record<ResizeHandlePosition, () => void> = {
      [ResizeHandlePosition.TopLeft]: () => {
        this.startX += dx;
        this.startY += dy;
      },
      [ResizeHandlePosition.TopRight]: () => {
        this.endX += dx;
        this.startY += dy;
      },
      [ResizeHandlePosition.BottomRight]: () => {
        this.endX += dx;
        this.endY += dy;
      },
      [ResizeHandlePosition.BottomLeft]: () => {
        this.startX += dx;
        this.endY += dy;
      },
    };
    actions[pos]?.();
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointInside(x: number, y: number): boolean;
  // 혹시나 getProperties와 헷갈려서 밖에서 사용할까봐 protected로 구현
  protected abstract getPropertyHandlers(): PropertyHandler<this>[];

  getProperties(): Property[] {
    return this.getPropertyHandlers().map((handler) => ({
      type: handler.type,
      name: handler.name,
      value: handler.getValue(this),
    }));
  }

  setProperties(name: string, value: any): void {
    const handler = this.getPropertyHandlers().find((h) => h.name === name);
    if (!handler) throw new Error(`Invalid property name: ${name}`);
    handler.setValue(this, value);
  }

  setCenterX(newX: number): void {
    const width = this.width;
    this.startX = newX - width / 2;
    this.endX = newX + width / 2;
  }
  setCenterY(newY: number): void {
    const height = this.height;
    this.startY = newY - height / 2;
    this.endY = newY + height / 2;
  }
  setWidth(newWidth: number): void {
    const centerX = this.centerX;
    this.startX = centerX - newWidth / 2;
    this.endX = centerX + newWidth / 2;
  }
  setHeight(newHeight: number): void {
    const centerY = this.centerY;
    this.startY = centerY - newHeight / 2;
    this.endY = centerY + newHeight / 2;
  }
}

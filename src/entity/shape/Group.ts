import { ResizeHandlePosition } from "../../constants";
import {
  CommonPropertyHandlers,
  Property,
  PropertyHandler,
} from "../property/PropertyHandlers";
import { Shape } from "./Shape";

export class Group implements Shape {
  private children: Shape[] = [];
  constructor(
    public id: number,
    public startX: number,
    public startY: number,
    public endX: number,
    public endY: number
  ) {}
  public color: string = "";
  public textContent: string = "";
  public fontSize: number = 0;
  public fontFamily: string = "";
  public fontColor: string = "";
  public isBold: boolean = false;
  public isItalic: boolean = false;
  public isTyping?: boolean | undefined;

  get centerX(): number {
    return (this.startX + this.endX) / 2;
  }
  get centerY(): number {
    return (this.startY + this.endY) / 2;
  }

  add(target: Shape): void {
    this.children.push(target);

    if (this.children.length === 1) {
      this.startX = target.startX;
      this.startY = target.startY;
      this.endX = target.endX;
      this.endY = target.endY;
    } else {
      if (target.startX < this.startX) this.startX = target.startX;
      if (target.startY < this.startY) this.startY = target.startY;
      if (target.endX > this.endX) this.endX = target.endX;
      if (target.endY > this.endY) this.endY = target.endY;
    }
  }

  remove(): Shape[] {
    // this.children = this.children.filter((child) => child !== target);
    return this.children;
  }

  isComposite(): boolean {
    return true;
  }

  draw(ctx: CanvasRenderingContext2D | null): void {
    this.children.forEach((child) => {
      child.draw(ctx);
    });
  }

  move(dx: number, dy: number): void {
    this.children.forEach((child) => {
      child.move(dx, dy);
    });

    this.startX += dx;
    this.startY += dy;
    this.endX += dx;
    this.endY += dy;
  }

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
    this.children.forEach((child) => child.resize(dx, dy, pos));

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
  isPointInside(x: number, y: number): boolean {
    return (
      x >= Math.min(this.startX, this.endX) &&
      x <= Math.max(this.startX, this.endX) &&
      y >= Math.min(this.startY, this.endY) &&
      y <= Math.max(this.startY, this.endY)
    );
  }

  setCenterX(newX: number): void {
    const width = this.endX - this.startX;
    this.startX = newX - width / 2;
    this.endX = newX + width / 2;
  }
  setCenterY(newY: number): void {
    const height = this.endY - this.startY;
    this.startY = newY - height / 2;
    this.endY = newY + height / 2;
  }

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

  protected getPropertyHandlers(): PropertyHandler<this>[] {
    return [
      CommonPropertyHandlers.HorizontalPos(),
      CommonPropertyHandlers.VerticalPos(),
    ];
  }
}

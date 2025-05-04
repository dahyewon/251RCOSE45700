import { BorderedShapePropertyHandlers, CommonPropertyHandlers, PropertyHandler } from "../property/PropertyHandlers";
import { AbstractShape } from "./Shape";

export class Rectangle extends AbstractShape {
  constructor(
    id: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    color?: string
  ) {
      super(id, startX, startY, endX, endY, color);
  }
  borderWidth: number = 0;
  borderColor: string = "#000000";

  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error("context is null");
    this.setShadow(ctx);

    ctx.fillStyle = this.color;
    ctx.fillRect(this.startX, this.startY, this.width, this.height);

    // 프레임
    if (this.borderWidth > 0) {
      ctx.strokeStyle = this.borderColor;
      ctx.lineWidth = this.borderWidth;
      ctx.strokeRect(this.startX, this.startY, this.width, this.height);
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

  protected getPropertyHandlers(): PropertyHandler<this>[] {
    return [
        CommonPropertyHandlers.HorizontalPos(),
        CommonPropertyHandlers.VerticalPos(),
        CommonPropertyHandlers.Width(),
        CommonPropertyHandlers.Height(),
        CommonPropertyHandlers.Color(),
        CommonPropertyHandlers.ShadowAngle(),
        CommonPropertyHandlers.ShadowRadius(),
        CommonPropertyHandlers.ShadowBlur(),
        CommonPropertyHandlers.ShadowColor(),
        BorderedShapePropertyHandlers.BorderWidth<this & { borderWidth: number }>(),
        BorderedShapePropertyHandlers.BorderColor<this & { borderColor: string }>(),
    ];
  }
}

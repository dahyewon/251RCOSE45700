import { PROPERTY_NAMES, PROPERTY_TYPES } from "../../constants";
import {
  BorderedShapePropertyHandlers,
  CommonPropertyHandlers,
  PropertyHandler,
  TextShapePropertyHandlers,
} from "../property/PropertyHandlers";
import { AbstractShape } from "./Shape";

export class Ellipse extends AbstractShape {
  private borderWidth: number = 0;
  private borderColor: string = "#000000";
  public isTyping: boolean = false;

  get radiusX(): number {
    return Math.abs(this.endX - this.startX) / 2;
  }

  get radiusY(): number {
    return Math.abs(this.endY - this.startY) / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!ctx) throw new Error("context is null");
    ctx.save();

    this.setShadow(ctx);
    this.drawFrame(ctx); // 테두리 그림자 반영하기
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

    ctx.restore();
    this.drawFrame(ctx);
    ctx.restore();

    if (this.textContent) {
      const fontStyle = this.isItalic ? "italic" : "normal";
      const fontWeight = this.isBold ? "bold" : "normal";
      ctx.font = `${fontStyle} ${fontWeight} ${this.fontSize}px ${this.fontFamily}`;
      ctx.fillStyle = this.fontColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.textContent, this.centerX, this.centerY);
    }
  }

  drawFrame(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = this.borderWidth;
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

  // 사용할 속성 골라넣기
  private static WidthHandler = (): PropertyHandler<Ellipse> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.SHAPE_WIDTH,
    getValue: (shape) => Math.abs(shape.radiusX * 2),
    setValue: (shape, value) => {
      const centerX = shape.centerX;
      shape.startX = centerX - Number(value) / 2;
      shape.endX = centerX + Number(value) / 2;
    },
  });
  private static HeightHandler = (): PropertyHandler<Ellipse> => ({
    type: PROPERTY_TYPES.NUMBER,
    name: PROPERTY_NAMES.SHAPE_HEIGHT,
    getValue: (shape) => Math.abs(shape.radiusY * 2),
    setValue: (shape, value) => {
      const centerY = shape.centerY;
      shape.startY = centerY - Number(value) / 2;
      shape.endY = centerY + Number(value) / 2;
    },
  });
  protected getPropertyHandlers(): PropertyHandler<this>[] {
    return [
      CommonPropertyHandlers.HorizontalPos(),
      CommonPropertyHandlers.VerticalPos(),
      Ellipse.WidthHandler(),
      Ellipse.HeightHandler(),
      CommonPropertyHandlers.Color(),
      TextShapePropertyHandlers.TextContent(),
      this.textContent && TextShapePropertyHandlers.FontSize(),
      this.textContent && TextShapePropertyHandlers.FontFamily(),
      this.textContent && TextShapePropertyHandlers.FontColor(),
      this.textContent && TextShapePropertyHandlers.Bold(),
      this.textContent && TextShapePropertyHandlers.Italic(),
      CommonPropertyHandlers.ShadowAngle(),
      CommonPropertyHandlers.ShadowRadius(),
      CommonPropertyHandlers.ShadowBlur(),
      CommonPropertyHandlers.ShadowColor(),
      BorderedShapePropertyHandlers.BorderWidth<
        this & { borderWidth: number }
      >(),
      BorderedShapePropertyHandlers.BorderColor<
        this & { borderColor: string }
      >(),
    ].filter(Boolean) as PropertyHandler<this>[];
  }
}

import { DEFAULT_SHAPE } from "../../constants";
import { 
    CommonPropertyHandlers,
    PropertyHandler,
    TextShapePropertyHandlers,
} from "../property/PropertyHandlers";
import { AbstractShape } from "./Shape";

export class TextShape extends AbstractShape {
  constructor(
    id: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    public textContent: string = DEFAULT_SHAPE.TEXT_CONTENT,
    public fontSize: number = DEFAULT_SHAPE.FONT_SIZE,
    public fontFamily: string = DEFAULT_SHAPE.FONT_FAMILY,
  ) {
    super(id, startX, startY, endX, endY);
  }
  public fontColor: string = '#000000';
  public isTyping: boolean = false;

  draw(ctx: CanvasRenderingContext2D | null): void {
    if (!ctx) throw new Error("context is null");
    ctx.save();
    if (this.isTyping) return;
    this.setShadow(ctx);

    const fontStyle = this.isItalic ? "italic" : "normal";
    const fontWeight = this.isBold ? "bold" : "normal";
    ctx.font = `${fontStyle} ${fontWeight} ${this.fontSize}px ${this.fontFamily}`;
    ctx.fillStyle = this.fontColor;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.textContent, this.centerX, this.centerY);
    ctx.restore();
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
      TextShapePropertyHandlers.TextContent(),
      TextShapePropertyHandlers.FontSize(),
      TextShapePropertyHandlers.FontFamily(),
      TextShapePropertyHandlers.Bold(),
      TextShapePropertyHandlers.Italic(),
      CommonPropertyHandlers.ShadowAngle(),
      CommonPropertyHandlers.ShadowRadius(),
      CommonPropertyHandlers.ShadowBlur(),
      CommonPropertyHandlers.ShadowColor(),    
    ];
  }
}

export interface TextShapeProps {
  id: number;
  textContent: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  color: string;
}

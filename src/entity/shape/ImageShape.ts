import {
  BorderedShapePropertyHandlers,
  CommonPropertyHandlers,
  PropertyHandler,
  TextShapePropertyHandlers,
} from "../property/PropertyHandlers";
import { AbstractShape } from "./Shape";

export class ImageShape extends AbstractShape {
  constructor(
    id: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    public imageUrl: string
  ) {
    super(id, startX, startY, endX, endY);
  }
  private borderWidth: number = 0;
  private borderColor: string = "#000000";
  public isTyping: boolean = false;

  private imageElement: HTMLImageElement | null = null;

  draw(ctx: CanvasRenderingContext2D | null): void {
    if (!ctx) throw new Error("context is null");
    ctx.save();

    this.setShadow(ctx);
    this.drawFrame(ctx); // 테두리 그림자 반영하기

    if (!this.imageElement) {
      this.imageElement = new Image();
      this.imageElement.src = this.imageUrl;
      this.imageElement.onload = () => {
        ctx.drawImage(
          this.imageElement!,
          this.startX,
          this.startY,
          this.width,
          this.height
        );
      };
    } else {
      ctx.drawImage(
        this.imageElement,
        this.startX,
        this.startY,
        this.width,
        this.height
      );
    }

    ctx.restore();
    this.drawFrame(ctx);
    ctx.restore();

    if (this.textContent) {
      ctx.font = `${this.fontSize}px ${this.fontFamily}`;
      ctx.fillStyle = this.fontColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.textContent, this.centerX, this.centerY);
    }
  }

  drawFrame(ctx: CanvasRenderingContext2D) {
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
      TextShapePropertyHandlers.TextContent(),
      this.textContent && TextShapePropertyHandlers.FontSize(),
      this.textContent && TextShapePropertyHandlers.FontFamily(),
      this.textContent && TextShapePropertyHandlers.FontColor(),
      CommonPropertyHandlers.Width(),
      CommonPropertyHandlers.Height(),
      CommonPropertyHandlers.Color(),
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

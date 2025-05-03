import { DEFAULT_SHAPE, PROPERTY_NAMES, PROPERTY_TYPES } from "../../constants";
import { CommonPropertyHandlers, PropertyHandler } from "../property/PropertyHandlers";
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
        color?: string,
    ) {
        super(id, startX, startY, endX, endY, color);
    }

    draw(ctx: CanvasRenderingContext2D | null): void {
        if (!ctx) throw new Error("context is null");
        this.setShadow(ctx);

        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.fillStyle = this.color;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.textContent, this.centerX, this.centerY);
    }

    isPointInside(x: number, y: number): boolean {
        return (
            x >= Math.min(this.startX, this.endX) &&
            x <= Math.max(this.startX, this.endX) &&
            y >= Math.min(this.startY, this.endY) &&
            y <= Math.max(this.startY, this.endY)
        );
    }

    private static textContentHandler = (): PropertyHandler<TextShape> => ({
        type: PROPERTY_TYPES.TEXT,
        name: PROPERTY_NAMES.TEXT_CONTENT,
        getValue: (shape) => shape.textContent,
        setValue: (shape, value) => { shape.textContent = value.toString(); },
    });

    private static fontSizeHandler = (): PropertyHandler<TextShape> => ({
        type: PROPERTY_TYPES.NUMBER,
        name: PROPERTY_NAMES.FONT_SIZE,
        getValue: (shape) => shape.fontSize,
        setValue: (shape, value) => { shape.fontSize = Number(value); }
    });

    private static fontFamilyHandler = (): PropertyHandler<TextShape> => ({
        type: PROPERTY_TYPES.DROPDOWN,
        name: PROPERTY_NAMES.FONT_FAMILY,
        getValue: (shape) => shape.fontFamily,
        setValue: (shape, value) => { shape.fontFamily = value.toString(); }
    });

    protected getPropertyHandlers(): PropertyHandler<this>[] {
        return [
            CommonPropertyHandlers.HorizontalPos(),
            CommonPropertyHandlers.VerticalPos(),
            TextShape.textContentHandler(),
            TextShape.fontSizeHandler(),
            TextShape.fontFamilyHandler(),
            CommonPropertyHandlers.Width(),
            CommonPropertyHandlers.Height(),
            CommonPropertyHandlers.Color(),
            CommonPropertyHandlers.ShadowAngle(),
            CommonPropertyHandlers.ShadowRadius(),
            CommonPropertyHandlers.ShadowBlur(),
            CommonPropertyHandlers.ShadowColor(),    
        ];
    }
}
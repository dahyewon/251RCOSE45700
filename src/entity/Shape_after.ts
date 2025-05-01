import { PROPERTY_NAMES, PROPERTY_TYPES } from "../constants";

export interface Property {
    type: string;
    name: string;
    value: string | number;
}

export interface PropertyHandler<T extends Shape> {
    type: string;
    name: string;
    getValue(shape: T):  string | number;
    setValue(shape: T, value: any): void;
}

export interface Shape {
    id: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    readonly width: number;
    readonly height: number;
    readonly centerX: number;
    readonly centerY: number;

    draw(ctx: CanvasRenderingContext2D | null): void;
    move(dx: number, dy: number): void;
    getResizeHandles(): { x: number; y: number; pos: string }[];
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
        public endY: number,
        public color: string
    ) {}

    get width(): number {
        return Math.abs(this.endX - this.startX);
    }
    get height(): number {
        return Math.abs(this.endY - this.startY);
    }
    get centerX(): number {
        return (this.startX + this.endX) / 2
    }
    get centerY(): number {
        return (this.startY + this.endY) / 2
    }

    move(dx: number, dy: number): void {
        this.startX += dx;
        this.startY += dy;
        this.endX += dx;
        this.endY += dy;
    }

    // 4개 꼭지점 기준
    // Line은 override 필요
    getResizeHandles(): { x: number; y: number; pos: string; }[] {
        return [
            { x: this.startX - 5, y: this.startY - 5, pos: "top-left" },
            { x: this.endX - 5, y: this.startY - 5, pos: "top-right" },
            { x: this.endX - 5, y: this.endY - 5, pos: "bottom-right" },
            { x: this.startX - 5, y: this.endY - 5, pos: "bottom-left" },
        ];
    }
    // Line은 override 필요
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

    abstract draw(ctx: CanvasRenderingContext2D): void;
    abstract isPointInside(x: number, y: number): boolean;
    // 혹시나 getProperties와 헷갈려서 밖에서 사용할까봐 protected로 구현
    protected abstract getPropertyHandlers(): PropertyHandler<this>[];

    getProperties(): Property[] {
        return this.getPropertyHandlers().map(handler => ({
            type: handler.type,
            name: handler.name,
            value: handler.getValue(this)
        }));
    }

    setProperties(name: string, value: any): void {
        const handler = this.getPropertyHandlers().find(h => h.name === name);
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

export const CommonPropertyHandlers = {
    HorizontalPos: <T extends AbstractShape>(): PropertyHandler<T> => ({
        type: PROPERTY_TYPES.NUMBER,
        name: PROPERTY_NAMES.HORIZONTAL_POS,
        getValue: (shape) => Math.round(shape.centerX),
        setValue: (shape, value) => shape.setCenterX(Number(value)),
    }),
    VerticalPos: <T extends AbstractShape>(): PropertyHandler<T> => ({
        type: PROPERTY_TYPES.NUMBER,
        name: PROPERTY_NAMES.VERTICAL_POS,
        getValue: (shape) => Math.round(shape.centerY),
        setValue: (shape, value) => shape.setCenterY(Number(value)),
    }),
    Width: <T extends AbstractShape>(): PropertyHandler<T> => ({
        type: PROPERTY_TYPES.NUMBER,
        name: PROPERTY_NAMES.WIDTH,
        getValue: (shape) => Math.round(shape.width),
        setValue: (shape, value) => shape.setWidth(Number(value)),
    }),
    Height: <T extends AbstractShape>(): PropertyHandler<T> => ({
        type: PROPERTY_TYPES.NUMBER,
        name: PROPERTY_NAMES.HEIGHT,
        getValue: (shape) => Math.round(shape.height),
        setValue: (shape, value) => shape.setHeight(Number(value)),
    }),
    Color: <T extends AbstractShape>(): PropertyHandler<T> => ({
        type: PROPERTY_TYPES.COLOR,
        name: PROPERTY_NAMES.COLOR,
        getValue: (shape) => shape.color,
        setValue: (shape, value) => { shape.color = value.toString(); },
    }),
};

export class Rectangle extends AbstractShape {
    constructor(
        id: number,
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        color: string
    ) {
        super(id, startX, startY, endX, endY, color);
    }

    // abstract 메서드 먼저 구현 (기존 코드랑 동일)
    draw(ctx: CanvasRenderingContext2D) {
        if (!ctx) throw new Error("context is null");
        ctx.fillStyle = this.color;
        ctx.fillRect(this.startX, this.startY, this.width, this.height);
    }

    isPointInside(x: number, y: number): boolean {
        return (
            x >= Math.min(this.startX, this.endX) &&
            x <= Math.max(this.startX, this.endX) &&
            y >= Math.min(this.startY, this.endY) &&
            y <= Math.max(this.startY, this.endY)
        );
    }
    // 사용하실 속성들을 골라서 넣어주세요!
    protected getPropertyHandlers(): PropertyHandler<this>[] {
        return [
            CommonPropertyHandlers.HorizontalPos(),
            CommonPropertyHandlers.VerticalPos(),
            CommonPropertyHandlers.Width(),
            CommonPropertyHandlers.Height(),
            CommonPropertyHandlers.Color()
        ];
    }
}

export class Line extends AbstractShape {
    constructor(
        id: number,
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        color: string,
        public lineWidth: number = 1 // Line 고유 속성
    ) {
        super(id, startX, startY, endX, endY, color);
    }

    get dx(): number {
        return this.endX - this.startX;
    }
    get dy(): number {
        return this.endY - this.startY;
    }
    get length(): number {
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }

    // abstract 메서드 구현
    draw(ctx: CanvasRenderingContext2D): void {
        if (!ctx) throw new Error("context is null");
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
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

    // Line은 resize 관련 메서드 override 해서 새로 구현해야함!
    override getResizeHandles(): { x: number; y: number; pos: string; }[] {
        return [
            { x: this.startX - 5, y: this.startY - 5, pos: "top-left" }, // starting point
            { x: this.endX - 5, y: this.endY - 5, pos: "bottom-right" }, // ending point
        ];
    }
    override resize(dx: number, dy: number, pos: string): void {
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
    
    // 공통에 없는 Handler 만들어줌. 내부 설정값이라 private static
    // 길이
    private static LengthHandler = (): PropertyHandler<Line> => ({
        type: PROPERTY_TYPES.NUMBER,
        name: PROPERTY_NAMES.LENGTH,
        getValue: (shape) => Math.round(shape.length),
        setValue: (shape, value) => {
            const centerX = shape.centerX;
            const centerY = shape.centerY;
            const newLength = Number(value);
            const angle = Math.atan2(shape.dy, shape.dx);
            shape.startX = centerX - (newLength / 2) * Math.cos(angle);
            shape.startY = centerY - (newLength / 2) * Math.sin(angle);
            shape.endX = centerX + (newLength / 2) * Math.cos(angle);
            shape.endY = centerY + (newLength / 2) * Math.sin(angle);
        },
    });
    // 선 굵기
    private static LineWidthHandler = (): PropertyHandler<Line> => ({
        type: PROPERTY_TYPES.NUMBER,
        name: PROPERTY_NAMES.LINEWIDTH,
        getValue: (shape) => shape.lineWidth,
        setValue: (shape, value) => {
            shape.lineWidth = Number(value);
        },
    });

    protected getPropertyHandlers(): PropertyHandler<this>[] {
        return [
            CommonPropertyHandlers.HorizontalPos(),
            CommonPropertyHandlers.VerticalPos(),
            Line.LengthHandler(),
            Line.LineWidthHandler(),
            CommonPropertyHandlers.Color(),
        ];
    }
}

export class Ellipse extends AbstractShape {
    constructor(
        id: number,
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        color: string
    ) {
        super(id, startX, startY, endX, endY, color);
    }
    get radiusX(): number {
        return Math.abs(this.endX - this.startX) / 2;
    }
    get radiusY(): number {
        return Math.abs(this.endY - this.startY) / 2;
    }

    // abstract 메서드
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
    // 높이에 radiusY 사용
    private static WidthHandler = (): PropertyHandler<Ellipse> => ({
        type: 
    });
    protected getPropertyHandlers(): PropertyHandler<this>[] {
        return [
            CommonPropertyHandlers.HorizontalPos(),
            CommonPropertyHandlers.VerticalPos(),

        ];
    }

}
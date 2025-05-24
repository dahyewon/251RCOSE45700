import { CANVAS, DEFAULT_SHAPE } from "../constants";
import { Observable } from "../core/Observable";
import { TextShape } from "../entity/shape";
import { Shape } from "../entity/shape/Shape";
import { ShapeFactory } from "../entity/shape/ShapeFactory";
import { CanvasEvent } from "../viewModel/CanvasEvents";

export class ShapeModel extends Observable<any> {
  private static instance: ShapeModel;
  private shapes: Shape[] = [];
  private zOrder: number[] = []; // z-order - shapeId map
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private shapeType: string = "rectangle"; // default shape type
  private drawingShape: Shape | null = null;

  public static getInstance(): ShapeModel {
    if (!ShapeModel.instance) {
      ShapeModel.instance = new ShapeModel();
    }
    return ShapeModel.instance;
  }

  notifyShapesUpdated() {
    const event: CanvasEvent<{ shapes: Shape[] }> = {
      type: "SHAPES_UPDATED",
      data: {
        shapes: this.getShapes(),
      },
    };
    this.notify(event);
  }

  notifyResetInput() {
    const event: CanvasEvent<{}> = {
      type: "RESET_INPUT_FIELDS",
      data: {},
    };
    this.notify(event);
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.zOrder.push(shape.id); // z-order는 도형 추가 시 자동으로 설정
    this.notifyShapesUpdated();
  }

  clearShapes() {
    this.shapes = [];
    this.zOrder = [];
    this.notifyShapesUpdated();
    this.notifyResetInput();
  }

  getShapes(): Shape[] {
    if (this.drawingShape) {
      return [...this.getShapesByZOrder(), this.drawingShape];
    } else return [...this.getShapesByZOrder()]; // 원본 배열이 수정되지 않도록 복사본 반환
  }

  countShapes(): number {
    return this.shapes.length;
  }

  startDraw(offsetX: number, offsetY: number): void {
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;
  }

  continueDraw(offsetX: number, offsetY: number): void {
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시

    this.endX = offsetX;
    this.endY = offsetY;

    this.drawingShape = ShapeFactory.createShape(this.shapeType, {
      id: this.shapes.length,
      startX: this.startX,
      startY: this.startY,
      endX: this.endX,
      endY: this.endY,
    });
  }

  endDrawShape(): void {
    if (this.drawingShape) {
      this.addShape(this.drawingShape);
      this.drawingShape = null; // reset drawing shape
    }
    this.notifyShapesUpdated();
  }

  getZOrder(): number[] {
    return this.zOrder;
  }

  getShapesByZOrder(): Shape[] {
    const sortedShapes = this.zOrder.map((id) => {
      return this.shapes.find((shape) => shape.id === id);
    });

    if (sortedShapes.includes(undefined)) {
      throw new Error("Shape not found in z-order mapping.");
    } else if (this.drawingShape != null) {
      return [...sortedShapes, this.drawingShape] as Shape[];
    } else return sortedShapes as Shape[];
  }

  setProperty(shapeId: number, propertyName: string, value: any): Shape {
    const shape = this.shapes.find((shape) => shape.id === shapeId);
    if (shape) {
      shape.setProperties(propertyName, value);
      if (shape instanceof TextShape) {
        shape.isEditing = false;
      }
      this.notifyShapesUpdated();
      return shape;
    } else {
      throw new Error("Shape not found.");
    }
  }

  addTemplateShape(type: string, properties: any): Shape {
    const defaultWidth = properties.width || DEFAULT_SHAPE.WIDTH;
    const defaultHeight = properties.height || DEFAULT_SHAPE.HEIGHT;

    const startX = properties.startX ?? (CANVAS.WIDTH - defaultWidth) / 2;
    const startY = properties.startY ?? (CANVAS.HEIGHT - defaultHeight) / 2;

    const shape = ShapeFactory.createShape(type, {
      id: this.countShapes(),
      startX,
      startY,
      endX: startX + defaultWidth,
      endY: startY + defaultHeight,
      color: properties.color || DEFAULT_SHAPE.COLOR,
      ...properties,
    });
    this.addShape(shape);

    this.notifyShapesUpdated();
    return shape;
  }
}

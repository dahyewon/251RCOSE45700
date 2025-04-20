import { Shape } from "../entity/Shape";
import { ShapeFactory } from "../entity/ShapeFactory";

export enum ZOrderAction {
  forward = "forward",
  backward = "backward",
  toFront = "toFront",
  toBack = "toBack",
}

export class ShapeModel {
  private shapes: Shape[] = [];
  private zOrder: number[] = []; // z-order - shapeId map
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private drawingShape: Shape | null = null;

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.zOrder.unshift(shape.id); // z-order는 도형 추가 시 자동으로 설정
  }

  clearShapes() {
    this.shapes = [];
    this.zOrder = [];
  }

  getShapes(): Shape[] {
    return [...this.getShapesByZOrder()]; // 원본 배열이 수정되지 않도록 복사본 반환
  }

  countShapes(): number {
    return this.shapes.length;
  }

  startDrawShape(offsetX: number, offsetY: number): void {
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;
  }

  continueDrawShape(shapeType: string, offsetX: number, offsetY: number): void {
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시

    this.endX = offsetX;
    this.endY = offsetY;

    this.drawingShape = ShapeFactory.createShape(shapeType, {
      id: this.countShapes(),
      startX: this.startX,
      startY: this.startY,
      endX: this.endX,
      endY: this.endY,
      color: "black",
    });
  }

  endDrawShape(): void {
    if (this.drawingShape) {
      this.addShape(this.drawingShape);
      this.drawingShape = null; // reset drawing shape
    }
  }

  //z-order 관련
  moveZOrder(shapeId: number, action: ZOrderAction): void {
    const index = this.zOrder.indexOf(shapeId);
    if (index === -1) {
      throw new Error("Shape ID not found in z-order mapping.");
    }

    // z-order 변경 로직
    switch (action) {
      case ZOrderAction.forward:
        if (index > 0) {
          [this.zOrder[index], this.zOrder[index - 1]] = [
            this.zOrder[index - 1],
            this.zOrder[index],
          ];
        }
        break;
      case ZOrderAction.backward:
        if (index < this.zOrder.length - 1) {
          [this.zOrder[index], this.zOrder[index + 1]] = [
            this.zOrder[index + 1],
            this.zOrder[index],
          ];
        }
        break;
      case ZOrderAction.toFront:
        const shapeIdToFront = this.zOrder.splice(index, 1)[0];
        this.zOrder.unshift(shapeIdToFront);
        break;
      case ZOrderAction.toBack:
        const shapeIdToBack = this.zOrder.splice(index, 1)[0];
        this.zOrder.push(shapeIdToBack);
        break;
      default:
        throw new Error("Invalid z-order action.");
    }

    console.log(this.getShapesByZOrder());
  }

  getShapesByZOrder(): Shape[] {
    const sortedShapes = this.zOrder.map((id) => {
      return this.shapes.find((shape) => shape.id === id);
    });

    if (sortedShapes.includes(undefined)) {
      throw new Error("Shape not found in z-order mapping.");
    } else return sortedShapes as Shape[];
  }
}

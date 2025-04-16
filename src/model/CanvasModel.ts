import { Shape } from "../entity/Shape";

export class CanvasModel {
  private shapes: Shape[] = [];
  private selectedShapes: Shape[] = [];
  private zOrder: number[] = []; // z-order - shapeId map

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.zOrder.push(shape.id); // z-order는 도형 추가 시 자동으로 설정
  }

  clearShapes() {
    this.shapes = [];
    this.selectedShapes = [];
    this.zOrder = [];
  }

  getShapes(): Shape[] {
    return [...this.shapes]; // 원본 배열이 수정되지 않도록 복사본 반환
  }

  countShapes(): number {
    return this.shapes.length;
  }

  clearSelectedShapes() {
    this.selectedShapes = [];
  }

  addSelectedShapes(shape: Shape) {
    this.selectedShapes.push(shape);
  }

  getSelectedShapes(): Shape[] {
    return [...this.selectedShapes];
  }

  moveSelectedShapes(dx: number, dy: number): void {
    return this.selectedShapes.forEach((shape) => {
      shape.move(dx, dy);
    });
  }

  getSelectedShapesHandles(): { x: number; y: number; pos: string }[][] {
    return this.selectedShapes.map((shape) => shape.getResizeHandles());
  }

  resizeSelectedShapes(x: number, y: number, pos: string): void {
    return this.selectedShapes.forEach((shape) => {
      shape.resize(x, y, pos);
    });
  }

  //z-order 관련
  moveZOrder(shapeId: number, moveBy: number): void {
    // -1: 뒤로, 1: 앞으로
    for (let i = 0; i < this.shapes.length; i++) {
      if (this.zOrder[i] === shapeId) {
        if (i - moveBy < 0 || i - moveBy >= this.shapes.length) return;
        this.zOrder[i] = this.zOrder[i - moveBy];
        this.zOrder[i - moveBy] = shapeId;
        break;
      }
    }
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

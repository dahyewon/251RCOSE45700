import { Shape } from "../entity/Shape";

export class CanvasModel {
  private shapes: Shape[] = [];
  private selectedShapes: Shape[] = [];
  private zOrder: Map<number, number> = new Map(); // z-order - shapeId map

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.zOrder.set(this.shapes.length, shape.id); // z-order는 도형 추가 시 자동으로 설정
  }

  clearShapes() {
    this.shapes = [];
    this.selectedShapes = [];
    this.zOrder.clear();
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
}

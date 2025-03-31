import { Shape } from "../entity/Shape";

export class CanvasModel {
  private shapes: Shape[] = [];

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  clearShapes() {
    this.shapes = [];
  }

  getShapes(): Shape[] {
    return [...this.shapes]; // 원본 배열이 수정되지 않도록 복사본 반환
  }

  countShapes(): number {
    return this.shapes.length;
  }
}

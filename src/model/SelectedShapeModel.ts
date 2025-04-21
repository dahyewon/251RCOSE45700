import { Shape } from "../entity/Shape";

export class SelectedShapeModel {
  private selectedShapes: Shape[] = [];
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;

  clearSelectedShapes() {
    this.selectedShapes = [];
  }

  getSelectedShapes(): Shape[] {
    return [...this.selectedShapes];
  }

  continueSelectShapes(shapes: Shape[]): void {
    this.clearSelectedShapes();
    this.selectedShapes = shapes;
  }

  startMoveSelectedShapes(offsetX: number, offsetY: number): void {
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;
  }
  moveSelectedShapes(offsetX: number, offsetY: number): void {
    if (offsetX === this.endX && offsetY === this.endY) return;

    this.endX = offsetX;
    this.endY = offsetY;

    const dx = this.endX - this.startX;
    const dy = this.endY - this.startY;
    this.startX = offsetX;
    this.startY = offsetY;

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

import { Shape } from "../entity/Shape";

export class SelectedShapeModel {
  private selectedShapes: Shape[] = [];

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

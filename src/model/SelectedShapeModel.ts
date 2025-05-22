import { Observable } from "../core/Observable";
import { TextShape } from "../entity/shape";
import { Shape } from "../entity/shape/Shape";
import { TextShapeProps } from "../entity/shape/TextShape";

export class SelectedShapeModel extends Observable {
  private selectedShapes: Shape[] = [];
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private pos: string = "none"; // resize handle position

  clearSelectedShapes() {
    this.selectedShapes = [];
  }

  getSelectedShapes(): Shape[] {
    return [...this.selectedShapes];
  }

  updateSelectedShapes(shapes: Shape[]): void {
    this.clearSelectedShapes();
    this.selectedShapes = shapes;
  }

  clickSelectedShape(offsetX: number, offsetY: number): Shape | null {
    for (let shape of this.selectedShapes) {
      if (shape.isPointInside(offsetX, offsetY)) {
        return shape;
      }
    }
    return null;
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

  startResizeSelectedShapes(
    offsetX: number,
    offsetY: number,
    pos: string
  ): void {
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;
    this.pos = pos; // resize handle position
  }

  resizeSelectedShapes(offsetX: number, offsetY: number): void {
    if (offsetX === this.startX && offsetY === this.startY) return; // 변화 없으면 무시
    const dx = offsetX - this.startX;
    const dy = offsetY - this.startY;
    this.startX = offsetX;
    this.startY = offsetY;
    return this.selectedShapes.forEach((shape) => {
      shape.resize(dx, dy, this.pos);
    });
  }

  insertShapeText(offsetX: number, offsetY: number): Shape | null {
    if (this.selectedShapes.length === 0) return null;

    for (let shape of this.selectedShapes) {
      if (shape.isPointInside(offsetX, offsetY)) {
        return shape;
      }
    }

    return null;
  }

  getTextShapeProperties(): TextShapeProps {
    const shape = this.selectedShapes[0];
    if (this.selectedShapes.length !== 1) {
      throw new Error("Only one shape can be selected.");
    }
    // 일단은 TextShape에 대한 기능부터 구현하자 싶어서 if문 만들었습니다! 추후 제거 예정
    if (!(shape instanceof TextShape))
      throw new Error("Requested shape is not a TextShape.");
    shape.isEditing = true;
    return {
      id: shape.id,
      textContent: shape.textContent,
      startX: shape.startX,
      startY: shape.startY,
      endX: shape.endX,
      endY: shape.endY,
      fontSize: shape.fontSize,
      fontFamily: shape.fontFamily,
      color: shape.color,
    };
  }
}

import { Shape } from "../entity/shape/Shape";
import { ShapeFactory } from "../entity/shape/ShapeFactory";

export class ShapeModel {
  private shapes: Shape[] = [];
  private zOrder: number[] = []; // z-order - shapeId map
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private shapeType: string = "rectangle"; // default shape type
  private drawingShape: Shape | null = null;

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.zOrder.push(shape.id); // z-order는 도형 추가 시 자동으로 설정
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

  startDrawShape(shapeType: string, offsetX: number, offsetY: number): void {
    this.shapeType = shapeType;
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;
  }

  continueDrawShape(offsetX: number, offsetY: number): void {
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시

    this.endX = offsetX;
    this.endY = offsetY;

    this.drawingShape = ShapeFactory.createShape(this.shapeType, {
      id: this.countShapes(),
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
  }

  //z-order 관련
  moveZOrder(shapeId: number, action: string): void {
    const index = this.zOrder.indexOf(shapeId);
    if (index === -1) {
      throw new Error("Shape ID not found in z-order mapping.");
    }

    // z-order 변경 로직
    switch (
      action //TODO: moveZOrder를 strategy로 분리하기?
    ) {
      case "forward":
        if (index < this.zOrder.length - 1) {
          [this.zOrder[index], this.zOrder[index + 1]] = [
            this.zOrder[index + 1],
            this.zOrder[index],
          ];
        }
        break;
      case "backward":
        if (index > 0) {
          [this.zOrder[index], this.zOrder[index - 1]] = [
            this.zOrder[index - 1],
            this.zOrder[index],
          ];
        }
        break;
      case "toFront":
        const shapeIdToBack = this.zOrder.splice(index, 1)[0];
        this.zOrder.push(shapeIdToBack);
        break;
      case "toBack":
        const shapeIdToFront = this.zOrder.splice(index, 1)[0];
        this.zOrder.unshift(shapeIdToFront);
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
    } else if (this.drawingShape != null) {
      return [...sortedShapes, this.drawingShape] as Shape[];
    } else return sortedShapes as Shape[];
  }

  setProperty(shapeId: number, propertyName: string, value: any): void {
    const shape = this.shapes.find((shape) => shape.id === shapeId);
    if (shape) {
      shape.setProperties(propertyName, value);
    } else {
      throw new Error("Shape not found.");
    }
  }

  addImageShape(imageUrl: string, width: number, height: number) {
    const shape = ShapeFactory.createShape("image", {
      id: Date.now(),
      startX: 0,
      startY: 0,
      endX: width,
      endY: height,
      imageUrl: imageUrl,
    });
    this.addShape(shape);
    return shape;
  }
}

import { CANVAS, DEFAULT_SHAPE } from "../constants";
import { Observable } from "../core/Observable";
import { TextShape } from "../entity/shape";
import { Shape } from "../entity/shape/Shape";
import { ShapeFactory } from "../entity/shape/ShapeFactory";
import { TextShapeProps } from "../entity/shape/TextShape";
import { CanvasEvent } from "../viewModel/CanvasEvents";

export class ShapeModel extends Observable<any> {
  private static instance: ShapeModel;
  private shapes: Shape[] = [];
  private selectedShapes: Shape[] = [];
  private shapeUid = 0;

  private zOrder: number[] = []; // z-order - shapeId map
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;

  private shapeType: string = "rectangle"; // default shape type
  private drawingShape: Shape | null = null;
  private resize_pos: string = "none";

  public static getInstance(): ShapeModel {
    if (!ShapeModel.instance) {
      ShapeModel.instance = new ShapeModel();
    }
    return ShapeModel.instance;
  }

  notifyShapesUpdated(updatedShapes?: Shape | Shape[]) {
    const event: CanvasEvent<{ shapes: Shape[] }> = {
      type: "SHAPES_UPDATED",
      data: {
        shapes: this.getShapes(),
      },
    };
    this.notify(event);

    if (updatedShapes instanceof Array) {
      if (updatedShapes.some((shape) => this.shapes.includes(shape))) {
        this.notifySelectedShapesUpdated();
      }
    } else if (updatedShapes) {
      if (this.shapes.includes(updatedShapes))
        this.notifySelectedShapesUpdated();
    }
  }

  notifySelectedShapesUpdated() {
    const event: CanvasEvent<{ selectedShapes: Shape[] }> = {
      type: "SELECTED_SHAPES_UPDATED",
      data: {
        selectedShapes: this.selectedShapes,
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

  setShapeType(type: string) {
    this.shapeType = type;
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
    this.zOrder.push(shape.id); // z-order는 도형 추가 시 자동으로 설정
    this.notifyShapesUpdated(shape);
  }

  deleteShape(target: Shape) {
    this.shapes = this.shapes.filter((shape) => shape !== target);
    this.zOrder = this.zOrder.filter((z) => z !== target.id);
    this.notifyShapesUpdated(this.shapes);

    if (this.selectedShapes.includes(target)) {
      this.selectedShapes.filter((shape) => shape !== target);
      this.notifySelectedShapesUpdated();
    }
  }

  clearShapes() {
    this.shapes = [];
    this.selectedShapes = [];
    this.zOrder = [];
    this.notifyShapesUpdated();
    this.notifySelectedShapesUpdated();
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

  clearSelectedShapes() {
    this.selectedShapes = [];
  }

  getSelectedShapes(): Shape[] {
    return [...this.selectedShapes];
  }

  updateSelectedShapes(shapes: Shape[]): void {
    this.clearSelectedShapes();
    this.selectedShapes = shapes;
    this.notifySelectedShapesUpdated();
  }

  startCreate(offsetX: number, offsetY: number): void {
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;
  }

  continueCreate(offsetX: number, offsetY: number): void {
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시

    this.endX = offsetX;
    this.endY = offsetY;

    this.drawingShape = ShapeFactory.createShape(this.shapeType, {
      id: this.shapeUid,
      startX: this.startX,
      startY: this.startY,
      endX: this.endX,
      endY: this.endY,
    });
    this.notifyShapesUpdated();
  }

  endCreateShape(): void {
    if (this.drawingShape) {
      this.addShape(this.drawingShape);
      this.drawingShape = null; // reset drawing shape
      this.shapeUid++;
    }
    this.notifyShapesUpdated();
    this.updateSelectedShapes(this.shapes.slice(-1));
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
      this.notifyShapesUpdated(shape);
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

    this.selectedShapes.forEach((shape) => {
      shape.move(dx, dy);
    });

    this.notifyShapesUpdated(this.selectedShapes);
  }

  getSelectedShapesHandles(): { x: number; y: number; pos: string }[][] {
    return this.selectedShapes.map((shape) => shape.getResizeHandles());
  }

  startResizeSelectedShapes(
    resize_pos: string,
    offsetX: number,
    offsetY: number
  ): void {
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;
    this.resize_pos = resize_pos; // resize handle position
  }

  resizeSelectedShapes(offsetX: number, offsetY: number): void {
    if (offsetX === this.startX && offsetY === this.startY) return; // 변화 없으면 무시
    const dx = offsetX - this.startX;
    const dy = offsetY - this.startY;
    this.startX = offsetX;
    this.startY = offsetY;

    this.selectedShapes.forEach((shape) => {
      shape.resize(dx, dy, this.resize_pos);
    });

    this.notifyShapesUpdated(this.selectedShapes);
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

  groupSelectedShapes() {
    if (!this.selectedShapes) throw new Error(`No shapes selected to group`);

    const newGroup = ShapeFactory.createShape("group", {
      id: this.shapeUid,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
    });
    this.shapeUid++;

    this.selectedShapes.forEach((shape) => newGroup.add(shape));
    this.shapes = this.shapes.filter(
      (shape) => !this.selectedShapes.includes(shape)
    ); //remove grouped shapes from shape list

    const idlist = this.selectedShapes.map((shape) => shape.id);
    this.zOrder = this.zOrder.filter((z) => !idlist.includes(z));
    this.zOrder.push(newGroup.id);

    this.shapes.push(newGroup);
    console.log(this.shapes);

    this.notifyShapesUpdated();
    this.updateSelectedShapes([newGroup]);
  }

  ungroupSelectedShapes(target: Shape) {
    if (!target.isComposite())
      throw new Error("Can't ungroup non-group component");
    const ungrouped = target.remove();
    this.shapes.push(...ungrouped);
    this.zOrder.push(...ungrouped.map((shape) => shape.id));

    this.deleteShape(target);
    console.log(ungrouped.map((shape) => shape.id));

    this.updateSelectedShapes(ungrouped);
    console.log(this.shapes, this.zOrder);
  }
}

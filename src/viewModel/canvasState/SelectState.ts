import { CommandManager } from "../../command/CommandManager";
import { CanvasStateType } from "../../constants";
import { Shape } from "../../entity/shape/Shape";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

// 선택 모드
export class SelectState implements ICanvasState {
  private canvasViewModel: CanvasViewModel;
  private commandManager = CommandManager.getInstance();
  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
  private selecting = false;
  constructor(canvasViewModel: CanvasViewModel) {
    this.canvasViewModel = canvasViewModel;
  }

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;

    if (this.checkShapeClick(offsetX, offsetY)) return; // 선택한 위치에 도형이 있다면 MoveState로 전환

    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;

    this.selecting = true;
    this.commandManager.execute("UPDATE_SELECTED", {
      selectedShapes: [],
    });
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시
    if (!this.selecting) return;

    this.endX = offsetX;
    this.endY = offsetY;

    const shapes = this.selectShapes(
      this.startX,
      this.startY,
      this.endX,
      this.endY
    );
    this.commandManager.execute("UPDATE_SELECTED", {
      selectedShapes: shapes,
    });
  }

  handleMouseUp(): void {
    this.selecting = false;
  }

  handleDoubleClick(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    const clickedShape = this.insertShapeText(offsetX, offsetY);
    if (clickedShape) {
      this.commandManager.execute("UPDATE_SELECTED", {
        selectedShapes: [clickedShape],
      });
      this.canvasViewModel.setState(CanvasStateType.EDIT_TEXT);
    }
  }

  checkShapeClick(offsetX: number, offsetY: number): boolean {
    const clickedSelectedShape = this.clickSelectedShape(offsetX, offsetY);
    if (clickedSelectedShape) {
      this.canvasViewModel.setState(CanvasStateType.MOVE);
      return true;
    }

    const clickedShape = this.clickShape(offsetX, offsetY);
    if (clickedShape) {
      this.commandManager.execute("UPDATE_SELECTED", {
        selectedShapes: [clickedShape],
      });
      this.canvasViewModel.setState(CanvasStateType.MOVE);
      return true;
    }
    return false;
  }

  selectShapes(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): Shape[] {
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);

    return this.canvasViewModel.getShapes().filter((shape) => {
      const shapeMinX = Math.min(shape.startX, shape.endX);
      const shapeMaxX = Math.max(shape.startX, shape.endX);
      const shapeMinY = Math.min(shape.startY, shape.endY);
      const shapeMaxY = Math.max(shape.startY, shape.endY);

      return (
        !(shapeMaxX < minX || maxX < shapeMinX) &&
        !(shapeMaxY < minY || maxY < shapeMinY)
      );
    });
  }

  clickShape(offsetX: number, offsetY: number): Shape | null {
    for (let shape of this.canvasViewModel.getShapes()) {
      if (shape.isPointInside(offsetX, offsetY)) {
        return shape;
      }
    }
    return null;
  }

  clickSelectedShape(offsetX: number, offsetY: number): Shape | null {
    for (let shape of this.canvasViewModel.getSelectedShapes()) {
      if (shape.isPointInside(offsetX, offsetY)) {
        return shape;
      }
    }
    return null;
  }

  insertShapeText(offsetX: number, offsetY: number): Shape | null {
    const selectedShapes = this.canvasViewModel.getSelectedShapes();
    if (selectedShapes.length === 0) return null;

    for (let shape of selectedShapes) {
      if (shape.isPointInside(offsetX, offsetY)) {
        return shape;
      }
    }

    return null;
  }
}

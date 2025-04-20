import { Command } from "../../command/Command";
import {
  ContinueSelectShapeCommand,
  ClearSelectShapeCommand,
} from "../../command/SelectShapeCommand";
import { Shape } from "../../entity/Shape";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { MoveState } from "./MoveState";

// 선택 모드
export class SelectState implements ICanvasState {
  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
  private selecting = false;
  constructor(
    private canvasViewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel
  ) {}

  handleMouseDown(event: React.MouseEvent): Command | void {
    const { offsetX, offsetY } = event.nativeEvent;

    if (this.checkShapeClick(offsetX, offsetY)) return; // 선택한 위치에 도형이 있다면 MoveState로 전환

    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;

    this.selecting = true;
    return new ClearSelectShapeCommand(this.selectedShapeModel);
  }

  handleMouseMove(event: React.MouseEvent): Command | void {
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
    return new ContinueSelectShapeCommand(this.selectedShapeModel, shapes);
  }

  handleMouseUp(): Command | void {
    this.selecting = false;
    console.log(this.selectedShapeModel.getSelectedShapes());
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

    return this.shapeModel.getShapes().filter((shape) => {
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

  getCurrentShapes(): Shape[] {
    return this.shapeModel.getShapes();
  }

  checkShapeClick(offsetX: number, offsetY: number): boolean {
    const selectedShapes = this.selectedShapeModel.getSelectedShapes();
    for (let i = 0; i < selectedShapes.length; i++) {
      const shape = selectedShapes[i];
      if (shape.isPointInside(offsetX, offsetY)) {
        this.canvasViewModel.setState(
          new MoveState(
            this.canvasViewModel,
            this.shapeModel,
            this.selectedShapeModel,
            offsetX,
            offsetY
          )
        );
        return true;
      }
    }

    this.selectedShapeModel.clearSelectedShapes();
    const shapes = this.shapeModel.getShapes();
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      if (shape.isPointInside(offsetX, offsetY)) {
        this.selectedShapeModel.addSelectedShapes(shape); // 클릭한 도형을 선택
        this.canvasViewModel.setState(
          new MoveState(
            this.canvasViewModel,
            this.shapeModel,
            this.selectedShapeModel,
            offsetX,
            offsetY
          )
        );
        return true;
      }
    }

    return false;
  }
}

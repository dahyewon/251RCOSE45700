import { Shape } from "../../entity/Shape";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { SelectState } from "./SelectState";

// 이동 모드
export class MoveState implements ICanvasState {
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private moving = false;

  constructor(
    private viewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel,
    offsetX: number,
    offsetY: number
  ) {
    this.selectedShapeModel.startMoveSelectedShapes(offsetX, offsetY);
    this.moving = true;
  }

  handleMouseDown(event: React.MouseEvent): void {
    //? required?
    const { offsetX, offsetY } = event.nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;

    this.moving = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    if (!this.moving) return;
    const { offsetX, offsetY } = event.nativeEvent;

    if (this.selectedShapeModel.getSelectedShapes().length === 0) return;
    this.selectedShapeModel.moveSelectedShapes(offsetX, offsetY);
  }

  handleMouseUp(): void {
    this.moving = false;
    this.viewModel.setState(
      new SelectState(this.viewModel, this.shapeModel, this.selectedShapeModel)
    ); // switch back to select state
  }

  getCurrentShapes(): Shape[] {
    return this.viewModel.getSavedShapes();
  }
}

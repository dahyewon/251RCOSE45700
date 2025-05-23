import { CanvasStateType } from "../../constants";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

// 이동 모드
export class MoveState implements ICanvasState {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  private selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  private moving = false;

  constructor(
    private viewModel: CanvasViewModel,
    offsetX: number,
    offsetY: number
  ) {
    this.selectedShapeModel.startMoveSelectedShapes(offsetX, offsetY);
    this.moving = true;
  }

  handleMouseDown(event: React.MouseEvent): void {
    //? required?

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
    this.viewModel.setState(CanvasStateType.SELECT); // switch back to select state
  }
  handleDoubleClick(event: React.MouseEvent): void {}
}

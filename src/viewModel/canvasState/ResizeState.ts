import { CanvasStateType } from "../../constants";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

// 리사이즈 모드
export class ResizeState implements ICanvasState {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  private selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  private resizing: boolean = false;

  constructor(private viewModel: CanvasViewModel) {
    this.resizing = true;

    document.addEventListener("mouseup", this.handleMouseUpBound);
  }

  private handleMouseUpBound = this.handleMouseUp.bind(this);
  handleMouseDown(event: React.MouseEvent): void {
    this.resizing = false;
  }

  handleMouseMove(event: React.MouseEvent): void {
    if (!this.resizing) return;
    const { offsetX, offsetY } = event.nativeEvent;

    this.selectedShapeModel.resizeSelectedShapes(offsetX, offsetY);
  }

  handleMouseUp(): void {
    this.resizing = false;
    document.removeEventListener("mouseup", this.handleMouseUpBound);
    this.viewModel.setState(CanvasStateType.SELECT);
  }
  handleDoubleClick(event: React.MouseEvent): void {}
}

import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";
import { DrawState } from "../viewModel/canvasState/DrawState";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Command } from "./Command";

export class CanvasResetCommand implements Command {
  private canvasViewModel: CanvasViewModel;
  private shapeModel: ShapeModel;
  private selectedShapeModel: SelectedShapeModel;

  constructor(
    canvasViewModel: CanvasViewModel,
    shapeModel: ShapeModel,
    selectedShapeModel: SelectedShapeModel
  ) {
    this.canvasViewModel = canvasViewModel;
    this.shapeModel = shapeModel;
    this.selectedShapeModel = selectedShapeModel;
  }

  execute(): void {
    this.shapeModel.clearShapes();
    this.selectedShapeModel.clearSelectedShapes();
    this.canvasViewModel.setShapeType("rectangle"); // default 값으로
    this.canvasViewModel.setState(
      new DrawState(this.shapeModel, this.canvasViewModel.getShapeType())
    ); // default: 그리기 모드
  }

  redo(): void {
    this.execute();
  }
  undo(): void {
    // Undo logic if needed
  }
}

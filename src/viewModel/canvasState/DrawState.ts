import { Command } from "../../command/Command";
import { CanvasStateType } from "../../constants";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

export class DrawState implements ICanvasState {
  private shapeModel = ShapeModel.getInstance();
  private selectedShapeModel = SelectedShapeModel.getInstance();
  private shapeType = "rectangle"; // default shape type
  private drawing = false;

  constructor(private viewModel: CanvasViewModel) {}

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;

    this.shapeModel.startDrawShape(this.shapeType, offsetX, offsetY);

    this.drawing = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (!this.drawing) return;

    this.shapeModel.continueDrawShape(offsetX, offsetY);
  }

  handleMouseUp(): Command | void {
    if (!this.drawing) return;
    this.drawing = false;

    this.shapeModel.endDrawShape();
    this.selectedShapeModel.updateSelectedShapes(
      this.shapeModel.getShapes().slice(-1)
    );
    this.viewModel.setState(CanvasStateType.SELECT); // switch back to select state
  }
  handleDoubleClick(event: React.MouseEvent): void {}
}

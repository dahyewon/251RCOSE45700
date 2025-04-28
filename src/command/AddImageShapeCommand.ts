import { ShapeModel } from "../model/ShapeModel";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Command } from "./Command";

export class AddImageShapeCommand implements Command {
  constructor(
    private canvasViewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel,
    private imageUrl: string,
    private width: number,
    private height: number
  ) {}

  execute() {
    const shape = this.shapeModel.addImageShape(this.imageUrl, this.width, this.height);
    this.selectedShapeModel.continueSelectShapes([shape]);
  }

  redo(): void {
    this.execute();
  }
  undo(): void {
    // Undo logic if needed
  }
}
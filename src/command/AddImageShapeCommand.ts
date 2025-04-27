import { ShapeModel } from "../model/ShapeModel";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";

export class AddImageShapeCommand {
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
    this.canvasViewModel.notifyShapesUpdated();
  }
}
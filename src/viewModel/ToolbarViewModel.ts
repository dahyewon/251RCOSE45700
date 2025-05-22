import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";

export class ToolbarViewModel {
  private selectedShapeModel: SelectedShapeModel;
  private shapeModel: ShapeModel;

  constructor(shapeModel: ShapeModel, selectedShapeModel: SelectedShapeModel) {
    this.shapeModel = shapeModel;
    this.selectedShapeModel = selectedShapeModel;
  }
}

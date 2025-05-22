import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";

export class PropertyWindowViewModel {
  private selectedShapeModel: SelectedShapeModel;
  private shapeModel: ShapeModel;

  constructor(selectedShapeModel: SelectedShapeModel, shapeModel: ShapeModel) {
    this.selectedShapeModel = selectedShapeModel;
    this.shapeModel = shapeModel;
  }
}

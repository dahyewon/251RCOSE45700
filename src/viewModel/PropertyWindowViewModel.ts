import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";

export class PropertyWindowViewModel {
  private selectedShapeModel: SelectedShapeModel;
  private shapeModel: ShapeModel;

  constructor() {
    this.selectedShapeModel = SelectedShapeModel.getInstance();
    this.shapeModel = ShapeModel.getInstance();
  }
}

import { SelectedShapeModel } from "../model/SelectedShapeModel";

export class ResizeHandleViewModel {
  private SelectedShapeModel: SelectedShapeModel;

  constructor(selectedShapeModel: SelectedShapeModel) {
    this.SelectedShapeModel = selectedShapeModel;
  }
}

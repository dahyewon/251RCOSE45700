import { Bindable } from "../core/Bindable";
import { Shape } from "../entity/shape/Shape";
import { SelectedShapeModel } from "../model/SelectedShapeModel";

export class PropertyWindowViewModel extends Bindable {
  private selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  private selectedShapes: Shape[] = [];

  constructor() {
    super();
    const observer = {
      update: () => {
        this.selectedShapes = this.selectedShapeModel.getSelectedShapes();
        this.notify();
      },
    };
    this.selectedShapeModel.subscribe(observer);
  }

  getSelectedShapes() {
    return this.selectedShapes;
  }
}

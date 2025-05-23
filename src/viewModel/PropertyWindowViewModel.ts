import { Observable } from "../core/Observable";
import { Shape } from "../entity/shape/Shape";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { CanvasEvent } from "./CanvasEvents";

export class PropertyWindowViewModel extends Observable<any> {
  private selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  private selectedShapes: Shape[] = [];

  constructor() {
    super();
    const observer = {
      update: (event: CanvasEvent<{ selectedShapes: Shape[] }>) => {
        this.selectedShapes = event.data.selectedShapes;
        this.notify(event);
      },
    };
    this.selectedShapeModel.subscribe("SELECTED_SHAPES_UPDATED", observer);
  }

  getSelectedShapes() {
    return this.selectedShapes;
  }
}

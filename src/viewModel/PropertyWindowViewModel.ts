import { Observable } from "../core/Observable";
import { Shape } from "../entity/shape/Shape";
import { ShapeModel } from "../model/ShapeModel";
import { CanvasEvent } from "./CanvasEvents";

export class PropertyWindowViewModel extends Observable<any> {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  private selectedShapes: Shape[] = [];

  constructor() {
    super();
    const observer = {
      update: (event: CanvasEvent<{ selectedShapes: Shape[] }>) => {
        this.selectedShapes = event.data.selectedShapes;
        this.notify(event);
      },
    };
    this.shapeModel.subscribe("SELECTED_SHAPES_UPDATED", observer);
  }

  getSelectedShapes() {
    return this.selectedShapes;
  }
}

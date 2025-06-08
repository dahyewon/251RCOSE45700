import { Observable } from "../core/Observable";
import { Shape } from "../entity/shape/Shape";
import { ShapeModel } from "../model/ShapeModel";
import { CanvasEvent } from "./CanvasEvents";

export class ResizeHandleViewModel extends Observable<any> {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  private selectedShapes: Shape[] = [];

  constructor() {
    super();
    const selectedShapeObserver = {
      update: (event: CanvasEvent<{ selectedShapes: Shape[] }>) => {
        this.selectedShapes = event.data.selectedShapes;
        this.notify(event);
      },
    };
    this.shapeModel.subscribe("SELECTED_SHAPES_UPDATED", selectedShapeObserver);
  }

  getSelectedShapes() {
    return this.selectedShapes;
  }
}

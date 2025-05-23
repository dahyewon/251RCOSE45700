import { Bindable } from "../core/Bindable";
import { Shape } from "../entity/shape/Shape";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";

export class PropertyWindowViewModel extends Bindable {
  private selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  private selectedShapes: Shape[] = [];

  constructor() {
    super();
    const observer = {
      update: () => {
        this.selectedShapes = this.selectedShapeModel.getSelectedShapes();
      },
    };
    this.selectedShapeModel.subscribe(observer);
  }

  // requestZOrderMove(action: string, shapeId: number) {
  //     const command = new ZOrderMoveCommand(action, shapeId);
  //     command.execute();
  //     this.notifyShapesUpdated();
  //   }

  //   requestSetProperty(shapeId: number, propertyName: string, value: any) {
  //     const command = new SetPropertyCommand(shapeId, propertyName, value);
  //     command.execute();
  //     this.notifyShapesUpdated();
  //   }
}

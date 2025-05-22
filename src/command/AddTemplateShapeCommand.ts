import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class AddTemplateShapeCommand implements Command {
  private shapeModel: ShapeModel;
  private selectedShapeModel: SelectedShapeModel;
  constructor(private type: string, private properties: any) {
    this.shapeModel = ShapeModel.getInstance();
    this.selectedShapeModel = SelectedShapeModel.getInstance();
  }

  execute(): void {
    const shape = this.shapeModel.addTemplateShape(this.type, this.properties);
    this.selectedShapeModel.updateSelectedShapes([shape]);
  }

  redo(): void {
    this.execute();
  }

  undo(): void {}
}

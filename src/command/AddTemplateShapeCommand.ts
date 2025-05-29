import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class AddTemplateShapeCommand implements Command {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  private selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  constructor(private type: string, private properties: any) {}

  execute(): void {
    const shape = this.shapeModel.addTemplateShape(this.type, this.properties);
    this.selectedShapeModel.updateSelectedShapes([shape]);
  }

  redo(): void {
    this.execute();
  }

  undo(): void {}
}

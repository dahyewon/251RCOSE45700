import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class AddTemplateShapeCommand implements Command {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  constructor(private type: string, private properties: any) {}

  execute(): void {
    const shape = this.shapeModel.addTemplateShape(this.type, this.properties);
    this.shapeModel.updateSelectedShapes([shape]);
  }

  redo(): void {
    this.execute();
  }

  undo(): void {}
}

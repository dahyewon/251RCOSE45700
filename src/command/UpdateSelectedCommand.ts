import { Shape } from "../entity/shape/Shape";
import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class UpdateSelectedCommand implements Command {
  private shapeModel = ShapeModel.getInstance();
  private selectedShapes: Shape[];

  constructor(selectedShapes: Shape[]) {
    this.selectedShapes = selectedShapes;
  }

  execute(): void {
    this.shapeModel.updateSelectedShapes(this.selectedShapes);
  }

  undo(): void {
    // Logic to undo the update of selected shapes
    console.log(`Undoing the update of selected shapes`);
  }

  redo(): void {
    // Logic to redo the update of selected shapes
    console.log(`Redoing the update of selected shapes`);
  }
}

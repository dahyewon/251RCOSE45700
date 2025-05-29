import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { Command } from "./Command";

export class UpdateSelectedCommand implements Command {
  private selectedShapeModel = SelectedShapeModel.getInstance();
  private selectedShapes: any[];

  constructor(selectedShapes: any[]) {
    this.selectedShapes = selectedShapes;
  }

  execute(): void {
    this.selectedShapeModel.updateSelectedShapes(this.selectedShapes);
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

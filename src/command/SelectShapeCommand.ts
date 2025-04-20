import { Shape } from "../entity/Shape";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { Command } from "./Command";

export class ClearSelectShapeCommand implements Command {
  private selectedShapeModel: SelectedShapeModel;

  constructor(selectedShapeModel: SelectedShapeModel) {
    this.selectedShapeModel = selectedShapeModel;
  }

  execute() {
    this.selectedShapeModel.startSelectShapes();
  }

  undo(): void {
    return;
  }
  redo(): void {
    return; //this.execute();
  }
}

export class ContinueSelectShapeCommand implements Command {
  private selectedShapeModel: SelectedShapeModel;
  private shapes: Shape[] = [];

  constructor(selectedShapeModel: SelectedShapeModel, shapes: Shape[] = []) {
    this.selectedShapeModel = selectedShapeModel;
    this.shapes = shapes;
  }

  execute() {
    this.selectedShapeModel.continueSelectShapes(this.shapes);
  }

  undo(): void {
    return;
  }
  redo(): void {
    return; //this.execute();
  }
}

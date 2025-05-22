import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { ToolbarViewModel } from "../viewModel/ToolbarViewModel";
import { Command } from "./Command";

export class AddTemplateShapeCommand implements Command {
  private shapeModel: ShapeModel;
  private selectedShapeModel: SelectedShapeModel;
  constructor(
    private viewModel: CanvasViewModel | ToolbarViewModel,
    private type: string,
    private properties: any
  ) {
    this.shapeModel = viewModel.shapeModel;
    this.selectedShapeModel = viewModel.selectedShapeModel;
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

import { Command } from "../../command/Command";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import {
  CanvasStateCreator,
  DrawStateCreator,
  MoveStateCreator,
  ResizeStateCreator,
  SelectStateCreator,
} from "./CanvasStateCreator";

export class CanvasStateCommandFactory {
  private creators: Record<string, CanvasStateCreator> = {
    DrawState: new DrawStateCreator(),
    SelectState: new SelectStateCreator(),
    MoveState: new MoveStateCreator(),
    ResizeState: new ResizeStateCreator(),
  };
  constructor(
    private canvasViewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel
  ) {}

  createCommand(stateType: string, params: any): Command {
    const creator = this.creators[stateType];
    if (!creator) {
      throw new Error(`Unknown state type: ${stateType}`);
    }
    return creator.createCommand(
      this.canvasViewModel,
      this.shapeModel,
      this.selectedShapeModel,
      params
    );
  }
}

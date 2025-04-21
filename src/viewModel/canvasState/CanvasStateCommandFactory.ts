import { Command } from "../../command/Command";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import {
  CanvasStateStrategy,
  DrawStateStrategy,
  MoveStateStrategy,
  ResizeStateStrategy,
  SelectStateStrategy,
} from "./CanvasStateStrategy";

export class CanvasStateCommandFactory {
  private strategies: Record<string, CanvasStateStrategy> = {
    DrawState: new DrawStateStrategy(),
    SelectState: new SelectStateStrategy(),
    MoveState: new MoveStateStrategy(),
    ResizeState: new ResizeStateStrategy(),
  };
  constructor(
    private canvasViewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel
  ) {}

  createCommand(stateType: string, params: any): Command {
    const strategy = this.strategies[stateType];
    if (!strategy) {
      throw new Error(`Unknown state type: ${stateType}`);
    }
    return strategy.createCommand(
      this.canvasViewModel,
      this.shapeModel,
      this.selectedShapeModel,
      params
    );
  }
}

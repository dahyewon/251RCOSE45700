import { SetStateCommand } from "../../command/CanvasStateCommand";
import { Command } from "../../command/Command";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { DrawState } from "./DrawState";
import { MoveState } from "./MoveState";
import { ResizeState } from "./ResizeState";
import { SelectState } from "./SelectState";

export class CanvasStateCommandFactory {
  constructor(
    private canvasViewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel
  ) {}

  createDrawStateCommand(shapeType: string): Command {
    return new SetStateCommand(
      this.canvasViewModel,
      new DrawState(this.shapeModel, shapeType)
    );
  }

  createSelectStateCommand(): Command {
    return new SetStateCommand(
      this.canvasViewModel,
      new SelectState(
        this.canvasViewModel,
        this.shapeModel,
        this.selectedShapeModel
      )
    );
  }

  createMoveStateCommand(offsetX: number, offsetY: number): Command {
    return new SetStateCommand(
      this.canvasViewModel,
      new MoveState(
        this.canvasViewModel,
        this.shapeModel,
        this.selectedShapeModel,
        offsetX,
        offsetY
      )
    );
  }

  createResizeStateCommand(
    pos: string,
    offsetX: number,
    offsetY: number
  ): Command {
    return new SetStateCommand(
      this.canvasViewModel,
      new ResizeState(
        this.canvasViewModel,
        this.shapeModel,
        this.selectedShapeModel,
        pos,
        offsetX,
        offsetY
      )
    );
  }
}

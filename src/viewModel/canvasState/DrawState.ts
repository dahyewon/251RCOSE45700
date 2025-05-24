import { Command } from "../../command/Command";
import { CommandManager } from "../../command/CommandManager";
import { CanvasStateType } from "../../constants";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

export class DrawState implements ICanvasState {
  private shapeModel = ShapeModel.getInstance();
  private selectedShapeModel = SelectedShapeModel.getInstance();
  private commandManager = CommandManager.getInstance();
  private drawing = false;

  constructor(private viewModel: CanvasViewModel) {}

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;

    this.commandManager.execute("START_DRAW", { offsetX, offsetY });

    this.drawing = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (!this.drawing) return;

    this.commandManager.execute("CONTINUE_DRAW", {
      offsetX,
      offsetY,
    });
  }

  handleMouseUp(): Command | void {
    if (!this.drawing) return;
    this.drawing = false;

    this.commandManager.execute("END_DRAW");
    this.viewModel.setState(CanvasStateType.SELECT); // switch back to select state
  }
  handleDoubleClick(event: React.MouseEvent): void {}
}

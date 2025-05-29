import { Command } from "../../command/Command";
import { CommandManager } from "../../command/CommandManager";
import { CanvasStateType } from "../../constants";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

export class DrawState implements ICanvasState {
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
    this.viewModel.notifyShapesUpdated();
  }

  handleMouseUp(): Command | void {
    if (!this.drawing) return;
    this.drawing = false;

    this.commandManager.execute("END_DRAW");
    this.viewModel.notifyShapesUpdated();

    this.commandManager.execute("SET_STATE", {
      stateType: CanvasStateType.SELECT,
    });
  }
  handleDoubleClick(event: React.MouseEvent): void {}
}

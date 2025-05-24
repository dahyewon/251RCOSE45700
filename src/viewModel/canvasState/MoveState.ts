import { CommandManager } from "../../command/CommandManager";
import { CanvasStateType } from "../../constants";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

// 이동 모드
export class MoveState implements ICanvasState {
  private commandManager = CommandManager.getInstance();
  private moving = false;

  constructor(private viewModel: CanvasViewModel) {
    this.moving = true;
  }

  handleMouseDown(event: React.MouseEvent): void {
    this.moving = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    if (!this.moving) return;
    const { offsetX, offsetY } = event.nativeEvent;

    this.commandManager.execute("CONTINUE_MOVE", {
      offsetX,
      offsetY,
    });
  }

  handleMouseUp(): void {
    this.moving = false;
    this.viewModel.setState(CanvasStateType.SELECT); // switch back to select state
  }
  handleDoubleClick(event: React.MouseEvent): void {}
}

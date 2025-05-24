import { CanvasModel } from "../model/CanvasModel";
import { Command } from "./Command";

export class SetStateCommand implements Command {
  private canvasModel: CanvasModel = CanvasModel.getInstance();
  private state: string;

  constructor(state: string) {
    this.state = state;
  }
  execute() {
    this.canvasModel.setState(this.state);
  }

  undo(): void {
    return;
  }
  redo(): void {
    return;
  }
}

import { CanvasModel } from "../model/CanvasModel";
import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class CanvasResetCommand implements Command {
  private canvasModel: CanvasModel = CanvasModel.getInstance();
  private shapeModel: ShapeModel = ShapeModel.getInstance();

  execute(): void {
    this.shapeModel.clearShapes();
    this.shapeModel.clearSelectedShapes();
    this.canvasModel.setShapeType("rectangle"); // default 값으로
    this.canvasModel.setState("DrawState"); // default: 그리기 모드

    // 만약 입력창이 남아있다면 삭제
    // this.canvasViewModel.notifyResetInput();
  }

  redo(): void {
    this.execute();
  }
  undo(): void {
    // Undo logic if needed
  }
}

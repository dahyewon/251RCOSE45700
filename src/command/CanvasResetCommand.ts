import { CanvasModel } from "../model/CanvasModel";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";
import { Command } from "./Command";

export class CanvasResetCommand implements Command {
  private canvasModel: CanvasModel;
  private shapeModel: ShapeModel;
  private selectedShapeModel: SelectedShapeModel;

  constructor() {
    this.canvasModel = CanvasModel.getInstance();
    this.shapeModel = ShapeModel.getInstance();
    this.selectedShapeModel = SelectedShapeModel.getInstance();
  }

  execute(): void {
    this.shapeModel.clearShapes();
    this.selectedShapeModel.clearSelectedShapes();
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

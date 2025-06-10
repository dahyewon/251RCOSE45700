import { CanvasStateType, PROPERTY_NAMES } from "../../constants";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

export class EditTextState implements ICanvasState {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  private editingShapeId: number | null = null;

  constructor(private viewModel: CanvasViewModel) {
    const shape = this.viewModel.getSelectedShapes()[0];
    if (shape && "isTyping" in shape) {
      this.editingShapeId = shape.id;
      shape.isTyping = true;
      const props = this.shapeModel.getTextShapeProperties();
      this.viewModel.notifyShowTextInput({
        ...props,
      });
    }
  }

  public saveText(newText: string) {
    if (this.editingShapeId !== null) {
      const changedShape = this.shapeModel.setProperty(
        this.editingShapeId,
        PROPERTY_NAMES.TEXT_CONTENT,
        newText
      );
      if ("isTyping" in changedShape) {
        changedShape.isTyping = false;
      }
      this.editingShapeId = null;
    }
    this.viewModel.setState(CanvasStateType.SELECT);
    this.viewModel.notifyHideTextInput();
  }

  handleMouseDown(event: React.MouseEvent): void {
    this.viewModel.notifyHideTextInput();
    this.viewModel.setState(CanvasStateType.SELECT);
  }
  handleMouseMove(): void {}
  handleMouseUp(): void {}
  handleDoubleClick(event: React.MouseEvent): void {}
}

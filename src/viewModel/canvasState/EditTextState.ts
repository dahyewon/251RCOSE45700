import { CanvasStateType, PROPERTY_NAMES } from "../../constants";
import { TextShape } from "../../entity/shape";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";

export class EditTextState implements ICanvasState {
  private shapeModel: ShapeModel = ShapeModel.getInstance();
  private selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  private editingShapeId: number | null = null;

  constructor(private viewModel: CanvasViewModel) {
    const shape = this.viewModel.getSelectedShapes()[0];
    if (shape instanceof TextShape) {
      this.editingShapeId = shape.id;
      shape.isEditing = true;
      const props = this.selectedShapeModel.getTextShapeProperties();
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
      if (changedShape instanceof TextShape) {
        changedShape.isEditing = false;
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

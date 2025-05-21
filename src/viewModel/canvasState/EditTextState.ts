import { PROPERTY_NAMES } from "../../constants";
import { TextShape } from "../../entity/shape";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { SelectState } from "./SelectState";

export class EditTextState implements ICanvasState {
    private editingShapeId: number | null = null;

    constructor(
      private viewModel: CanvasViewModel,
      private shapeModel: ShapeModel,
      private selectedShapeModel: SelectedShapeModel
    ) {
        const shape = this.selectedShapeModel.getSelectedShapes()[0];
        if (shape instanceof TextShape) {
            this.editingShapeId = shape.id;
            shape.isEditing = true;
            const props = this.selectedShapeModel.getTextShapeProperties();
            this.viewModel.notifyShowTextInput({
                ...props
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
        this.viewModel.setState(
            new SelectState(this.viewModel, this.shapeModel, this.selectedShapeModel)
        );
        this.viewModel.notifyShapesUpdated();
        this.viewModel.notifyHideTextInput();
    }

    handleMouseDown(event: React.MouseEvent): void {
        this.viewModel.notifyHideTextInput();
        this.viewModel.setState(
            new SelectState(this.viewModel, this.shapeModel, this.selectedShapeModel)
        );
    }
    handleMouseMove(): void {}
    handleMouseUp(): void {}
    handleDoubleClick(event: React.MouseEvent): void {}
}
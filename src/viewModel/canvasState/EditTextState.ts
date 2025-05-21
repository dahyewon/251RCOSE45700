import { PROPERTY_NAMES } from "../../constants";
import { TextShapeProps } from "../../entity/shape/TextShape";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { SelectState } from "./SelectState";

export class EditTextState implements ICanvasState {
  private textarea: HTMLTextAreaElement | null = null;
  private editingShapeId: number | null = null;
  private textProps: TextShapeProps;

  constructor(
    private viewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel
  ) {
    this.textProps = this.selectedShapeModel.getTextShapeProperties();
    this.editingShapeId = this.textProps.id;
    this.createTextarea(this.editingShapeId);
  }
  private createTextarea(shapeId: number) {
    // const props = this.shapeModel.getTextShapeProperties(shapeId);

    this.textarea = document.createElement("textarea");
    this.textarea.className = "canvas-textarea";
    this.textarea.value = this.textProps.textContent;

    const minX = Math.min(this.textProps.startX, this.textProps.endX);
    const minY = Math.min(this.textProps.startY, this.textProps.endY);
    const width = Math.abs(this.textProps.endX - this.textProps.startX);
    const height = Math.abs(this.textProps.endY - this.textProps.startY);

    this.textarea.style.position = "absolute";
    this.textarea.style.left = `${minX}px`;
    this.textarea.style.top = `${minY}px`;
    this.textarea.style.width = `${width}px`;
    this.textarea.style.height = `${height}px`;

    this.textarea.style.fontSize = `${this.textProps.fontSize}px`;
    this.textarea.style.fontFamily = this.textProps.fontFamily;
    this.textarea.style.color = this.textProps.color;

    // this.textarea.style.lineHeight = "normal";
    this.textarea.style.lineHeight = `${height}px`; // 가운데에 글자가 오도록 만들다보니 lineHeight를 높이값으로 줌
    // 장: 원래 쓰던 장소에 예쁘게 들어간다
    // 단: 1줄만 쓸 수 있음...(일단은..)

    this.textarea.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        // 기본 동작(줄바꿈) 방지
        event.preventDefault();
        this.commitText();
      }
      // (선택 사항) Shift + Enter는 줄바꿈 등...
    });

    document.body.appendChild(this.textarea);
    this.textarea.focus();
    this.textarea.select();
  }

  private commitText() {
    if (this.textarea && this.editingShapeId !== null) {
      const newText = this.textarea.value;
      this.shapeModel.setProperty(
        this.editingShapeId,
        PROPERTY_NAMES.TEXT_CONTENT,
        newText
      );

      document.body.removeChild(this.textarea);
      this.textarea = null;
      this.editingShapeId = null;
    }

    this.viewModel.setState(
      new SelectState(this.viewModel, this.shapeModel, this.selectedShapeModel)
    );
    this.viewModel.notifyShapesUpdated();
  }

  handleMouseDown(event: React.MouseEvent): void {
    this.commitText();
  }

  handleMouseMove(): void {}
  handleMouseUp(): void {}
  handleDoubleClick(event: React.MouseEvent): void {}
}

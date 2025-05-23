import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";
import { ICanvasState } from "./CanvasState";
import { EditTextState } from "./EditTextState";
import { MoveState } from "./MoveState";

// 선택 모드
export class SelectState implements ICanvasState {
  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
  private selecting = false;
  constructor(
    private canvasViewModel: CanvasViewModel,
    private shapeModel: ShapeModel,
    private selectedShapeModel: SelectedShapeModel
  ) {}

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;

    if (this.checkShapeClick(offsetX, offsetY)) return; // 선택한 위치에 도형이 있다면 MoveState로 전환

    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;

    this.selecting = true;
    this.selectedShapeModel.clearSelectedShapes();
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시
    if (!this.selecting) return;

    this.endX = offsetX;
    this.endY = offsetY;

    const shapes = this.shapeModel.selectShapes(
      this.startX,
      this.startY,
      this.endX,
      this.endY
    );
    this.selectedShapeModel.updateSelectedShapes(shapes);
  }

  handleMouseUp(): void {
    this.selecting = false;
  }

  handleDoubleClick(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    const clickedShape = this.selectedShapeModel.insertShapeText(
      offsetX,
      offsetY
    );
    if (clickedShape) {
      this.selectedShapeModel.updateSelectedShapes([clickedShape]);
      this.canvasViewModel.setState(new EditTextState(this.canvasViewModel));
    }
  }

  checkShapeClick(offsetX: number, offsetY: number): boolean {
    const clickedSelectedShape = this.selectedShapeModel.clickSelectedShape(
      offsetX,
      offsetY
    );
    if (clickedSelectedShape) {
      this.canvasViewModel.setState(
        new MoveState(
          this.canvasViewModel,
          this.shapeModel,
          this.selectedShapeModel,
          offsetX,
          offsetY
        )
      );
      return true;
    }

    const clickedShape = this.shapeModel.clickShape(offsetX, offsetY);
    if (clickedShape) {
      this.selectedShapeModel.updateSelectedShapes([clickedShape]); // 클릭한 도형을 선택
      this.canvasViewModel.setState(
        new MoveState(
          this.canvasViewModel,
          this.shapeModel,
          this.selectedShapeModel,
          offsetX,
          offsetY
        )
      );
      return true;
    }
    return false;
  }
}

import { Bindable } from "../core/Bindable";
import { Shape } from "../entity/shape/Shape";
import { CanvasModel } from "../model/CanvasModel";
import { SelectedShapeModel } from "../model/SelectedShapeModel";

export class ResizeHandleViewModel extends Bindable {
  private SelectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  private canvasModel: CanvasModel = CanvasModel.getInstance();
  private selectedShapes: Shape[] = [];
  private currentState: string = "DrawState";

  constructor() {
    super();
    const observer = {
      update: () => {
        this.selectedShapes = this.SelectedShapeModel.getSelectedShapes();
        this.currentState = this.canvasModel.getState();
        this.notify();
      },
    };
    this.SelectedShapeModel.subscribe(observer);
  }

  getSelectedShapes() {
    return this.selectedShapes;
  }

  startResizing(
    handle: { x: number; y: number; pos: string },
    event: React.MouseEvent
  ): void {
    event.stopPropagation(); // 부모 요소의 이벤트가 발생하지 않도록 함
    const canvas = (
      event.currentTarget as HTMLCanvasElement
    ).getBoundingClientRect();
    if (!canvas) return;

    return this.canvasModel.setState("ResizeState", {
      handle: handle,
      x: event.clientX - canvas.left,
      y: event.clientY - canvas.top,
    });
  }
}

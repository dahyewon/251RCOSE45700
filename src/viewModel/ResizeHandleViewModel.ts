import { Observable } from "../core/Observable";
import { Shape } from "../entity/shape/Shape";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { CanvasEvent } from "./CanvasEvents";

export class ResizeHandleViewModel extends Observable<any> {
  private SelectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  private selectedShapes: Shape[] = [];

  constructor() {
    super();
    const selectedShapeObserver = {
      update: (event: CanvasEvent<{ selectedShapes: Shape[] }>) => {
        this.selectedShapes = event.data.selectedShapes;
        this.notify(event);
      },
    };
    this.SelectedShapeModel.subscribe(
      "SELECTED_SHAPES_UPDATED",
      selectedShapeObserver
    );
  }

  getSelectedShapes() {
    return this.selectedShapes;
  }

  // startResizing(
  //   handle: { x: number; y: number; pos: string },
  //   event: React.MouseEvent
  // ): void {
  //   event.stopPropagation(); // 부모 요소의 이벤트가 발생하지 않도록 함
  //   const canvas = (
  //     event.currentTarget as HTMLCanvasElement
  //   ).getBoundingClientRect();
  //   if (!canvas) return;

  //   return this.canvasModel.setState(CanvasStateType.RESIZE, {
  //     handle: handle,
  //     x: event.clientX - canvas.left,
  //     y: event.clientY - canvas.top,
  //   });
  // }
}

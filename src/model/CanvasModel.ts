import { Observable } from "../core/Observable";
import { CanvasEvent } from "../viewModel/CanvasEvents";

export class CanvasModel extends Observable<any> {
  private static instance: CanvasModel;
  private state: string = "DrawState"; // default state
  private shapeType?: string = "rectangle"; // default shape type
  private stateProps?: any = null; // default state props

  public static getInstance(): CanvasModel {
    if (!CanvasModel.instance) {
      CanvasModel.instance = new CanvasModel();
    }
    return CanvasModel.instance;
  }

  notifyStateChanged() {
    const event: CanvasEvent<{
      currentState: string;
      shapeType: string;
      stateProps: any;
    }> = {
      type: "STATE_CHANGED",
      data: {
        currentState: this.getState(),
        shapeType: this.getShapeType(),
        stateProps: this.getStateProps(),
      },
    };
    this.notify(event);
  }

  public getState(): string {
    return this.state;
  }
  public setState(state: string, props?: any) {
    this.state = state;
    this.stateProps = props ? props : null;
    this.notifyStateChanged();
  }
  public getShapeType(): string {
    if (!this.shapeType) {
      this.shapeType = "rectangle"; // default shape type
    }
    return this.shapeType;
  }
  public setShapeType(type?: string) {
    if (type) this.shapeType = type;
    this.notifyStateChanged();
  }
  public getStateProps(): any {
    return this.stateProps;
  }
}

import { CanvasStateType } from "../constants";
import { Observable } from "../core/Observable";
import { CanvasModel } from "../model/CanvasModel";
import { CanvasEvent } from "./CanvasEvents";

export class ToolbarViewModel extends Observable<any> {
  public canvasModel: CanvasModel = CanvasModel.getInstance();
  private currentState: string = "DrawState"; // default state
  private shapeType?: string = "rectangle"; // default shape type
  private stateProps?: any = null; // default state props

  constructor() {
    super();
    const canvasStateObserver = {
      update: (
        event: CanvasEvent<{
          currentState: string;
          shapeType?: string;
          stateProps?: any;
        }>
      ) => {
        this.currentState = event.data.currentState;
        this.shapeType = event.data.shapeType;
        this.stateProps = event.data.stateProps;
        this.notify(event);
      },
    };
    this.canvasModel.subscribe("STATE_CHANGED", canvasStateObserver);
  }

  getShapeType() {
    return this.shapeType;
  }
  getState() {
    return this.currentState;
  }

  setState(state: string, props: any) {
    this.currentState = state;
    if (this.currentState === CanvasStateType.DRAW) {
      this.shapeType = props.shapeType;
      this.canvasModel.setShapeType(this.shapeType);
    }
    this.canvasModel.setState(state);
  }
}

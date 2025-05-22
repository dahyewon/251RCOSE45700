import { CanvasResetCommand } from "../command";
import { CanvasModel } from "../model/CanvasModel";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { ShapeModel } from "../model/ShapeModel";

export class ToolbarViewModel {
  private selectedShapeModel: SelectedShapeModel;
  private shapeModel: ShapeModel;
  private canvasModel: CanvasModel;
  private currentState: string = "DrawState"; // default state
  private shapeType: string = "rectangle"; // default shape type
  private listeners: (() => void)[] = [];
  constructor(
    shapeModel: ShapeModel,
    selectedShapeModel: SelectedShapeModel,
    canvasModel: CanvasModel
  ) {
    this.shapeModel = shapeModel;
    this.selectedShapeModel = selectedShapeModel;
    this.canvasModel = canvasModel;

    const observer = {
      update: () => {
        this.currentState = this.canvasModel.getCurrentState();
        this.shapeType = this.canvasModel.getShapeType();
      },
    };
    this.canvasModel.subscribe(observer);
  }

  onChange(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners.filter((listener) => listener !== fn);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }

  getShapeType() {
    return this.shapeType;
  }
  getState() {
    return this.currentState;
  }

  setState(state: string, props: any) {
    this.currentState = state;
    if (this.currentState === "DrawState") {
      this.shapeType = props.shapeType;
      this.canvasModel.setShapeType(this.shapeType);
    }
    this.canvasModel.setCanvasState(state);
  }

  //   requestResetCanvas() {
  //     const command = new CanvasResetCommand(
  //       this,
  //       this.shapeModel,
  //       this.selectedShapeModel
  //     );
  //     command.execute();
  //     this.notifyShapesUpdated();
  //   }

  // requestAddTemplateShape(type: string, properties: any) {
  //     const command = new AddTemplateShapeCommand(
  //       this,
  //       this.shapeModel,
  //       this.selectedShapeModel,
  //       type,
  //       properties
  //     );
  //     command.execute();
  //     this.notifyShapesUpdated();
  //   }
}

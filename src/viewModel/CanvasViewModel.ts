import { ShapeModel } from "../model/ShapeModel";
import React from "react";
import { Observable } from "../core/Observable";
import { Shape } from "../entity/shape/Shape";
import { CanvasEvent } from "./CanvasEvents";
import { ICanvasState } from "./canvasState/CanvasState";
import { DrawState } from "./canvasState/DrawState";
import { ResizeState } from "./canvasState/ResizeState";
import { SelectedShapeModel } from "../model/SelectedShapeModel";
import { CanvasStateFactory } from "./canvasState/CanvasStateCommandFactory";
import {
  AddTemplateShapeCommand,
  CanvasResetCommand,
  SetPropertyCommand,
  ZOrderMoveCommand,
} from "../command";
import { TextShapeProps } from "../entity/shape/TextShape";
import { CanvasModel } from "../model/CanvasModel";

export class CanvasViewModel extends Observable<any> {
  public shapeModel: ShapeModel = ShapeModel.getInstance();
  public selectedShapeModel: SelectedShapeModel =
    SelectedShapeModel.getInstance();
  private canvasModel: CanvasModel = CanvasModel.getInstance();
  private state: ICanvasState;
  private shapeType: string = "rectangle";
  private currentState: string = "DrawState";
  private shapes: Shape[] = [];
  private selectedShapes: Shape[] = [];

  constructor() {
    super();
    this.state = new DrawState(this, this.shapeType); //default: 그리기 모드

    const shapesObserver = {
      update: (event: CanvasEvent<{ shapes: Shape[] }>) => {
        this.shapes = event.data.shapes;
        this.notify(event);
      },
    };
    const selectedShapesObserver = {
      update: (event: CanvasEvent<{ selectedShapes: Shape[] }>) => {
        this.selectedShapes = event.data.selectedShapes;
        this.notify(event);
      },
    };
    const canvasStateObserver = {
      update: (event: CanvasEvent<any>) => {
        this.currentState = event.data.currentState;
        this.shapeType = event.data.shapeType;
        this.setState(this.currentState, this.shapeType, event.data.stateProps);
        this.notify(event);
      },
    };

    this.shapeModel.subscribe("SHAPES_UPDATED", shapesObserver);
    this.selectedShapeModel.subscribe(
      "SELECTED_SHAPES_UPDATED",
      selectedShapesObserver
    );
    this.canvasModel.subscribe("STATE_CHANGED", canvasStateObserver);
  }

  setState(state: string, shapeType: string, props: any) {
    //TODO: state factory로 변경
  }

  setShapeType(type: string) {
    this.shapeType = type;
  }

  handleMouseDown = (event: React.MouseEvent) => {
    this.state.handleMouseDown(event);
  };

  handleMouseMove = (event: React.MouseEvent) => {
    this.state.handleMouseMove(event);
  };

  handleMouseUp = () => {
    this.state.handleMouseUp();
  };

  handleDoubleClick = (event: React.MouseEvent) => {
    this.state.handleDoubleClick(event);
  };

  startResizing(
    handle: { x: number; y: number; pos: string },
    event: React.MouseEvent
  ): void {
    event.stopPropagation(); // 부모 요소의 이벤트가 발생하지 않도록 함
    const canvas = (
      event.currentTarget as HTMLCanvasElement
    ).getBoundingClientRect();
    if (!canvas) return;

    return this.setState(
      new ResizeState(
        this,
        this.shapeModel,
        this.selectedShapeModel,
        handle.pos,
        canvas.left - event.nativeEvent.offsetX,
        canvas.top - event.nativeEvent.offsetY
      )
    );
  }

  // requestSetState(stateType: string, params: any) {
  //   if (stateType === "DrawState") {
  //     this.setShapeType(params.shapeType); // shapeType을 DrawState에 전달
  //   } else this.setShapeType("");
  //   const command = this.canvasStateCommandFactory.createCommand(
  //     stateType,
  //     params
  //   );
  //   command.execute();
  // }

  getShapes() {
    return this.shapes;
  }
  getSelectedShapes() {
    return this.selectedShapes;
  }

  getShapeType() {
    return this.shapeType;
  }

  // requestZOrderMove(action: string, shapeId: number) {
  //   const command = new ZOrderMoveCommand(action, shapeId);
  //   command.execute();
  //   this.notifyShapesUpdated();
  // }

  // requestSetProperty(shapeId: number, propertyName: string, value: any) {
  //   const command = new SetPropertyCommand(shapeId, propertyName, value);
  //   command.execute();
  //   this.notifyShapesUpdated();
  // }

  // requestAddTemplateShape(type: string, properties: any) {
  //   const command = new AddTemplateShapeCommand(this, type, properties);
  //   command.execute();
  //   this.notifyShapesUpdated();
  // }

  // saveText(newText: string) {
  //   (this.state as any).saveText(newText);
  // }

  // notifyShowTextInput(props: TextShapeProps) {
  //   const event: CanvasEvent<TextShapeProps> = {
  //     type: "SHOW_TEXT_INPUT",
  //     data: props,
  //   };
  //   this.notify(event);
  // }

  // notifyHideTextInput() {
  //   const event: CanvasEvent<{}> = {
  //     type: "HIDE_TEXT_INPUT",
  //     data: {},
  //   };
  //   this.notify(event);
  // }
}

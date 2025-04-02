import { CanvasModel } from "../model/CanvasModel";
import React from "react";
import { Observable } from "../core/Observable";
import { Shape } from "../entity/Shape";
import { DrawingState, ICanvasState } from "./CanvasState";

export class CanvasViewModel extends Observable {
  private model: CanvasModel;
  private state: ICanvasState;

  private shapeType: string = "rectangle";

  constructor(model: CanvasModel) {
    super();
    this.model = model;
    this.state = new DrawingState(this); //default: 그리기 모드
  }

  setState(state: ICanvasState) {
    this.state = state;
  }

  setShapeType(type: string) {
    this.shapeType = type;
  }

  handleMouseDown = (event: React.MouseEvent) => {
    this.state.handleMouseDown(event);
  };

  handleMouseMove = (event: React.MouseEvent) => {
    this.state.handleMouseMove(event);
    this.notifyCanvas();
  };

  handleMouseUp = () => {
    this.state.handleMouseUp();
    this.notifyCanvas();
  };

  getShapes() {
    return this.state.getCurrentShapes();
  }

  getShapeType() {
    return this.shapeType;
  }

  //모델 관련 메서드 -> state에서 참조함
  getSavedShapes() {
    return this.model.getShapes();
  }

  getSelectedShapes() {
    return this.model.getSelectedShapes();
  }

  countShapes() {
    return this.model.countShapes();
  }

  addShape(shape: Shape) {
    return this.model.addShape(shape);
  }

  clearSelectedShapes() {
    return this.model.clearSelectedShapes();
  }

  addSelectedShapes(shape: Shape) {
    return this.model.addSelectedShapes(shape);
  }

  notifyCanvas() {
    this.notify([this.getShapes(), this.model.getSelectedShapes()]);
  }
}

import { CanvasModel } from "../model/CanvasModel";
import React from "react";
import { Observable } from "../core/Observable";
import { Shape } from "../entity/Shape";
import { DrawingState, ICanvasState, ResizeState } from "./CanvasState";

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

  startResizing(
    handle: { x: number; y: number; pos: string },
    event: React.MouseEvent
  ): void {
    event.stopPropagation(); // 부모 요소의 이벤트가 발생하지 않도록 함
    return this.setState(new ResizeState(this, handle.pos));
  }

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

  moveSelectedShapes(dx: number, dy: number) {
    return this.model.moveSelectedShapes(dx, dy);
  }

  resizeSelectedShapes(x: number, y: number, pos: string) {
    return this.model.resizeSelectedShapes(x, y, pos);
  }

  notifyCanvas() {
    this.notify([this.getShapes(), this.model.getSelectedShapes()]);
  }
}

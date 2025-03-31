import { CanvasModel } from "../model/CanvasModel";
import React from "react";
import { ShapeFactory } from "../entity/ShapeFactory";
import { Observable } from "../core/Observable";
import { Shape } from "../entity/Shape";

export class CanvasViewModel extends Observable {
  private model: CanvasModel;
  private drawing = false;
  private drawingShape: Shape | null = null;

  public shapeType: string = "rectangle"; //TODO: 하나의 prop으로 정리하기?
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private color: string = "black";

  constructor(model: CanvasModel) {
    super();
    this.model = model;
  }

  getShapes() {
    if (this.drawing) {
      return this.drawingShape
        ? [...this.model.getShapes(), this.drawingShape]
        : this.model.getShapes();
    }
    return this.model.getShapes();
  }

  handleMouseDown = (event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;
    console.log(this.startX, this.startY);
    this.drawing = true;
  };

  handleMouseMove = (event: React.MouseEvent) => {
    if (!this.drawing) return;

    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시

    this.endX = offsetX;
    this.endY = offsetY; // 실시간 반영

    this.drawingShape = ShapeFactory.createShape(this.shapeType, {
      id: this.model.countShapes(),
      startX: this.startX,
      startY: this.startY,
      endX: this.endX,
      endY: this.endY,
      color: this.color,
    });

    this.notify(this.getShapes());
  };

  handleMouseUp = () => {
    if (this.drawing) {
      this.model.addShape(
        ShapeFactory.createShape(this.shapeType, {
          id: this.model.countShapes(),
          startX: this.startX,
          startY: this.startY,
          endX: this.endX,
          endY: this.endY,
          color: this.color,
        })
      ); // Model에 추가
    }
    this.notify(this.getShapes());
    this.drawing = false;
  };
}

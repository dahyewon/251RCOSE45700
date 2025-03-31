import React from "react";
import { CanvasViewModel } from "./CanvasViewModel";
import { ShapeFactory } from "../entity/ShapeFactory";
import { Shape } from "../entity/Shape";

export interface ICanvasState {
  handleMouseDown(event: React.MouseEvent): void;
  handleMouseMove(event: React.MouseEvent): void;
  handleMouseUp(event: React.MouseEvent): void;
}

//TODO: viewModel에 있던 구현을 옮겨옴. model 메소드 호출을 제거하고 viewModel을 통해서 model 참조하도록 수정하기
export class DrawingState implements ICanvasState {
  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
  private color = "black";
  private drawingShape: Shape | null = null;
  private drawing = false;
  constructor(private viewModel: CanvasViewModel) {}

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;

    this.drawing = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시
    if (!this.drawing) return;

    this.endX = offsetX;
    this.endY = offsetY;

    this.drawingShape = ShapeFactory.createShape(this.viewModel.shapeType, {
      id: this.viewModel.getCountShapes(), //TODO: getCountShapes 추가
      startX: this.startX,
      startY: this.startY,
      endX: this.endX,
      endY: this.endY,
      color: this.color,
    });
  }

  handleMouseUp(event: React.MouseEvent): void {
    if (!this.drawing) return;
    this.drawing = false;
    if (this.drawingShape) {
      this.viewModel.addShape(this.drawingShape); //TODO: addShape 추가
      this.drawingShape = null; // reset drawing shape
    }
  }
}

export class SelectState implements ICanvasState {
  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;
  private selecting = false;
  constructor(private viewModel: CanvasViewModel) {}

  handleMouseDown(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;

    this.selecting = true; //TODO: 시작점이 도형 내부라면 바로 select, 아니라면 다중 select
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시
    if (!this.selecting) return;

    this.endX = offsetX;
    this.endY = offsetY;

    this.model.clearSelectedShapes(); //TODO: clearSelectedShapes 추가
    this.selectShapes(this.startX, this.startY, this.endX, this.endY);
  }

  handleMouseUp(event: React.MouseEvent): void {}

  selectShapes(startX: number, startY: number, endX: number, endY: number) {
    this.model.clearSelectedShapes();

    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);

    this.viewModel.getShapes().forEach((shape) => {
      if (
        ((minX <= shape.startX && shape.startX <= maxX) ||
          (minX <= shape.endX && shape.endX <= maxX)) &&
        ((minY <= shape.startY && shape.startY <= maxY) ||
          (minY <= shape.endY && shape.endY <= maxY))
      ) {
        this.model.addSelectedShapes(shape);
      }
    });
  }
}

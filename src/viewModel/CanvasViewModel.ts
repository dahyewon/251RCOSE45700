import { CanvasModel } from "../model/CanvasModel";
import React from "react";
import { ShapeFactory } from "../component/ShapeFactory";

export class CanvasViewModel {
  private model: CanvasModel;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private drawing = false;

  public shapeType: string = "rectangle"; //TODO: 하나의 prop으로 정리하기?
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private color: string = "black";

  constructor(model: CanvasModel) {
    this.model = model;
    this.model.subscribe(() => this.redrawCanvas()); // Model이 변경될 때 View 업데이트
  }

  initCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.redrawCanvas(); // 초기 렌더링
  }

  handleMouseDown = (event: React.MouseEvent) => {
    if (!this.ctx || !this.canvas) return;
    this.drawing = true;

    const { offsetX, offsetY } = event.nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;
  };

  handleMouseMove = (event: React.MouseEvent) => {
    if (!this.drawing || !this.canvas) return;

    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시

    this.endX = offsetX;
    this.endY = offsetY;
    this.redrawCanvas(); // 실시간 반영
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
    this.drawing = false;
  };

  private redrawCanvas() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 캔버스 초기화

    this.model.getShapes().forEach((shape) => shape.draw(this.ctx));

    if (this.drawing) {
      ShapeFactory.createShape(this.shapeType, {
        id: this.model.countShapes(),
        startX: this.startX,
        startY: this.startY,
        endX: this.endX,
        endY: this.endY,
        color: this.color,
      }).draw(this.ctx);
    }
  }
}

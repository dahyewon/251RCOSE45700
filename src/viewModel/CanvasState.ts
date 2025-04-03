import React from "react";
import { CanvasViewModel } from "./CanvasViewModel";
import { ShapeFactory } from "../entity/ShapeFactory";
import { Shape } from "../entity/Shape";

export interface ICanvasState {
  handleMouseDown(event: React.MouseEvent): void;
  handleMouseMove(event: React.MouseEvent): void;
  handleMouseUp(): void;
  getCurrentShapes(): Shape[];
}

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

    this.drawingShape = ShapeFactory.createShape(
      this.viewModel.getShapeType(),
      {
        id: this.viewModel.countShapes(),
        startX: this.startX,
        startY: this.startY,
        endX: this.endX,
        endY: this.endY,
        color: this.color,
      }
    );
  }

  handleMouseUp(): void {
    if (!this.drawing) return;
    this.drawing = false;
    if (this.drawingShape) {
      this.viewModel.addShape(this.drawingShape);
      this.drawingShape = null; // reset drawing shape
    }
  }

  getCurrentShapes(): Shape[] {
    if (this.drawing) {
      return this.drawingShape
        ? [...this.viewModel.getSavedShapes(), this.drawingShape]
        : this.viewModel.getSavedShapes();
    }
    return this.viewModel.getSavedShapes();
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
    this.viewModel.clearSelectedShapes();

    if (this.checkShapeClick(offsetX, offsetY)) return; // 선택한 위치에 도형이 있다면 MoveState로 전환

    this.startX = offsetX;
    this.startY = offsetY;
    this.endX = offsetX;
    this.endY = offsetY;

    this.selecting = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return; // 변화 없으면 무시
    if (!this.selecting) return;

    this.endX = offsetX;
    this.endY = offsetY;

    this.viewModel.clearSelectedShapes();
    this.selectShapes(this.startX, this.startY, this.endX, this.endY);
  }

  handleMouseUp(): void {
    this.selecting = false;
    console.log(this.viewModel.getSelectedShapes());
  }

  selectShapes(startX: number, startY: number, endX: number, endY: number) {
    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);

    this.viewModel.getSavedShapes().forEach((shape) => {
      const shapeMinX = Math.min(shape.startX, shape.endX);
      const shapeMaxX = Math.max(shape.startX, shape.endX);
      const shapeMinY = Math.min(shape.startY, shape.endY);
      const shapeMaxY = Math.max(shape.startY, shape.endY);

      if (
        !(shapeMaxX < minX || maxX < shapeMinX) &&
        !(shapeMaxY < minY || maxY < shapeMinY)
      ) {
        this.viewModel.addSelectedShapes(shape);
      }
    });
  }

  getCurrentShapes(): Shape[] {
    return this.viewModel.getSavedShapes();
  }

  checkShapeClick(offsetX: number, offsetY: number): boolean {
    const shapes = this.viewModel.getSavedShapes();
    shapes.forEach((shape) => {
      if (
        offsetX >= Math.min(shape.startX, shape.endX) &&
        offsetX <= Math.max(shape.startX, shape.endX) &&
        offsetY >= Math.min(shape.startY, shape.endY) &&
        offsetY <= Math.max(shape.startY, shape.endY)
      ) {
        this.viewModel.addSelectedShapes(shape); // 클릭한 도형을 선택
        console.log("Selected shape:", this.viewModel.getSelectedShapes());
        this.viewModel.setState(
          new MoveState(this.viewModel, offsetX, offsetY)
        ); // 이동 상태로 전환
        return true;
      }
    });

    return false;
  }
}

export class MoveState implements ICanvasState {
  private startX: number = 0;
  private startY: number = 0;
  private endX: number = 0;
  private endY: number = 0;
  private moving = false;

  constructor(
    private viewModel: CanvasViewModel,
    offsetX: number,
    offsetY: number
  ) {
    this.startX = offsetX;
    this.startY = offsetY;
    this.moving = true;
  }

  handleMouseDown(event: React.MouseEvent): void {
    //? required?
    const { offsetX, offsetY } = event.nativeEvent;
    this.startX = offsetX;
    this.startY = offsetY;

    this.moving = true;
  }

  handleMouseMove(event: React.MouseEvent): void {
    if (!this.moving) return;
    const { offsetX, offsetY } = event.nativeEvent;
    if (offsetX === this.endX && offsetY === this.endY) return;

    console.log("MoveState", this.viewModel.getSelectedShapes());
    this.endX = offsetX;
    this.endY = offsetY;

    const dx = this.endX - this.startX;
    const dy = this.endY - this.startY;
    this.startX = offsetX;
    this.startY = offsetY;

    if (this.viewModel.getSelectedShapes().length > 0) {
      this.viewModel.moveSelectedShapes(dx, dy); // move selected shapes
    }
  }

  handleMouseUp(): void {
    this.moving = false;
    this.viewModel.setState(new SelectState(this.viewModel)); // switch back to select state
  }

  getCurrentShapes(): Shape[] {
    return this.viewModel.getSavedShapes();
  }
}

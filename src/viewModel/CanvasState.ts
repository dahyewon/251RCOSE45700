import React from "react";
import { CanvasViewModel } from "./CanvasViewModel";

export interface ICanvasState {
  handleMouseDown(event: React.MouseEvent): void;
  handleMouseMove(event: React.MouseEvent): void;
  handleMouseUp(event: React.MouseEvent): void;
}

export class DrawingState implements ICanvasState {
  constructor(private viewModel: CanvasViewModel) {}

  handleMouseDown(event: React.MouseEvent): void {}

  handleMouseMove(event: React.MouseEvent): void {}

  handleMouseUp(event: React.MouseEvent): void {}
}

export class SelectState implements ICanvasState {
  constructor(private viewModel: CanvasViewModel) {}

  handleMouseDown(event: React.MouseEvent): void {}

  handleMouseMove(event: React.MouseEvent): void {}

  handleMouseUp(event: React.MouseEvent): void {}
}

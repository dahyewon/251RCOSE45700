import React from "react";
import { Shape } from "../../entity/Shape";
import { Command } from "../../command/Command";

export interface ICanvasState {
  handleMouseDown(event: React.MouseEvent): Command | void;
  handleMouseMove(event: React.MouseEvent): Command | void;
  handleMouseUp(): Command | void;
  getCurrentShapes(): Shape[];
}

import { CanvasViewModel } from "../CanvasViewModel";
import { DrawState } from "./DrawState";
import { MoveState } from "./MoveState";
import { ResizeState } from "./ResizeState";
import { SelectState } from "./SelectState";
import { ICanvasState } from "./CanvasState";
import { CanvasStateType } from "../../constants";
import { EditTextState } from "./EditTextState";

export interface CanvasStateCreator {
  createState(
    canvasViewModel: CanvasViewModel,
    params?: any // 상태별로 필요한 추가 인자
  ): ICanvasState;
}

export class DrawStateCreator implements CanvasStateCreator {
  createState(
    canvasViewModel: CanvasViewModel,
    params: { shapeType: string }
  ): ICanvasState {
    return new DrawState(canvasViewModel, params.shapeType);
  }
}

export class SelectStateCreator implements CanvasStateCreator {
  createState(canvasViewModel: CanvasViewModel): ICanvasState {
    return new SelectState(canvasViewModel);
  }
}

export class MoveStateCreator implements CanvasStateCreator {
  createState(
    canvasViewModel: CanvasViewModel,
    params: { offsetX: number; offsetY: number }
  ): ICanvasState {
    return new MoveState(canvasViewModel, params.offsetX, params.offsetY);
  }
}

export class ResizeStateCreator implements CanvasStateCreator {
  createState(
    canvasViewModel: CanvasViewModel,
    params: { pos: string; offsetX: number; offsetY: number }
  ): ICanvasState {
    return new ResizeState(
      canvasViewModel,
      params.pos,
      params.offsetX,
      params.offsetY
    );
  }
}

export class EditTextStateCreator implements CanvasStateCreator {
  createState(canvasViewModel: CanvasViewModel): ICanvasState {
    return new EditTextState(canvasViewModel);
  }
}

export class CanvasStateCreator {
  private static CanvasStateCreators: Record<string, CanvasStateCreator> = {
    [CanvasStateType.DRAW]: new DrawStateCreator(),
    [CanvasStateType.SELECT]: new SelectStateCreator(),
    [CanvasStateType.MOVE]: new MoveStateCreator(),
    [CanvasStateType.RESIZE]: new ResizeStateCreator(),
  };

  static createState(
    canvasViewModel: CanvasViewModel,
    stateType: string,
    params: any
  ): ICanvasState {
    const creator = this.CanvasStateCreators[stateType];
    if (!creator) {
      throw new Error(`Unknown state type: ${stateType}`);
    }
    return creator.createState(canvasViewModel, params);
  }
}

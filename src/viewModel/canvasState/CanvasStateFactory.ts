import { CanvasViewModel } from "../CanvasViewModel";
import { DrawState } from "./DrawState";
import { MoveState } from "./MoveState";
import { ResizeState } from "./ResizeState";
import { SelectState } from "./SelectState";
import { ICanvasState } from "./CanvasState";
import { CanvasStateType } from "../../constants";
import { EditTextState } from "./EditTextState";

export interface CanvasStateCreator {
  createState(canvasViewModel: CanvasViewModel): ICanvasState;
}

export class DrawStateCreator implements CanvasStateCreator {
  createState(canvasViewModel: CanvasViewModel): ICanvasState {
    return new DrawState(canvasViewModel);
  }
}

export class SelectStateCreator implements CanvasStateCreator {
  createState(canvasViewModel: CanvasViewModel): ICanvasState {
    return new SelectState(canvasViewModel);
  }
}

export class MoveStateCreator implements CanvasStateCreator {
  createState(canvasViewModel: CanvasViewModel): ICanvasState {
    return new MoveState(canvasViewModel);
  }
}

export class ResizeStateCreator implements CanvasStateCreator {
  createState(canvasViewModel: CanvasViewModel): ICanvasState {
    return new ResizeState(canvasViewModel);
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
    [CanvasStateType.EDIT_TEXT]: new EditTextStateCreator(),
  };

  static createState(
    canvasViewModel: CanvasViewModel,
    stateType: string
  ): ICanvasState {
    const creator = this.CanvasStateCreators[stateType];
    if (!creator) {
      throw new Error(`Unknown state type: ${stateType}`);
    }
    return creator.createState(canvasViewModel);
  }
}

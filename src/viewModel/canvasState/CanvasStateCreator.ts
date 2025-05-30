import { Command } from "../../command/Command";
import { SelectedShapeModel } from "../../model/SelectedShapeModel";
import { ShapeModel } from "../../model/ShapeModel";
import { CanvasViewModel } from "../CanvasViewModel";

export interface CanvasStateCreator {
  createCommand(
    canvasViewModel: CanvasViewModel,
    shapeModel: ShapeModel,
    selectedShapeModel: SelectedShapeModel,
    params: any // 상태별로 필요한 추가 인자
  ): Command;
}

// export class DrawStateCreator implements CanvasStateCreator {
//   createCommand(
//     canvasViewModel: CanvasViewModel,
//     shapeModel: ShapeModel,
//     selectedShapeModel: SelectedShapeModel,
//     params: { shapeType: string }
//   ): Command {
//     return new SetStateCommand(
//       canvasViewModel,
//       new DrawState(
//         canvasViewModel,
//         params.shapeType
//       )
//     );
//   }
// }

// export class SelectStateCreator implements CanvasStateCreator {
//   createCommand(
//     canvasViewModel: CanvasViewModel,
//     shapeModel: ShapeModel,
//     selectedShapeModel: SelectedShapeModel,
//     params: {}
//   ): Command {
//     return new SetStateCommand(
//       canvasViewModel,
//       new SelectState(canvasViewModel, shapeModel, selectedShapeModel)
//     );
//   }
// }

// export class MoveStateCreator implements CanvasStateCreator {
//   createCommand(
//     canvasViewModel: CanvasViewModel,
//     shapeModel: ShapeModel,
//     selectedShapeModel: SelectedShapeModel,
//     params: { offsetX: number; offsetY: number }
//   ): Command {
//     return new SetStateCommand(
//       canvasViewModel,
//       new MoveState(
//         canvasViewModel,
//         shapeModel,
//         selectedShapeModel,
//         params.offsetX,
//         params.offsetY
//       )
//     );
//   }
// }

// export class ResizeStateCreator implements CanvasStateCreator {
//   createCommand(
//     canvasViewModel: CanvasViewModel,
//     params: { pos: string; offsetX: number; offsetY: number }
//   ): ICanvasState {
//     return new ResizeState(
//       canvasViewModel,
//       params.pos,
//       params.offsetX,
//       params.offsetY
//     );
//   }
// }

// export class CanvasStateFactory {
//   private static CanvasStateCreators: Record<string, CanvasStateCreator> = {
//     [CanvasStateType.DRAW]: new DrawStateCreator(),
//     [CanvasStateType.SELECT]: new SelectStateCreator(),
//     [CanvasStateType.MOVE]: new MoveStateCreator(),
//     [CanvasStateType.RESIZE]: new ResizeStateCreator(),
//   };
// }

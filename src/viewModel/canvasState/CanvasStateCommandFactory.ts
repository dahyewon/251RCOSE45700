// import { Command } from "../../command/Command";
// import { CanvasModel } from "../../model/CanvasModel";
// import { SelectedShapeModel } from "../../model/SelectedShapeModel";
// import { ShapeModel } from "../../model/ShapeModel";
// import { CanvasViewModel } from "../CanvasViewModel";
// import {
//   CanvasStateCreator,
//   DrawStateCreator,
//   MoveStateCreator,
//   ResizeStateCreator,
//   SelectStateCreator,
// } from "./CanvasStateCreator";

// export class CanvasStateFactory {
//   private creators: Record<string, CanvasStateCreator> = {
//     DrawState: new DrawStateCreator(),
//     SelectState: new SelectStateCreator(),
//     MoveState: new MoveStateCreator(),
//     ResizeState: new ResizeStateCreator(),
//   };

//   private canvasViewModel: CanvasViewModel;
//   private shapeModel: ShapeModel = ShapeModel.getInstance();
//   private selectedShapeModel: SelectedShapeModel =
//     SelectedShapeModel.getInstance();
//   private canvasModel: CanvasModel = CanvasModel.getInstance();

//   constructor(canvasViweModel: CanvasViewModel) {
//     this.canvasViewModel = canvasViweModel;
//   }

//   createCommand(stateType: string, params: any): Command {
//     const creator = this.creators[stateType];
//     if (!creator) {
//       throw new Error(`Unknown state type: ${stateType}`);
//     }
//     return creator.createCommand(
//       this.canvasViewModel,
//       this.shapeModel,
//       this.selectedShapeModel,
//       params
//     );
//   }
// }

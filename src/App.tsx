import React from "react";
import Canvas from "./view/Canvas";
import { CanvasViewModel } from "./viewModel/CanvasViewModel";
import Toolbar from "./view/Toolbar";
import ResizeHandle from "./view/ResizeHandle";
import PropertyWindow from "./view/PropertyWindow";
import { ShapeModel } from "./model/ShapeModel";
import { SelectedShapeModel } from "./model/SelectedShapeModel";
import { CanvasModel } from "./model/CanvasModel";
import { PropertyWindowViewModel } from "./viewModel/PropertyWindowViewModel";
import { ToolbarViewModel } from "./viewModel/ToolbarViewModel";
import { ResizeHandleViewModel } from "./viewModel/ResizeHandleViewModel";

const App: React.FC = () => {
  //initialize models
  const shapeModel = ShapeModel.getInstance();
  const selectedShapeModel = SelectedShapeModel.getInstance();
  const canvasModel = CanvasModel.getInstance();

  const canvasViewModel = new CanvasViewModel();
  const propertyWindowViewModel = new PropertyWindowViewModel();
  const toolbarViewModel = new ToolbarViewModel();
  const resizeHandleViewModel = new ResizeHandleViewModel();

  return (
    <div>
      {/* <h1></h1> */}
      <div style={{ display: "flex", flex: 1 }}>
        <Canvas viewModel={canvasViewModel} />
        <PropertyWindow viewModel={propertyWindowViewModel} />
      </div>
      <Toolbar viewModel={toolbarViewModel} />
      <ResizeHandle viewModel={resizeHandleViewModel} />
    </div>
  );
};

export default App;

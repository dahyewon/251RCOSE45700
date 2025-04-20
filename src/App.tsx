import React from "react";
import Canvas from "./view/Canvas";
import { CanvasViewModel } from "./viewModel/CanvasViewModel";
import Toolbar from "./view/Toolbar";
import ResizeHandle from "./view/ResizeHandle";
import PropertyWindow from "./view/PropertyWindow";
import { ShapeModel } from "./model/ShapeModel";
import { SelectedShapeModel } from "./model/SelectedShapeModel";
import { CanvasStateCommandFactory } from "./viewModel/canvasState/CanvasStateCommandFactory";

const App: React.FC = () => {
  const shapeModel = new ShapeModel();
  const selectedShapeModel = new SelectedShapeModel();
  const viewModel = new CanvasViewModel(shapeModel, selectedShapeModel);
  const canvasStateCommandFactory = new CanvasStateCommandFactory(
    viewModel,
    shapeModel,
    selectedShapeModel
  );

  return (
    <div>
      {/* <h1></h1> */}
      <div style={{ display: "flex", flex: 1 }}>
        <Canvas viewModel={viewModel} />
        <PropertyWindow viewModel={viewModel} />
      </div>
      <Toolbar
        viewModel={viewModel}
        canvasStateCommandFactory={canvasStateCommandFactory} // Pass the command
      />
      <ResizeHandle viewModel={viewModel} />
    </div>
  );
};

export default App;

import React from "react";
import Canvas from "./view/Canvas";
import { CanvasViewModel } from "./viewModel/CanvasViewModel";
import Toolbar from "./view/Toolbar";
import ResizeHandle from "./view/ResizeHandle";
import PropertyWindow from "./view/PropertyWindow";
import { ShapeModel } from "./model/ShapeModel";
import { SelectedShapeModel } from "./model/SelectedShapeModel";

const App: React.FC = () => {
  const shapeModel = new ShapeModel();
  const selectedShapeModel = new SelectedShapeModel();
  const viewModel = new CanvasViewModel(shapeModel, selectedShapeModel);

  return (
    <div>
      {/* <h1></h1> */}
      <div style={{ display: "flex", flex: 1 }}>
        <Canvas viewModel={viewModel} />
        <PropertyWindow viewModel={viewModel} />
      </div>
      <Toolbar viewModel={viewModel} />
      <ResizeHandle viewModel={viewModel} />
    </div>
  );
};

export default App;

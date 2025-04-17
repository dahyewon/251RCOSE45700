import React from "react";
import Canvas from "./view/Canvas";
import { CanvasViewModel } from "./viewModel/CanvasViewModel";
import { CanvasModel } from "./model/CanvasModel";
import Toolbar from "./view/Toolbar";
import ResizeHandle from "./view/ResizeHandle";
import PropertyWindow from "./view/PropertyWindow";

const App: React.FC = () => {
  const model = new CanvasModel();
  const viewModel = new CanvasViewModel(model);

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

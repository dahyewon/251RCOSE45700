import React from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Shape } from "../entity/shape/Shape";
import { useCanvasStateListener } from "../hooks";
import "./ResizeHandle.css";

const ResizeHandle: React.FC<{ viewModel: CanvasViewModel }> = ({
  viewModel,
}) => {
  const selectedShapes = useCanvasStateListener<{
    shapes: Shape[];
    selectedShapes: Shape[];
  }>(
    viewModel,
    "SHAPES_UPDATED",
    { shapes: [], selectedShapes: [] },
    "selectedShapes"
  );

  return selectedShapes.map((shape) => (
    <React.Fragment key={shape.id}>
      <>
        {shape.getResizeHandles().map((handle) => (
          <div
            key={shape.id + handle.pos}
            className="resize-handle"
            style={{
              left: handle.x,
              top: handle.y,
            }}
            onMouseDown={(e) => viewModel.startResizing(handle, e)}
          />
        ))}
      </>
    </React.Fragment>
  ));
};

export default ResizeHandle;

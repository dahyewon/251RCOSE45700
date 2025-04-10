import React, { useEffect } from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Shape } from "../entity/Shape";

const ResizeHandle: React.FC<{ viewModel: CanvasViewModel }> = ({
  viewModel,
}) => {
  const [selectedShapes, setSelectedShapes] = React.useState(
    viewModel.getSelectedShapes()
  );

  useEffect(() => {
    const observer = {
      update: (updatedShapes: Shape[][]) => {
        const selectedShape = updatedShapes[1];
        setSelectedShapes([...selectedShape]);
      },
    };
    viewModel.subscribe(observer);
    return () => {
      viewModel.unsubscribe(observer);
    };
  }, []);

  return selectedShapes.map((shape) => (
    <React.Fragment key={shape.id}>
      <>
        {shape.getResizeHandles().map((handle) => (
          <div
            key={shape.id + handle.pos}
            className="resize-handle"
            style={{
              position: "absolute",
              left: handle.x,
              top: handle.y,
              width: 10,
              height: 10,
              backgroundColor: "blue",
              cursor: "pointer",
            }}
            onMouseDown={(e) => viewModel.startResizing(handle, e)}
          />
        ))}
      </>
    </React.Fragment>
  ));
};

export default ResizeHandle;

import React, { useEffect, useState } from "react";
import "./ResizeHandle.css";
import { ResizeHandleViewModel } from "../viewModel/ResizeHandleViewModel";
import { CommandManager } from "../command/CommandManager";

const ResizeHandle: React.FC<{ viewModel: ResizeHandleViewModel }> = ({
  viewModel,
}) => {
  const commandManager = CommandManager.getInstance();
  const [selectedShapes, setSelectedShapes] = useState(
    viewModel.getSelectedShapes()
  );

  useEffect(() => {
    const unsubscribe = viewModel.onChange(() => {
      setSelectedShapes(viewModel.getSelectedShapes());
    });
    return unsubscribe;
  }, [viewModel]);

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

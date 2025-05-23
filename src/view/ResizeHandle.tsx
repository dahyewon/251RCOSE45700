import React, { use, useEffect, useState } from "react";
import "./ResizeHandle.css";
import { ResizeHandleViewModel } from "../viewModel/ResizeHandleViewModel";
import { CommandManager } from "../command/CommandManager";
import { CanvasEvent } from "../viewModel/CanvasEvents";
import { useCanvasActionListener } from "../hooks";

const ResizeHandle: React.FC<{ viewModel: ResizeHandleViewModel }> = ({
  viewModel,
}) => {
  const commandManager = CommandManager.getInstance();
  const [selectedShapes, setSelectedShapes] = useState(
    viewModel.getSelectedShapes()
  );

  useCanvasActionListener(
    viewModel,
    "SELECTED_SHAPES_UPDATED",
    (event: CanvasEvent<{ selectedShapes: any[] }>) => {
      setSelectedShapes(event.data.selectedShapes);
    }
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

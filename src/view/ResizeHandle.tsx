import React, { useState } from "react";
import "./ResizeHandle.css";
import { ResizeHandleViewModel } from "../viewModel/ResizeHandleViewModel";
import { CommandManager } from "../command/CommandManager";
import { useCanvasActionListener } from "../hooks";
import { Shape } from "../entity/shape/Shape";

const ResizeHandle: React.FC<{ viewModel: ResizeHandleViewModel }> = ({
  viewModel,
}) => {
  const commandManager = CommandManager.getInstance();
  const [selectedShapes, setSelectedShapes] = useState(
    viewModel.getSelectedShapes()
  );
  const [version, setVersion] = useState(0);

  useCanvasActionListener(
    viewModel,
    "SELECTED_SHAPES_UPDATED",
    (data: { selectedShapes: Shape[] }) => {
      setSelectedShapes(data.selectedShapes);
      setVersion((v) => v + 1);
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
            onMouseDown={(e) => {
              commandManager.execute("SET_STATE", {
                stateType: "ResizeState",
              });
              commandManager.execute("START_RESIZE", {
                pos: handle.pos,
                offsetX: e.clientX,
                offsetY: e.clientY,
              });
            }}
          />
        ))}
      </>
    </React.Fragment>
  ));
};

export default ResizeHandle;

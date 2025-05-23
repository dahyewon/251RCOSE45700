import React, { useEffect, useState } from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import "./PropertyWindow.css";
import { PropertyRendererFactory } from "../components/propertyRenderFactory";
import { CommandManager } from "../command/CommandManager";
import { CommandType } from "../constants";

const PropertyWindow: React.FC<{ viewModel: CanvasViewModel }> = ({
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
    return () => unsubscribe();
  }, [viewModel]);

  if (selectedShapes.length === 0) {
    return (
      <div className="property-window-container">
        <p className="emptyText">선택된 도형이 없습니다.</p>
      </div>
    );
  }

  if (selectedShapes.length === 1) {
    return (
      <div className="property-window-container">
        <h3 className="title">도형 속성</h3>
        <div className="type">
          <span>타입:</span>{" "}
          <strong>{selectedShapes[0].constructor.name}</strong>
        </div>
        <div className="property">
          {selectedShapes[0].getProperties().map((property) => {
            return PropertyRendererFactory.createRenderer(
              property.type,
              property.name,
              property.value,
              (newValue) => {
                commandManager.execute(CommandType.SET_PROPERTY, {
                  shapeId: selectedShapes[0].id,
                  propertyName: property.name,
                  value: newValue,
                });
              }
            );
          })}
        </div>
        <div className="zorder-controls">
          <button
            className="zorder-btn"
            onClick={() => {
              commandManager.execute(CommandType.Z_ORDER_MOVE, {
                actionType: "forward",
                shapeId: selectedShapes[0].id,
              });
            }}
          >
            앞으로
          </button>
          <button
            className="zorder-btn"
            onClick={() => {
              commandManager.execute(CommandType.Z_ORDER_MOVE, {
                actionType: "backward",
                shapeId: selectedShapes[0].id,
              });
            }}
          >
            뒤로
          </button>
          <button
            className="zorder-btn"
            onClick={() => {
              commandManager.execute(CommandType.Z_ORDER_MOVE, {
                actionType: "toFront",
                shapeId: selectedShapes[0].id,
              });
            }}
          >
            맨 앞으로
          </button>
          <button
            className="zorder-btn"
            onClick={() => {
              commandManager.execute(CommandType.Z_ORDER_MOVE, {
                actionType: "toBack",
                shapeId: selectedShapes[0].id,
              });
            }}
          >
            맨 뒤로
          </button>
        </div>
      </div>
    );
  }
};

export default PropertyWindow;

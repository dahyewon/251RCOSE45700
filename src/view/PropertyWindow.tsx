import React, { useState } from "react";
import "./PropertyWindow.css";
import { PropertyRendererFactory } from "../components/propertyRenderFactory";
import { CommandManager } from "../command/CommandManager";
import { CommandType } from "../constants";
import { PropertyWindowViewModel } from "../viewModel/PropertyWindowViewModel";
import { useCanvasActionListener } from "../hooks";
import { Shape } from "../entity/shape/Shape";

const PropertyWindow: React.FC<{ viewModel: PropertyWindowViewModel }> = ({
  viewModel,
}) => {
  const commandManager = CommandManager.getInstance();
  const [selectedShapes, setSelectedShapes] = useState(
    viewModel.getSelectedShapes()
  );
  const [propertyValues, setPropertyValues] = useState<Record<string, any>>({});
  const [version, setVersion] = useState(0);

  useCanvasActionListener(
    viewModel,
    "SELECTED_SHAPES_UPDATED",
    (data: { selectedShapes: Shape[] }) => {
      setSelectedShapes(data.selectedShapes);
      setVersion((prevVersion) => prevVersion + 1);
      if (selectedShapes.length === 1) {
        const properties = selectedShapes[0].getProperties();
        const newPropertyValues: Record<string, any> = {};
        properties.forEach((property) => {
          newPropertyValues[property.name] = property.value;
        });
        setPropertyValues(newPropertyValues);
      }
    }
  );

  if (selectedShapes.length === 0) {
    return (
      <div className="property-window-container">
        <p className="emptyText">선택된 도형이 없습니다.</p>
      </div>
    );
  }

  if (selectedShapes.length === 1) {
    if (selectedShapes[0].isComposite()) {
      return (
        <div className="property-window-container">
          <button
            className="zorder-btn"
            onClick={() => {
              commandManager.execute(CommandType.UNGROUP, {
                shapeId: selectedShapes[0].id,
              });
            }}
          >
            그룹 해제
          </button>
        </div>
      );
    }

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
              propertyValues[property.name] ?? property.value,
              (newValue) => {
                setPropertyValues((prevValues) => ({
                  ...prevValues,
                  [property.name]: newValue,
                }));
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

  return (
    <div className="property-window-container">
      <button
        className="zorder-btn"
        onClick={() => {
          commandManager.execute(CommandType.GROUP);
        }}
      >
        그룹화
      </button>
    </div>
  );
};

export default PropertyWindow;

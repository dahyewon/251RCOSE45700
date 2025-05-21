import React from "react";
import { Shape } from "../entity/shape/Shape"; // Shape 인터페이스 또는 클래스 import 경로 맞춰줘
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import "./PropertyWindow.css";
import { PropertyRendererFactory } from "../components/propertyRenderFactory";
import { useCanvasStateListener } from "../hooks";

const PropertyWindow: React.FC<{ viewModel: CanvasViewModel }> = ({
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
                viewModel.requestSetProperty(
                  selectedShapes[0].id,
                  property.name,
                  newValue
                );
              }
            );
          })}
        </div>
        <div className="zorder-controls">
          <button
            className="zorder-btn"
            onClick={() => {
              viewModel.requestZOrderMove("forward", selectedShapes[0].id);
            }}
          >
            앞으로
          </button>
          <button
            className="zorder-btn"
            onClick={() => {
              viewModel.requestZOrderMove("backward", selectedShapes[0].id);
            }}
          >
            뒤로
          </button>
          <button
            className="zorder-btn"
            onClick={() => {
              viewModel.requestZOrderMove("toFront", selectedShapes[0].id);
            }}
          >
            맨 앞으로
          </button>
          <button
            className="zorder-btn"
            onClick={() => {
              viewModel.requestZOrderMove("toBack", selectedShapes[0].id);
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

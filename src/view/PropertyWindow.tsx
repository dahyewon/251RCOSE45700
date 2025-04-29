import React from "react";
import { Shape } from "../entity/shape/Shape"; // Shape 인터페이스 또는 클래스 import 경로 맞춰줘
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import useCanvasEvent from "../hooks/useCanvasEvent";
import "./PropertyWindow.css";

const PropertyWindow: React.FC<{ viewModel: CanvasViewModel }> = ({
  viewModel,
}) => {
  const selectedShapes = useCanvasEvent<{
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
      <div className="container">
        <p className="emptyText">선택된 도형이 없습니다.</p>
      </div>
    );
  }

  if (selectedShapes.length === 1) {
    return (
      <div className="container">
        <h3 className="title">도형 속성</h3>
        <div className="type">
          <span>타입:</span>{" "}
          <strong>{selectedShapes[0].constructor.name}</strong>
        </div>
        <div className="property">
          {selectedShapes[0].getProperties().map((property) => {
            if (
              property.name === "색" ||
              property.name === "테두리 색" ||
              property.name === "그림자 색"
            ) {
              return (
                <div key={property.name} className="propertyItem">
                  <span>{property.name}:</span>{" "}
                  <input
                    type="color"
                    value={property.value}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      viewModel.requestSetProperty(
                        selectedShapes[0].id,
                        property.name,
                        newValue
                      );
                    }}
                  />
                  <br />
                </div>
              );
            }
            if (property.editable) {
              return (
                <div key={property.name} className="propertyItem">
                  <span>{property.name}:</span>{" "}
                  <input
                    type="number"
                    value={property.value}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      viewModel.requestSetProperty(
                        selectedShapes[0].id,
                        property.name,
                        newValue
                      );
                    }}
                  />
                  <br />
                </div>
              );
            } else {
              return (
                <div key={property.name} className="propertyItem">
                  <span>{property.name}:</span>{" "}
                  <strong>{property.value}</strong>
                  <br />
                </div>
              );
            }
          })}
        </div>
        <button
          onClick={() => {
            viewModel.requestZOrderMove("forward", selectedShapes[0].id);
          }}
        >
          앞으로
        </button>
        <button
          onClick={() => {
            viewModel.requestZOrderMove("backward", selectedShapes[0].id);
          }}
        >
          뒤로
        </button>
        <button
          onClick={() => {
            viewModel.requestZOrderMove("toFront", selectedShapes[0].id);
          }}
        >
          맨 앞으로
        </button>
        <button
          onClick={() => {
            viewModel.requestZOrderMove("toBack", selectedShapes[0].id);
          }}
        >
          맨 뒤로
        </button>
      </div>
    );
  }
};

export default PropertyWindow;

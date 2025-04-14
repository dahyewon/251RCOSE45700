import React from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { DrawingState, SelectState } from "../viewModel/CanvasState";
import useCanvasEvent from "../hooks/useCanvasEvent";
import "./Toolbar.css";

const Toolbar: React.FC<{ viewModel: CanvasViewModel }> = ({ viewModel }) => {
  const initialState = { currentState: "DrawingState", drawingShape: "rectangle" } // 초기 상태 설정

  const currentState = useCanvasEvent<{ currentState: string; drawingShape?: string }>(
    viewModel,
    "STATE_CHANGED",
    initialState,
    "currentState"
  );

  const drawingShape = useCanvasEvent<{ currentState: string; drawingShape?: string }>(
    viewModel,
    "STATE_CHANGED",
    initialState,
    "drawingShape"
  );

  const isActive = (shapeType: string) =>
    currentState === "DrawingState" && drawingShape === shapeType;

  const isSelectActive = () => currentState === "SelectState" || currentState === "MoveState";

  return (
    <div className="toolbar">
      <button
        className={`tool-button ${isActive("rectangle") ? "active" : ""}`}
        onClick={() => {
          viewModel.setShapeType("rectangle");
          viewModel.setState(new DrawingState(viewModel));
        }}
      >
        ▭ 사각형
      </button>

      <button
        className={`tool-button ${isActive("ellipse") ? "active" : ""}`}
        onClick={() => {
          viewModel.setShapeType("ellipse");
          viewModel.setState(new DrawingState(viewModel));
        }}
      >
        ◯ 원
      </button>

      <button
        className={`tool-button ${isActive("line") ? "active" : ""}`}
        onClick={() => {
          viewModel.setShapeType("line");
          viewModel.setState(new DrawingState(viewModel));
        }}
      >
        ㅡ 선
      </button>

      <button
        className={`tool-button ${isSelectActive() ? "active" : ""}`}
        onClick={() => {
          viewModel.setShapeType("select");
          viewModel.setState(new SelectState(viewModel));
        }}
      >
        선택
      </button>
      
      <button
        className={`tool-button`}
        onClick={() => {
          viewModel.resetCanvas();
        }}
      >
        리셋
      </button>
    </div>
  );
};

export default Toolbar;

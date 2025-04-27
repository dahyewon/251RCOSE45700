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
      <button className={`tool-button`}>
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          📷 사진 업로드
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const imageUrl = reader.result as string;

                // 이미지 비율에 따라 크기 조정
                const img = new Image();
                img.src = imageUrl;
                img.onload = () => {
                  const aspectRatio = img.width / img.height;
                  const baseWidth = 150; // 기본 너비
                  const baseHeight = baseWidth / aspectRatio; // 비율에 따른 높이 계산

                  viewModel.clearSelectedShapes();
                  const shape = viewModel.addImageShape(imageUrl, baseWidth, baseHeight);
                  viewModel.addSelectedShapes(shape);
                  viewModel.setShapeType("select");
                  viewModel.setState(new SelectState(viewModel));
                };
                img.onerror = () => {
                  console.error("이미지 로드 실패:", file.name);
                };
              };
              reader.readAsDataURL(file);
            } else {
              console.error("파일이 선택되지 않았습니다.");
            }

            event.target.value = "";
          }}
        />
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

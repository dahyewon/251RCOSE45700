import React, { useEffect, useState } from "react";
import "./Toolbar.css";
import { DEFAULT_SHAPE } from "../constants";
import { useCursorByTool } from "../hooks";
import { ToolbarViewModel } from "../viewModel/ToolbarViewModel";
import { AddTemplateShapeCommand, CanvasResetCommand } from "../command";

const Toolbar: React.FC<{ viewModel: ToolbarViewModel }> = ({ viewModel }) => {
  const [currentState, setCurrentState] = useState(viewModel.getState());
  const [drawingShape, setDrawingShape] = useState(viewModel.getShapeType());

  useEffect(() => {
    const unsubscribe = viewModel.onChange(() => {
      setCurrentState(viewModel.getState());
      setDrawingShape(viewModel.getShapeType());
    });
    return unsubscribe;
  });

  const isActive = (shapeType: string) =>
    currentState === "DrawState" && drawingShape === shapeType;

  const isSelectActive = () =>
    currentState === "SelectState" ||
    currentState === "MoveState" ||
    currentState === "ResizeState";

  useCursorByTool(currentState);

  return (
    <div className="toolbar">
      <button
        className={`tool-button ${isActive("rectangle") ? "active" : ""}`}
        onClick={() => {
          viewModel.setState("DrawState", { shapeType: "rectangle" });
        }}
      >
        ▭ 사각형
      </button>

      <button
        className={`tool-button ${isActive("ellipse") ? "active" : ""}`}
        onClick={() => {
          viewModel.setState("DrawState", { shapeType: "ellipse" });
        }}
      >
        ◯ 원
      </button>

      <button
        className={`tool-button ${isActive("line") ? "active" : ""}`}
        onClick={() => {
          viewModel.setState("DrawState", { shapeType: "line" });
        }}
      >
        ㅡ 선
      </button>
      <button className="tool-button">
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          사진 업로드
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

                const img = new Image();
                img.src = imageUrl;
                img.onload = () => {
                  const aspectRatio = img.width / img.height;
                  const baseWidth = DEFAULT_SHAPE.WIDTH;
                  const baseHeight = Math.round(baseWidth / aspectRatio); // 비율에 따른 높이 계산

                  new AddTemplateShapeCommand(viewModel, "image", {
                    imageUrl,
                    width: baseWidth,
                    height: baseHeight,
                  }).execute();

                  viewModel.setState("SelectState", {});
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
        className={`tool-button ${isActive("text") ? "active" : ""}`}
        onClick={() => {
          new AddTemplateShapeCommand(viewModel, "text", {
            width: DEFAULT_SHAPE.WIDTH,
            height: DEFAULT_SHAPE.HEIGHT,
          }).execute();
          viewModel.setState("SelectState", {});
        }}
      >
        텍스트
      </button>

      <button
        className={`tool-button ${isSelectActive() ? "active" : ""}`}
        onClick={() => {
          viewModel.setState("SelectState", {});
        }}
      >
        선택
      </button>

      <button
        className={`tool-button`}
        onClick={() => {
          new CanvasResetCommand(viewModel).execute();
        }}
      >
        리셋
      </button>
    </div>
  );
};

export default Toolbar;

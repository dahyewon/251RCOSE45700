import React, { useState } from "react";
import "./Toolbar.css";
import { CommandType, DEFAULT_SHAPE } from "../constants";
import { useCanvasActionListener, useCursorByTool } from "../hooks";
import { ToolbarViewModel } from "../viewModel/ToolbarViewModel";
import { CommandManager } from "../command/CommandManager";
import { CanvasEvent } from "../viewModel/CanvasEvents";

const Toolbar: React.FC<{ viewModel: ToolbarViewModel }> = ({ viewModel }) => {
  const commandManager = CommandManager.getInstance();
  const [currentState, setCurrentState] = useState(viewModel.getState());
  const [drawingShape, setDrawingShape] = useState(viewModel.getShapeType());

  useCanvasActionListener(
    viewModel,
    "STATE_CHANGED",
    (data: { currentState: string; shapeType: string }) => {
      setCurrentState(data.currentState);
      setDrawingShape(data.shapeType);
    }
  );

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
          commandManager.execute(CommandType.SET_STATE, {
            stateType: "DrawState",
            shapeType: "rectangle",
          });
        }}
      >
        ▭ 사각형
      </button>

      <button
        className={`tool-button ${isActive("ellipse") ? "active" : ""}`}
        onClick={() => {
          commandManager.execute(CommandType.SET_STATE, {
            stateType: "DrawState",
            shapeType: "ellipse",
          });
        }}
      >
        ◯ 원
      </button>

      <button
        className={`tool-button ${isActive("line") ? "active" : ""}`}
        onClick={() => {
          commandManager.execute(CommandType.SET_STATE, {
            stateType: "DrawState",
            shapeType: "line",
          });
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

                  commandManager.execute(CommandType.ADD_TEMPLATE_SHAPE, {
                    shapeType: "image",
                    properties: {
                      imageUrl,
                      width: baseWidth,
                      height: baseHeight,
                    },
                  });

                  commandManager.execute(CommandType.SET_STATE, {
                    stateType: "SelectState",
                  });
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
          commandManager.execute(CommandType.ADD_TEMPLATE_SHAPE, {
            shapeType: "text",
            properties: {
              width: DEFAULT_SHAPE.WIDTH,
              height: DEFAULT_SHAPE.HEIGHT,
            },
          });
          commandManager.execute(CommandType.SET_STATE, {
            stateType: "SelectState",
          });
        }}
      >
        텍스트
      </button>

      <button
        className={`tool-button ${isSelectActive() ? "active" : ""}`}
        onClick={() => {
          commandManager.execute(CommandType.SET_STATE, {
            stateType: "SelectState",
          });
        }}
      >
        선택
      </button>

      <button
        className={`tool-button`}
        onClick={() => {
          commandManager.execute(CommandType.CANVAS_RESET);
        }}
      >
        리셋
      </button>
    </div>
  );
};

export default Toolbar;

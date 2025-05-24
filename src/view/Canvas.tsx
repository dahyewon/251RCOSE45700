import React, { useCallback, useEffect, useRef, useState } from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Shape } from "../entity/shape/Shape";
import { CANVAS } from "../constants";
import "./Canvas.css";
import { useCanvasActionListener, useCanvasStateListener } from "../hooks";

const Canvas: React.FC<{ viewModel: CanvasViewModel }> = ({ viewModel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [textInput, setTextInput] = useState<null | any>(null);
  const [didFocus, setDidFocus] = useState(false); // 추가

  const [shapes, setShapes] = useState<Shape[]>(viewModel.getShapes());

  useCanvasActionListener(
    viewModel,
    "SHAPES_UPDATED",
    (data: { shapes: Shape[] }) => {
      setShapes(data.shapes);
    }
  );
  useCanvasActionListener(viewModel, "RESET_INPUT_FIELDS", () => {
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach((textarea) => {
      textarea.remove();
    });
  });

  useCanvasActionListener<any>(viewModel, "SHOW_TEXT_INPUT", (props) => {
    setTextInput(props);
    setDidFocus(false);
  });
  useCanvasActionListener(viewModel, "HIDE_TEXT_INPUT", () => {
    setTextInput(null);
    setDidFocus(false);
  });

  const handleTextInputKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      textareaRef.current?.blur();
    }
  };

  //캔버스 렌더링
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      shape.draw(ctx);
    });
  }, [shapes]);

  useEffect(() => {
    if (canvasRef.current) {
      redrawCanvas();
    }
  }, [shapes, canvasRef, redrawCanvas]);

  useEffect(() => {
    if (textInput && textareaRef.current && !didFocus) {
      textareaRef.current.focus();
      textareaRef.current.select();
      setDidFocus(true);
    }
  }, [textInput, didFocus]);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={CANVAS.WIDTH}
        height={CANVAS.HEIGHT}
        onMouseDown={(e) => {
          textareaRef.current?.blur();
          viewModel.handleMouseDown(e);
        }}
        onMouseMove={viewModel.handleMouseMove}
        onMouseUp={viewModel.handleMouseUp}
        onDoubleClick={viewModel.handleDoubleClick}
        style={{ border: "1px solid black" }}
      />
      {textInput && (
        <textarea
          ref={textareaRef}
          className="canvas-textarea"
          style={{
            position: "absolute",
            left:
              textInput.startX < textInput.endX
                ? textInput.startX
                : textInput.endX,
            top:
              textInput.startY < textInput.endY
                ? textInput.startY
                : textInput.endY,
            width: Math.abs(textInput.endX - textInput.startX),
            height: Math.abs(textInput.endY - textInput.startY),
            fontSize: textInput.fontSize,
            fontFamily: textInput.fontFamily,
            color: textInput.color,
            lineHeight: `${Math.abs(textInput.endY - textInput.startY)}px`,
            resize: "none",
          }}
          value={textInput.textContent}
          onBlur={() => {
            viewModel.saveText(textInput.textContent);
            setTextInput(null);
          }}
          onKeyDown={handleTextInputKeyDown}
          onChange={(e) => {
            setTextInput({ ...textInput, textContent: e.target.value });
          }}
        />
      )}
    </div>
  );
};

export default Canvas;

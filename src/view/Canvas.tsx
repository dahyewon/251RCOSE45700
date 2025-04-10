import React, { useCallback, useEffect, useRef, useState } from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Shape } from "../entity/Shape";
import ResizeHandle from "./ResizeHandle";

const Canvas: React.FC<{ viewModel: CanvasViewModel }> = ({ viewModel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<Shape[]>(viewModel.getShapes());
  const [selectedShapes, setSelectedShapes] = useState<Shape[]>(
    viewModel.getSelectedShapes()
  );

  //set observer
  useEffect(() => {
    const observer = {
      update: (updatedShapes: Shape[][]) => {
        const drawShapes = updatedShapes[0];
        const selectedShape = updatedShapes[1];
        setShapes([...drawShapes]);
        setSelectedShapes([...selectedShape]);
      },
    };
    viewModel.subscribe(observer);

    return () => {
      viewModel.unsubscribe(observer);
    };
  }, []);

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
  }, [canvasRef, redrawCanvas]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={viewModel.handleMouseDown}
      onMouseMove={viewModel.handleMouseMove}
      onMouseUp={viewModel.handleMouseUp}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Canvas;

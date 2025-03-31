import React, { useCallback, useEffect, useRef, useState } from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { Shape } from "../entity/Shape";

const Canvas: React.FC<{ viewModel: CanvasViewModel }> = ({ viewModel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<Shape[]>(viewModel.getShapes());

  //set observer
  useEffect(() => {
    const observer = {
      update: (updatedShapes: Shape[]) => setShapes([...updatedShapes]),
    };
    viewModel.subscribe(observer);

    return () => {
      viewModel.unsubscribe(observer);
    };
  }, []);

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

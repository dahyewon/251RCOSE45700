import React from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { DrawingState, SelectState } from "../viewModel/CanvasState";
import "./Toolbar.css";

const Toolbar: React.FC<{ viewModel: CanvasViewModel }> = ({
  viewModel,
}) => {
  return (
    <div className="toolbar">
      <button
        className='tool-button'
        onClick={() => {
          viewModel.setShapeType("rectangle");
          viewModel.setState(new DrawingState(viewModel));
        }}
      >
        ▭ 사각형
      </button>

      <button
        className='tool-button'
        onClick={() => {
          viewModel.setShapeType("ellipse");
          viewModel.setState(new DrawingState(viewModel));
        }}
      >
        ◯ 원
      </button>

      <button
        className='tool-button'
        onClick={() => {
          viewModel.setShapeType("line");
          viewModel.setState(new DrawingState(viewModel));
        }}
      >
        ㅡ 선
      </button>

      <button
        className='tool-button'
        onClick={() => {
          viewModel.setShapeType("select");
          viewModel.setState(new SelectState(viewModel));
        }}
      >
        선택
      </button>
    </div>
  );
};

export default Toolbar;

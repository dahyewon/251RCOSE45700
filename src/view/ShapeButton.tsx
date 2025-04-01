import React from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";
import { DrawingState, SelectState } from "../viewModel/CanvasState";

const ShapeButton: React.FC<{ viewModel: CanvasViewModel }> = ({
  viewModel,
}) => {
  return (
    <fieldset>
      <div>
        <input
          type="radio"
          id="rectangle"
          name="shapeType"
          value="rectangle"
          onChange={() => {
            viewModel.setShapeType("rectangle");
            viewModel.setState(new DrawingState(viewModel)); // 상태 변경
          }}
        />
        <label>사각형</label>
      </div>

      <div>
        <input
          type="radio"
          id="ellipse"
          name="shapeType"
          value="ellipse"
          onChange={() => {
            viewModel.setShapeType("ellipse");
            viewModel.setState(new DrawingState(viewModel)); // 상태 변경
          }}
        />
        <label>원</label>
      </div>

      <div>
        <input
          type="radio"
          id="select"
          name="shapeType"
          value="select"
          onChange={() => {
            viewModel.setShapeType("select");
            viewModel.setState(new SelectState(viewModel)); // 상태 변경
          }}
        />
        <label>선택</label>
      </div>
    </fieldset>
  );
};

export default ShapeButton;

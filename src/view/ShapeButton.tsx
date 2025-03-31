import React from "react";
import { CanvasViewModel } from "../viewModel/CanvasViewModel";

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
          onChange={() => (viewModel.shapeType = "rectangle")}
        />
        <label>사각형</label>
      </div>

      <div>
        <input
          type="radio"
          id="ellipse"
          name="shapeType"
          value="ellipse"
          onChange={() => (viewModel.shapeType = "ellipse")}
        />
        <label>원</label>
      </div>

      <div>
        <input
          type="radio"
          id="select"
          name="shapeType"
          value="select"
          onChange={() => (viewModel.shapeType = "select")}
        />
        <label>선택</label>
      </div>
    </fieldset>
  );
};

export default ShapeButton;

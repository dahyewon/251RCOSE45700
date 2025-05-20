export type CanvasEventType = "SHAPES_UPDATED" | "STATE_CHANGED" | "RESET_INPUT_FIELDS";

export interface CanvasEvent<T> {
  type: CanvasEventType;
  data: T;
}
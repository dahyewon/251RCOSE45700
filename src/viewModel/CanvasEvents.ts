export type CanvasEventType = "SHAPES_UPDATED" | "STATE_CHANGED";

export interface CanvasEvent<T> {
  type: CanvasEventType;
  data: T;
}
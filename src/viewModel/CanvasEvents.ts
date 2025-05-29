export type CanvasEventType =
  | "SHAPES_UPDATED"
  | "STATE_CHANGED"
  | "RESET_INPUT_FIELDS"
  | "SHOW_TEXT_INPUT"
  | "HIDE_TEXT_INPUT"
  | "SELECTED_SHAPES_UPDATED";

export interface CanvasEvent<T> {
  type: CanvasEventType;
  data: T;
}

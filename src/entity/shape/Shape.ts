export interface Shape {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  draw(ctx: CanvasRenderingContext2D | null): void;
  move(dx: number, dy: number): void;
  getResizeHandles(): { x: number; y: number; pos: string }[];
  resize(dx: number, dy: number, pos: string): void;
  isPointInside(x: number, y: number): boolean;
  getProperties(): Property[];
  setProperties(name: string, value: number): void;
}

export interface Property {
  name: string;
  value: string | number;
  editable: boolean;
}

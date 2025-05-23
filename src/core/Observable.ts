import { CanvasEvent, CanvasEventType } from "../viewModel/CanvasEvents";
import { Observer } from "./Observer";

class Observable<T> {
  private observers: Map<CanvasEventType, Set<Observer<T>>> = new Map();

  subscribe(type: CanvasEventType, observer: Observer<T>): void {
    if (!this.observers.has(type)) {
      this.observers.set(type, new Set());
    }
    this.observers.get(type)?.add(observer);
  }

  unsubscribe(type: CanvasEventType, observer: Observer<T>): void {
    this.observers.get(type)?.delete(observer);
  }

  notify(event: CanvasEvent<T>): void {
    const observers = this.observers.get(event.type);
    if (observers) {
      for (const observer of observers) {
        observer.update(event.data);
      }
    }
  }
}

export { Observable };

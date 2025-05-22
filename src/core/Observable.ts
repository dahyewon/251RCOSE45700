import { Observer } from "./Observer";
import { CanvasEvent } from "../viewModel/CanvasEvents";

class Observable<T> {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update());
  }
}

export { Observable };

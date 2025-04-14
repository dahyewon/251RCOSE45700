import { Observer } from "./Observer";
import { CanvasEvent } from "../viewModel/CanvasEvents";

class Observable<T> {
  private observers: Observer<CanvasEvent<T>>[] = [];

  subscribe(observer: Observer<CanvasEvent<T>>): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<CanvasEvent<T>>): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(event: CanvasEvent<T>): void {
    this.observers.forEach((observer) => observer.update(event));
  }
}

export { Observable };

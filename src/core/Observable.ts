import { Observer } from "./Observer";

interface ObservableInterface {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(data: any): void;
}

class Observable implements ObservableInterface {
  private observers: Observer[] = [];

  subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: any): void {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export { ObservableInterface, Observable };

export abstract class Bindable {
  private listeners: (() => void)[] = [];

  onChange(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners.filter((listener) => listener !== fn);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }
}

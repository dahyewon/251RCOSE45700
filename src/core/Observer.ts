interface Observer<T> {
  update: (data: T) => void;
}

export { Observer };

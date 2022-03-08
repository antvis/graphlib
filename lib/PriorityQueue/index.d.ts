export default class PriorityQueue<T = string> {
  private arr;
  private keyIndice;
  size: () => number;
  keys: () => T[];
  has: (key: T) => boolean;
  priority: (key: T) => number | undefined;
  private swap;
  private innerDecrease;
  private heapify;
  min: () => T;
  add: (key: T, priority: number) => boolean;
  removeMin: () => T;
  decrease: (key: T, priority: number) => void;
}

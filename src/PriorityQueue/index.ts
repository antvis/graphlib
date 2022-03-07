export default class PriorityQueue<T = string> {
  private arr: { key: T; priority: number }[] = [];
  private keyIndice = new Map<T, number>();

  size = () => this.arr.length;

  keys = () => this.arr.map((e) => e.key);

  has = (key: T) => this.keyIndice.has(key);

  priority = (key: T) => {
    const index = this.keyIndice.get(key);

    if (index !== undefined) {
      return this.arr[index].priority;
    }
  };

  private swap = (i: number, j: number) => {
    const { arr, keyIndice } = this;
    const [originI, originJ] = [arr[i], arr[j]];
    arr[i] = originJ;
    arr[j] = originI;
    keyIndice.set(originI.key, j);
    keyIndice.set(originJ.key, i);
  };

  private innerDecrease = (index: number) => {
    const { arr } = this;
    const priority = arr[index].priority;
    let parent;
    let i = index;

    while (i !== 0) {
      parent = i >> 1;
      if (arr[parent]?.priority < priority) {
        break;
      }
      this.swap(i, parent);
      i = parent;
    }
  };

  private heapify = (i: number) => {
    const { arr } = this;
    const l = 2 * i;
    const r = l + 1;
    let largest = i;
    if (l < arr.length) {
      largest = arr[l].priority < arr[largest].priority ? l : largest;
      if (r < arr.length) {
        largest = arr[r].priority < arr[largest].priority ? r : largest;
      }
      if (largest !== i) {
        this.swap(i, largest);
        this.heapify(largest);
      }
    }
  };

  min = () => {
    if (this.size() === 0) {
      throw new Error('Queue underflow');
    }
    return this.arr[0].key;
  };

  add = (key: T, priority: number) => {
    const { keyIndice, arr } = this;

    if (!keyIndice.has(key)) {
      const index = arr.length;
      keyIndice.set(key, index);
      arr.push({
        key,
        priority,
      });
      this.innerDecrease(index);
      return true;
    }

    return false;
  };

  removeMin = () => {
    this.swap(0, this.arr.length - 1);
    const min = this.arr.pop()!;
    this.keyIndice.delete(min.key);
    this.heapify(0);
    return min.key;
  };

  decrease = (key: T, priority: number) => {
    if (!this.keyIndice.has(key)) {
      throw new Error(`There's no key named ${key}`);
    }
    // there must be an index
    const index = this.keyIndice.get(key)!;
    if (priority > this.arr[index].priority) {
      throw new Error(
        `New priority is greater than current priority.Key: ${key} Old: + ${this.arr[index].priority} New: ${priority}`,
      );
    }
    this.arr[index].priority = priority;
    this.innerDecrease(index);
  };
}

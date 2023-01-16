import { ID, Node, PlainObject } from '../types';

export function doBFS<N extends PlainObject>(
  queue: Node<N>[],
  visited: Set<ID>,
  fn: (node: Node<N>) => void,
  navigator: (id: ID) => Node<N>[],
) {
  while (queue.length) {
    const node = queue.shift()!;
    fn(node);
    visited.add(node.id);
    navigator(node.id).forEach((n) => {
      if (!visited.has(n.id)) {
        visited.add(n.id);
        queue.push(n);
      }
    });
  }
}

export function doDFS<N extends PlainObject>(
  node: Node<N>,
  visited: Set<ID>,
  fn: (node: Node<N>) => void,
  navigator: (id: ID) => Node<N>[],
) {
  fn(node);
  visited.add(node.id);
  navigator(node.id).forEach((n) => {
    if (!visited.has(n.id)) {
      doDFS(n, visited, fn, navigator);
    }
  });
}

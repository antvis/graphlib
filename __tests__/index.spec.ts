import { Graph } from '../src/index';

describe('Graph', () => {
  test('constructor', () => {
    const graph = new Graph();
    expect(graph).toBeInstanceOf(Graph);
  });
});

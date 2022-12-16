import { Graph } from '../src/index';

describe('Graph()', () => {
  it('creates an empty Graph when no options were given', () => {
    const graph = new Graph();
    expect(graph).toBeInstanceOf(Graph);
    expect(graph.getAllNodes()).toEqual([]);
    expect(graph.getAllEdges()).toEqual([]);
  });

  it('creates a Graph with options', () => {
    const nodes = [
      { id: 'Node1', data: {} },
      { id: 'Node2', data: {} },
      { id: 'Node3', data: {} },
    ];
    const edges = [
      { id: 'Edge1', source: 'Node1', target: 'Node2', data: {} },
      { id: 'Edge2', source: 'Node2', target: 'Node3', data: {} },
    ];
    const graph = new Graph({
      nodes,
      edges,
    });
    expect(graph.getAllNodes()).toEqual(nodes);
    expect(graph.getAllEdges()).toEqual(edges);
  });
});

test('mergeChanges', () => {
  const graph = new Graph();
  expect(() => {
    graph.mergeChanges([]);
  }).toThrow('To be implemented');
});

test('bsf', () => {
  const graph = new Graph();
  expect(() => {
    graph.bfs(1, () => {
      // Do nothing.
    });
  }).toThrow('To be implemented');
});

test('dsf', () => {
  const graph = new Graph();
  expect(() => {
    graph.dfs(1, () => {
      // Do nothing.
    });
  }).toThrow('To be implemented');
});

test('clone', () => {
  const nodes = [
    { id: 'Node1', data: {} },
    { id: 'Node2', data: {} },
    { id: 'Node3', data: {} },
  ];
  const edges = [
    { id: 'Edge1', source: 'Node1', target: 'Node2', data: {} },
    { id: 'Edge2', source: 'Node2', target: 'Node3', data: {} },
  ];
  const graph = new Graph({
    nodes,
    edges,
  });
  const clone = graph.clone();
  expect(clone.getAllNodes()).toEqual(nodes);
  expect(clone.getAllEdges()).toEqual(edges);
});

test('toJSON', () => {
  const nodes = [
    { id: 'Node1', data: {} },
    { id: 'Node2', data: {} },
    { id: 'Node3', data: {} },
  ];
  const edges = [
    { id: 'Edge1', source: 'Node1', target: 'Node2', data: {} },
    { id: 'Edge2', source: 'Node2', target: 'Node3', data: {} },
  ];
  const graph = new Graph({
    nodes,
    edges,
  });
  expect(graph.toJSON()).toEqual(
    JSON.stringify({
      nodes,
      edges,
    }),
  );
});

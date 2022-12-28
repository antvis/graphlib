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

test('reduceChanges', () => {
  const graph = new Graph();

  // Merge updates
  expect(
    graph.reduceChanges([
      {
        type: 'NodeDataUpdated',
        id: 'A',
        propertyName: 'foo',
        oldValue: 1,
        newValue: 2,
      },
      {
        type: 'NodeDataUpdated',
        id: 'A',
        propertyName: 'foo',
        oldValue: 2,
        newValue: 3,
      },
      {
        type: 'EdgeDataUpdated',
        id: 'A',
        propertyName: 'foo',
        oldValue: 1,
        newValue: 2,
      },
      {
        type: 'EdgeDataUpdated',
        id: 'A',
        propertyName: 'foo',
        oldValue: 2,
        newValue: 3,
      },
    ]),
  ).toEqual([
    {
      type: 'NodeDataUpdated',
      id: 'A',
      propertyName: 'foo',
      oldValue: 1,
      newValue: 3,
    },
    {
      type: 'EdgeDataUpdated',
      id: 'A',
      propertyName: 'foo',
      oldValue: 1,
      newValue: 3,
    },
  ]);

  // Drop data updates, parent updates, source/target updates.
  expect(
    graph.reduceChanges([
      {
        type: 'NodeDataUpdated',
        id: 'A',
        propertyName: 'foo',
        oldValue: 1,
        newValue: 2,
      },
      {
        type: 'TreeStructureChanged',
        treeKey: 'T',
        nodeId: 'A',
        oldParentId: 'B',
        newParentId: 'C',
      },
      { type: 'NodeRemoved', value: { id: 'A', data: { foo: 2 } } },
      {
        type: 'EdgeDataUpdated',
        id: 'E',
        propertyName: 'foo',
        oldValue: 1,
        newValue: 2,
      },
      {
        type: 'EdgeUpdated',
        id: 'E',
        propertyName: 'source',
        oldValue: 'A',
        newValue: 'B',
      },
      {
        type: 'EdgeRemoved',
        value: { id: 'E', source: 'B', target: 'C', data: { foo: 2 } },
      },
    ]),
  ).toEqual([
    { type: 'NodeRemoved', value: { id: 'A', data: { foo: 2 } } },
    {
      type: 'EdgeRemoved',
      value: { id: 'E', source: 'B', target: 'C', data: { foo: 2 } },
    },
  ]);

  // Drop newly added nodes/edges.
  expect(
    graph.reduceChanges([
      { type: 'NodeAdded', value: { id: 'A', data: {} } },
      { type: 'NodeRemoved', value: { id: 'B', data: {} } },
      { type: 'NodeRemoved', value: { id: 'A', data: {} } },
      {
        type: 'EdgeAdded',
        value: { id: 'E1', source: 'A', target: 'B', data: {} },
      },
      {
        type: 'EdgeRemoved',
        value: { id: 'E2', source: 'A', target: 'B', data: {} },
      },
      {
        type: 'EdgeRemoved',
        value: { id: 'E1', source: 'A', target: 'B', data: {} },
      },
    ]),
  ).toEqual([
    { type: 'NodeRemoved', value: { id: 'B', data: {} } },
    {
      type: 'EdgeRemoved',
      value: { id: 'E2', source: 'A', target: 'B', data: {} },
    },
  ]);

  // Drop tree attachments, tree changes.
  expect(
    graph.reduceChanges([
      { type: 'NodeAdded', value: { id: 'A', data: {} } },
      { type: 'TreeStructureAttached', treeKey: 'A' },
      { type: 'TreeStructureAttached', treeKey: 'B' },
      {
        type: 'TreeStructureChanged',
        treeKey: 'A',
        nodeId: 'N',
        oldParentId: 'P',
        newParentId: 'Q',
      },
      {
        type: 'TreeStructureChanged',
        treeKey: 'B',
        nodeId: 'N',
        oldParentId: 'P',
        newParentId: 'Q',
      },
      { type: 'TreeStructureDetached', treeKey: 'B' },
    ]),
  ).toEqual([
    { type: 'NodeAdded', value: { id: 'A', data: {} } },
    { type: 'TreeStructureAttached', treeKey: 'A' },
    {
      type: 'TreeStructureChanged',
      treeKey: 'A',
      nodeId: 'N',
      oldParentId: 'P',
      newParentId: 'Q',
    },
    { type: 'TreeStructureDetached', treeKey: 'B' },
  ]);

  // Merge tree changes.
  expect(
    graph.reduceChanges([
      {
        type: 'TreeStructureChanged',
        treeKey: 'A',
        nodeId: 'N',
        oldParentId: 'P',
        newParentId: 'Q',
      },
      {
        type: 'TreeStructureChanged',
        treeKey: 'A',
        nodeId: 'N',
        oldParentId: 'Q',
        newParentId: 'R',
      },
      {
        type: 'TreeStructureChanged',
        treeKey: 'B',
        nodeId: 'N',
        oldParentId: 'P',
        newParentId: 'Q',
      },
    ]),
  ).toEqual([
    {
      type: 'TreeStructureChanged',
      treeKey: 'A',
      nodeId: 'N',
      oldParentId: 'P',
      newParentId: 'R',
    },
    {
      type: 'TreeStructureChanged',
      treeKey: 'B',
      nodeId: 'N',
      oldParentId: 'P',
      newParentId: 'Q',
    },
  ]);
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

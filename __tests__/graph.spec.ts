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
        type: 'NodeDataUpdated',
        id: 'B',
        propertyName: 'foo',
        oldValue: 1,
        newValue: 2,
      },
      {
        type: 'NodeDataUpdated',
        id: 'B',
        oldValue: {
          foo: 2,
        },
        newValue: {
          bar: 3,
        },
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
      type: 'NodeDataUpdated',
      id: 'B',
      oldValue: {
        foo: 2,
      },
      newValue: {
        bar: 3,
      },
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
  const graph = new Graph({
    nodes: [
      { id: 0, data: {} },
      { id: 1, data: {} },
      { id: 2, data: {} },
      { id: 3, data: {} },
    ],
    edges: [
      { id: 0, source: 0, target: 1, data: {} },
      { id: 1, source: 1, target: 3, data: {} },
      { id: 2, source: 3, target: 0, data: {} },
      { id: 3, source: 0, target: 2, data: {} },
      { id: 4, source: 2, target: 3, data: {} },
    ],
  });
  const nodeIdList: any[] = [];
  graph.bfs(0, (node) => {
    nodeIdList.push(node.id);
  });
  expect(nodeIdList).toEqual([0, 1, 2, 3]);

  // Abort on 1.
  nodeIdList.length = 0;
  graph.bfs(0, (node) => {
    nodeIdList.push(node.id);
    if (node.id === 1) return true;
  });
  expect(nodeIdList).toEqual([0, 1]);
});

test('dsf', () => {
  const graph = new Graph({
    nodes: [
      { id: 0, data: {} },
      { id: 1, data: {} },
      { id: 2, data: {} },
      { id: 3, data: {} },
    ],
    edges: [
      { id: 0, source: 0, target: 1, data: {} },
      { id: 1, source: 1, target: 3, data: {} },
      { id: 2, source: 3, target: 0, data: {} },
      { id: 3, source: 0, target: 2, data: {} },
      { id: 4, source: 2, target: 3, data: {} },
    ],
  });
  const nodeIdList: any[] = [];
  graph.dfs(0, (node) => {
    nodeIdList.push(node.id);
  });
  expect(nodeIdList).toEqual([0, 1, 3, 2]);

  // Abort on 1.
  nodeIdList.length = 0;
  graph.dfs(0, (node) => {
    nodeIdList.push(node.id);
    if (node.id === 1) return true;
  });
  expect(nodeIdList).toEqual([0, 1]);
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
  graph.attachTreeStructure('Tree');
  graph.setParent('Node2', 'Node1', 'Tree');
  graph.setParent('Node3', 'Node1', 'Tree');
  const clone = graph.clone();
  expect(clone.getAllNodes()).toEqual(nodes);
  expect(clone.getAllEdges()).toEqual(edges);
  expect(clone.getParent('Node2', 'Tree')).toEqual({ id: 'Node1', data: {} });
  expect(clone.getChildren('Node1', 'Tree')).toEqual([
    { id: 'Node2', data: {} },
    { id: 'Node3', data: {} },
  ]);
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

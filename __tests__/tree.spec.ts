import { Graph } from '../src';

test('Tree related methods', () => {
  /*
        1    4
       / \   |
      2   3  5
  */
  const node2 = {
    id: 'Node2',
    data: {},
  };
  const node3 = {
    id: 'Node3',
    data: {},
  };
  const node1 = {
    id: 'Node1',
    data: {},
    children: [node2, node3],
  };
  const node5 = {
    id: 'Node5',
    data: {},
  };
  const node4 = {
    id: 'Node4',
    data: {},
    children: [node5],
  };
  const graph = new Graph({
    tree: [node1, node4],
  });
  expect(graph.getAllNodes()).toEqual([node1, node4, node2, node3, node5]);
  expect(graph.getRoots()).toEqual([node1, node4]);
  expect(graph.getParent('Node2')).toEqual(node1);
  expect(graph.getParent('Node4')).toEqual(null);
  expect(graph.getChildren('Node1')).toEqual([node2, node3]);
  expect(graph.getChildren('Node2')).toEqual([]);

  // Attach another tree structure
  expect(() => {
    graph.getParent('Node2', 'TreeKey');
  }).toThrow('Tree structure not found');
  graph.attachTreeStructure('TreeKey');
  expect(graph.getParent('Node2', 'TreeKey')).toEqual(null);

  // Update parent
  graph.setParent('Node2', 'Node4', 'TreeKey');
  expect(graph.getParent('Node2', 'TreeKey')).toEqual(node4);
  expect(graph.getChildren('Node4', 'TreeKey')).toEqual([node2]);
  expect(graph.getParent('Node2')).toEqual(node1);

  // Detach tree structure
  graph.detachTreeStructure('TreeKey');
  expect(() => {
    graph.getParent('Node2', 'TreeKey');
  }).toThrow('Tree structure not found');

  // Removing nodes
  graph.removeNode('Node1');
  expect(graph.getRoots()).toEqual([node4, node2, node3]);
  expect(graph.getParent('Node2')).toEqual(null);
  expect(() => {
    graph.getChildren('Node1');
  }).toThrow('Node not found');
});

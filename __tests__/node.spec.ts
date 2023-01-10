import { Graph } from '../src';

test('Node related methods', () => {
  const graph = new Graph();
  expect(graph.getAllNodes()).toEqual([]);

  // addNode()
  // addNodes()
  graph.addNode({ id: 'Node1', data: {} });
  graph.addNodes([
    { id: 'Node2', data: {} },
    { id: 'Node3', data: {} },
  ]);
  expect(graph.getAllNodes()).toEqual([
    { id: 'Node1', data: {} },
    { id: 'Node2', data: {} },
    { id: 'Node3', data: {} },
  ]);
  expect(() => {
    graph.addNode({ id: 'Node1', data: {} });
  }).toThrow('Node already exists');

  // hasNode()
  expect(graph.hasNode('Node1')).toBe(true);
  expect(graph.hasNode('Node999')).toBe(false);

  // getNode()
  expect(graph.getNode('Node1')).toEqual({ id: 'Node1', data: {} });
  expect(() => {
    graph.getNode('Node999');
  }).toThrow('Node not found');

  // getRelatedEdges()
  graph.addEdges([
    { id: 'Edge1', source: 'Node1', target: 'Node2', data: {} },
    { id: 'Edge2', source: 'Node1', target: 'Node3', data: {} },
    { id: 'Edge3', source: 'Node2', target: 'Node3', data: {} },
  ]);
  expect(graph.getRelatedEdges('Node2')).toEqual([
    { id: 'Edge1', source: 'Node1', target: 'Node2', data: {} },
    { id: 'Edge3', source: 'Node2', target: 'Node3', data: {} },
  ]);
  expect(graph.getRelatedEdges('Node2', 'in')).toEqual([
    { id: 'Edge1', source: 'Node1', target: 'Node2', data: {} },
  ]);
  expect(graph.getRelatedEdges('Node2', 'out')).toEqual([
    { id: 'Edge3', source: 'Node2', target: 'Node3', data: {} },
  ]);
  expect(graph.getRelatedEdges('Node2')).toEqual(
    graph.getRelatedEdges('Node2', 'both'),
  );
  expect(() => {
    graph.getRelatedEdges('Node999');
  }).toThrow('Node not found');

  // getDegree()
  expect(graph.getDegree('Node1')).toBe(2);
  expect(graph.getDegree('Node1', 'in')).toBe(0);
  expect(graph.getDegree('Node1', 'out')).toBe(2);

  // getSuccessors()
  // getPredecessors()
  // getNeighbors()
  // areNeighbors()
  expect(graph.getSuccessors('Node2')).toEqual([{ id: 'Node3', data: {} }]);
  expect(graph.getPredecessors('Node2')).toEqual([{ id: 'Node1', data: {} }]);
  expect(graph.getNeighbors('Node2')).toEqual([
    { id: 'Node1', data: {} },
    { id: 'Node3', data: {} },
  ]);
  expect(graph.areNeighbors('Node1', 'Node2')).toBe(true);

  // updateNodeData(id, propertyName, value)
  graph.updateNodeData('Node1', 'foo', 1);
  expect(graph.getNode('Node1').data).toEqual({ foo: 1 });
  graph.updateNodeData('Node1', 'foo', 2);
  expect(graph.getNode('Node1').data).toEqual({ foo: 2 });

  // updateNodeData(id, data)
  graph.updateNodeData('Node1', { bar: 1 });
  expect(graph.getNode('Node1').data).toEqual({ bar: 1 });

  // updateNodeData(id, oldData => newData);
  graph.updateNodeData('Node1', (data) => ({ foo: Number(data.bar) + 1 }));
  expect(graph.getNode('Node1').data).toEqual({ foo: 2 });

  // mergeNodeData()
  graph.mergeNodeData('Node1', { bar: '1' });
  expect(graph.getNode('Node1').data).toEqual({ foo: 2, bar: '1' });
  graph.mergeNodeData('Node1', { foo: 3, bar: '2' });
  expect(graph.getNode('Node1').data).toEqual({ foo: 3, bar: '2' });

  // removeNode()
  // removeNodes()
  graph.removeNode('Node1');
  expect(graph.getAllNodes()).toEqual([
    { id: 'Node2', data: {} },
    { id: 'Node3', data: {} },
  ]);
  expect(graph.getAllEdges()).toEqual([
    { id: 'Edge3', source: 'Node2', target: 'Node3', data: {} },
  ]);
  graph.removeNodes(['Node2', 'Node3']);
  expect(graph.getAllNodes()).toEqual([]);
  expect(graph.getAllEdges()).toEqual([]);
  expect(() => {
    graph.removeNode('Node999');
  }).toThrow('Node not found');
});

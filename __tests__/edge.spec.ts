import { Graph } from '../src';

test('Edge related methods', () => {
  const graph = new Graph({
    nodes: [
      { id: 'Node1', data: {} },
      { id: 'Node2', data: {} },
      { id: 'Node3', data: {} },
      { id: 'Node4', data: {} },
    ],
  });
  expect(graph.getAllEdges()).toEqual([]);

  // addEdge()
  // addEdges()
  graph.addEdge({ id: 'Edge1', source: 'Node1', target: 'Node2', data: {} });
  graph.addEdges([
    { id: 'Edge2', source: 'Node1', target: 'Node3', data: {} },
    { id: 'Edge3', source: 'Node2', target: 'Node3', data: {} },
  ]);
  expect(graph.getAllEdges()).toEqual([
    { id: 'Edge1', source: 'Node1', target: 'Node2', data: {} },
    { id: 'Edge2', source: 'Node1', target: 'Node3', data: {} },
    { id: 'Edge3', source: 'Node2', target: 'Node3', data: {} },
  ]);
  expect(() => {
    graph.addEdge({ id: 'Edge1', source: 'Node1', target: 'Node2', data: {} });
  }).toThrow('Edge already exists');

  // hasEdge()
  expect(graph.hasEdge('Edge1')).toBe(true);
  expect(graph.hasEdge('Edge999')).toBe(false);

  // getEdge()
  // getEdgeDetail()
  expect(graph.getEdge('Edge1')).toEqual({
    id: 'Edge1',
    source: 'Node1',
    target: 'Node2',
    data: {},
  });
  expect(graph.getEdgeDetail('Edge1')).toEqual({
    edge: { id: 'Edge1', source: 'Node1', target: 'Node2', data: {} },
    source: { id: 'Node1', data: {} },
    target: { id: 'Node2', data: {} },
  });
  expect(() => {
    graph.getEdge('Edge999');
  }).toThrow('Edge not found');

  // updateEdgeData(id, propertyName, value)
  graph.updateEdgeData('Edge1', 'foo', 1);
  expect(graph.getEdge('Edge1').data).toEqual({ foo: 1 });
  graph.updateEdgeData('Edge1', 'foo', 2);
  expect(graph.getEdge('Edge1').data).toEqual({ foo: 2 });

  // updateEdgeData(id, data)
  graph.updateEdgeData('Edge1', { bar: 1 });
  expect(graph.getEdge('Edge1').data).toEqual({ bar: 1 });

  // updateEdgeData(id, oldData => newData);
  graph.updateEdgeData('Edge1', (data) => ({ foo: Number(data.bar) + 1 }));
  expect(graph.getEdge('Edge1').data).toEqual({ foo: 2 });

  // mergeEdgeData()
  graph.mergeEdgeData('Edge1', { bar: '1' });
  expect(graph.getEdge('Edge1').data).toEqual({ foo: 2, bar: '1' });
  graph.mergeEdgeData('Edge1', { foo: 3, bar: '2' });
  expect(graph.getEdge('Edge1').data).toEqual({ foo: 3, bar: '2' });

  // updateEdgeSource()
  graph.updateEdgeSource('Edge1', 'Node3');
  expect(graph.getEdge('Edge1').source).toEqual('Node3');
  expect(graph.getEdge('Edge1').target).toEqual('Node2');
  expect(graph.getRelatedEdges('Node1').map((edge) => edge.id)).toEqual([
    'Edge2',
  ]);
  expect(graph.getRelatedEdges('Node3').map((edge) => edge.id)).toEqual([
    'Edge2',
    'Edge3',
    'Edge1',
  ]);
  graph.updateEdgeSource('Edge1', 'Node1'); // Reset the source.

  // updateEdgeTarget()
  graph.updateEdgeTarget('Edge1', 'Node3');
  expect(graph.getEdge('Edge1').source).toEqual('Node1');
  expect(graph.getEdge('Edge1').target).toEqual('Node3');
  expect(graph.getRelatedEdges('Node1').map((edge) => edge.id)).toEqual([
    'Edge2',
    'Edge1',
  ]);
  expect(graph.getRelatedEdges('Node2').map((edge) => edge.id)).toEqual([
    'Edge3',
  ]);
  graph.updateEdgeTarget('Edge1', 'Node2'); // Reset the target.

  // removeEdge()
  // removeEdges()
  graph.removeEdge('Edge1');
  expect(graph.getAllEdges()).toEqual([
    { id: 'Edge2', source: 'Node1', target: 'Node3', data: {} },
    { id: 'Edge3', source: 'Node2', target: 'Node3', data: {} },
  ]);
  graph.removeEdges(['Edge2', 'Edge3']);
  expect(graph.getAllEdges()).toEqual([]);
  expect(() => {
    graph.removeEdge('Edge999');
  }).toThrow('Edge not found');
});

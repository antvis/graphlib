import { Graph } from '../src';

describe('event', () => {
  it('add', (done) => {
    const graph = new Graph();

    let counter = 0;

    const expects = [
      [
        { type: 'NodeAdded', value: { id: 'A', data: {} } },
        { type: 'NodeAdded', value: { id: 'B', data: {} } },
        { type: 'NodeAdded', value: { id: 'C', data: {} } },
        {
          type: 'EdgeAdded',
          value: { id: 'A->B', source: 'A', target: 'B', data: {} },
        },
      ],
      [
        {
          type: 'NodeDataUpdated',
          id: 'A',
          oldValue: {},
          newValue: { value: 1 },
        },
      ],
      [
        {
          type: 'EdgeDataUpdated',
          id: 'A->B',
          oldValue: {},
          newValue: { foo: 'bar' },
        },
      ],
      [
        {
          type: 'EdgeUpdated',
          id: 'A->B',
          propertyName: 'source',
          oldValue: 'A',
          newValue: 'C',
        },
      ],
      [
        {
          type: 'EdgeRemoved',
          value: { id: 'A->B', source: 'C', target: 'B', data: { foo: 'bar' } },
        },
      ],
    ];

    graph.on('changed', (event: any) => {
      expect(event.changes).toEqual(expects[counter++]);

      if (counter === expects.length) {
        done();
      }
    });

    graph.batch(() => {
      graph.addNodes([
        { id: 'A', data: {} },
        { id: 'B', data: {} },
        { id: 'C', data: {} },
      ]);

      graph.addEdges([{ id: 'A->B', source: 'A', target: 'B', data: {} }]);
    });

    graph.updateNodeData('A', { value: 1 });

    graph.updateNodeData('A', { value: 1 });

    graph.updateEdgeData('A->B', { foo: 'bar' });

    graph.updateEdgeData('A->B', { foo: 'bar' });

    graph.updateEdgeSource('A->B', 'C');

    graph.updateEdgeSource('A->B', 'C');

    graph.removeEdges(['A->B']);
  });

  it('deep change', (done) => {
    const graph = new Graph({
      nodes: [
        {
          id: 'A',
          data: { id: 'A', data: { value: 1 }, style: { fill: 'red' } },
        },
        {
          id: 'B',
          data: { id: 'B', data: { value: 2 }, style: { fill: 'red' } },
        },
        {
          id: 'C',
          data: { id: 'C', data: { value: 3 }, style: { fill: 'red' } },
        },
      ],
      edges: [
        { id: 'A->B', source: 'A', target: 'B', data: {} },
        { id: 'B->C', source: 'B', target: 'C', data: {} },
      ],
    });

    let counter = 0;
    const expects = [
      [
        {
          type: 'NodeDataUpdated',
          id: 'A',
          propertyName: 'data',
          oldValue: { value: 1 },
          newValue: { value: 10 },
        },
        {
          type: 'NodeDataUpdated',
          id: 'A',
          propertyName: 'style',
          oldValue: { fill: 'red' },
          newValue: { fill: 'pink' },
        },
      ],
    ];

    graph.on('changed', (event: any) => {
      expect(event.changes).toEqual(expects[counter++]);

      if (counter === expects.length) {
        done();
      }
    });

    graph.mergeNodeData('A', { data: { value: 10 }, style: { fill: 'pink' } });
    graph.mergeNodeData('A', { data: { value: 10 }, style: { fill: 'pink' } });
  });
});

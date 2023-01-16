import { Graph } from '../src/graph';

const initGraphView = () => {
  const graph = new Graph({
    nodes: [
      { id: 0, data: { visible: true } },
      { id: 1, data: { visible: true } },
      { id: 2, data: { visible: true } },
      { id: 3, data: { visible: true } },
      // 👇🏻 Should be filtered
      { id: 4, data: { visible: false } },
    ],
    edges: [
      { id: 0, source: 0, target: 1, data: { visible: true } },
      { id: 1, source: 1, target: 3, data: { visible: true } },
      { id: 2, source: 0, target: 2, data: { visible: true } },
      { id: 3, source: 2, target: 3, data: { visible: true } },
      // 👇🏻 Should be filtered, because node 4 was filtered.
      { id: 4, source: 1, target: 4, data: { visible: true } },
      { id: 5, source: 4, target: 1, data: { visible: true } },
      // 👇🏻 Should be filtered, because visible was false.
      { id: 6, source: 3, target: 0, data: { visible: false } },
    ],
  });
  const graphView = graph.createGraphView({
    nodeFilter: (node) => node.data.visible,
    edgeFilter: (edge) => edge.data.visible,
  });
  return { graph, graphView };
};

describe('GraphView', () => {
  test('getAllNodes && getAllEdges', () => {
    const { graphView } = initGraphView();
    expect(graphView.getAllNodes()).toEqual([
      { id: 0, data: { visible: true } },
      { id: 1, data: { visible: true } },
      { id: 2, data: { visible: true } },
      { id: 3, data: { visible: true } },
    ]);
    expect(graphView.getAllEdges()).toEqual([
      { id: 0, source: 0, target: 1, data: { visible: true } },
      { id: 1, source: 1, target: 3, data: { visible: true } },
      { id: 2, source: 0, target: 2, data: { visible: true } },
      { id: 3, source: 2, target: 3, data: { visible: true } },
    ]);
  });

  test('hasNode && hasEdge', () => {
    const { graphView } = initGraphView();
    expect(graphView.hasNode(0)).toBe(true);
    expect(graphView.hasNode(1)).toBe(true);
    expect(graphView.hasNode(2)).toBe(true);
    expect(graphView.hasNode(3)).toBe(true);
    expect(graphView.hasNode(4)).toBe(false);
    expect(graphView.hasNode(999)).toBe(false);

    expect(graphView.hasEdge(0)).toBe(true);
    expect(graphView.hasEdge(1)).toBe(true);
    expect(graphView.hasEdge(2)).toBe(true);
    expect(graphView.hasEdge(3)).toBe(true);
    expect(graphView.hasEdge(4)).toBe(false);
    expect(graphView.hasEdge(5)).toBe(false);
    expect(graphView.hasEdge(6)).toBe(false);
    expect(graphView.hasEdge(999)).toBe(false);
  });

  test('areNeighbors', () => {
    const { graphView } = initGraphView();
    expect(graphView.areNeighbors(0, 1)).toBe(true);
    expect(graphView.areNeighbors(0, 3)).toBe(false);
  });

  test('getNode && getEdge && getEdgeDetail', () => {
    const { graphView } = initGraphView();

    expect(graphView.getNode(0)).toEqual({ id: 0, data: { visible: true } });
    expect(() => graphView.getNode(4)).toThrow('Node not found');

    expect(graphView.getEdge(0)).toEqual({
      id: 0,
      source: 0,
      target: 1,
      data: { visible: true },
    });
    expect(() => graphView.getEdge(4)).toThrow('Edge not found');
    expect(() => graphView.getEdge(5)).toThrow('Edge not found');
    expect(() => graphView.getEdge(6)).toThrow('Edge not found');

    expect(graphView.getEdgeDetail(0)).toEqual({
      edge: {
        id: 0,
        source: 0,
        target: 1,
        data: { visible: true },
      },
      source: { id: 0, data: { visible: true } },
      target: { id: 1, data: { visible: true } },
    });
    expect(() => graphView.getEdgeDetail(4)).toThrow('Edge not found');
    expect(() => graphView.getEdgeDetail(5)).toThrow('Edge not found');
    expect(() => graphView.getEdgeDetail(6)).toThrow('Edge not found');
  });

  test('getRelatedEdges', () => {
    const { graphView } = initGraphView();
    expect(graphView.getRelatedEdges(0)).toEqual([
      { id: 0, source: 0, target: 1, data: { visible: true } },
      { id: 2, source: 0, target: 2, data: { visible: true } },
    ]);
  });

  test('getSuccessors && getPredecessors && getNeighbors && getDegree', () => {
    const { graphView } = initGraphView();
    expect(graphView.getSuccessors(3)).toEqual([]);
    expect(graphView.getPredecessors(0)).toEqual([]);
    expect(graphView.getNeighbors(1)).toEqual([
      { id: 0, data: { visible: true } },
      { id: 3, data: { visible: true } },
    ]);
    expect(graphView.getDegree(0)).toEqual(2);
    expect(graphView.getDegree(0, 'in')).toEqual(0);
    expect(graphView.getDegree(0, 'out')).toEqual(2);
  });

  test('hasTreeStructure && getRoots && getParent && getChildren', () => {
    const { graph, graphView } = initGraphView();

    expect(graphView.hasTreeStructure('combo')).toBe(false);
    graph.attachTreeStructure('combo');
    expect(graphView.hasTreeStructure('combo')).toBe(true);

    graph.setParent(1, 0, 'combo');
    graph.setParent(2, 0, 'combo');
    graph.setParent(3, 2, 'combo');
    expect(graphView.getRoots('combo')).toEqual([
      { id: 0, data: { visible: true } },
    ]);
    expect(graphView.getParent(0, 'combo')).toEqual(null);
    expect(graphView.getParent(1, 'combo')).toEqual({
      id: 0,
      data: { visible: true },
    });
    expect(graphView.getChildren(0, 'combo')).toEqual([
      { id: 1, data: { visible: true } },
      { id: 2, data: { visible: true } },
    ]);
  });

  test('bfs', () => {
    const { graphView } = initGraphView();
    const nodeIdList: any[] = [];
    graphView.bfs(0, (node) => {
      nodeIdList.push(node.id);
    });
    expect(nodeIdList).toEqual([0, 1, 2, 3]);
  });

  test('dfs', () => {
    const { graphView } = initGraphView();
    const nodeIdList: any[] = [];
    graphView.dfs(0, (node) => {
      nodeIdList.push(node.id);
    });
    expect(nodeIdList).toEqual([0, 1, 3, 2]);
  });

  test('createGraphView with default options', () => {
    const { graph } = initGraphView();
    const graphViewNodeFilterOnly = graph.createGraphView({
      nodeFilter: (node) => node.data.visible,
    });
    const graphViewEdgeFilterOnly = graph.createGraphView({
      edgeFilter: (edge) => edge.data.visible,
    });
    const graphViewWithNoFilter = graph.createGraphView({});

    expect(graphViewNodeFilterOnly.getAllEdges()).toEqual([
      { id: 0, source: 0, target: 1, data: { visible: true } },
      { id: 1, source: 1, target: 3, data: { visible: true } },
      { id: 2, source: 0, target: 2, data: { visible: true } },
      { id: 3, source: 2, target: 3, data: { visible: true } },
      { id: 6, source: 3, target: 0, data: { visible: false } },
    ]);

    expect(graphViewEdgeFilterOnly.getAllEdges()).toEqual([
      { id: 0, source: 0, target: 1, data: { visible: true } },
      { id: 1, source: 1, target: 3, data: { visible: true } },
      { id: 2, source: 0, target: 2, data: { visible: true } },
      { id: 3, source: 2, target: 3, data: { visible: true } },
      { id: 4, source: 1, target: 4, data: { visible: true } },
      { id: 5, source: 4, target: 1, data: { visible: true } },
    ]);

    expect(graphViewWithNoFilter.getAllNodes()).toEqual(graph.getAllNodes());
    expect(graphViewWithNoFilter.getAllEdges()).toEqual(graph.getAllEdges());
  });

  test('works when graphChanged', () => {
    const { graph, graphView } = initGraphView();
    graph.addNodes([
      { id: 5, data: { visible: true } },
      { id: 6, data: { visible: false } },
    ]);
    graph.addEdges([
      { id: 7, source: 4, target: 5, data: { visible: true } },
      { id: 8, source: 0, target: 6, data: { visible: false } },
    ]);
    graph.updateNodeData(3, 'visible', false);
    graph.updateNodeData(4, 'visible', true);
    graph.updateEdgeData(3, 'visible', false);
    graph.updateEdgeData(6, 'visible', true);

    // Node 3 & 6 invisible
    expect(graphView.getAllNodes()).toEqual([
      { id: 0, data: { visible: true } },
      { id: 1, data: { visible: true } },
      { id: 2, data: { visible: true } },
      { id: 4, data: { visible: true } },
      { id: 5, data: { visible: true } },
    ]);

    // Edge 3 & 6 & 8 invisible
    // Edge 1 & 6 invisible, because Node 3 & 6 invisible
    expect(graphView.getAllEdges()).toEqual([
      { id: 0, source: 0, target: 1, data: { visible: true } },
      // { id: 1, source: 1, target: 3, data: { visible: true } },
      { id: 2, source: 0, target: 2, data: { visible: true } },
      { id: 4, source: 1, target: 4, data: { visible: true } },
      { id: 5, source: 4, target: 1, data: { visible: true } },
      // { id: 6, source: 3, target: 0, data: { visible: true } },
      { id: 7, source: 4, target: 5, data: { visible: true } },
    ]);
  });
});

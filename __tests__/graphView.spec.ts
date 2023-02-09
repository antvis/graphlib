import { ID } from '../src';
import { Graph } from '../src/graph';
import { GraphView } from '../src/graphView';

const sort = (items: Array<{ id: ID }>) => {
  return items.sort((a, b) => {
    return Number(a.id) - Number(b.id);
  });
};

const initGraphView = (cache: any) => {
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
  const graphView = graph.createView({
    nodeFilter: (node) => node.data.visible,
    edgeFilter: (edge) => edge.data.visible,
    cache,
  });
  return { graph, graphView };
};

describe('GraphView', () => {
  it.each(['none', 'auto'])('getAllNodes && getAllEdges', (mode) => {
    const { graphView } = initGraphView(mode);
    expect(sort(graphView.getAllNodes())).toEqual([
      { id: 0, data: { visible: true } },
      { id: 1, data: { visible: true } },
      { id: 2, data: { visible: true } },
      { id: 3, data: { visible: true } },
    ]);
    expect(sort(graphView.getAllEdges())).toEqual([
      { id: 0, source: 0, target: 1, data: { visible: true } },
      { id: 1, source: 1, target: 3, data: { visible: true } },
      { id: 2, source: 0, target: 2, data: { visible: true } },
      { id: 3, source: 2, target: 3, data: { visible: true } },
    ]);
  });

  it.each(['none', 'auto'])('getAllNodes && getAllEdges', (mode) => {
    const { graphView } = initGraphView(mode);
    expect(sort(graphView.getAllNodes())).toEqual([
      { id: 0, data: { visible: true } },
      { id: 1, data: { visible: true } },
      { id: 2, data: { visible: true } },
      { id: 3, data: { visible: true } },
    ]);
    expect(sort(graphView.getAllEdges())).toEqual([
      { id: 0, source: 0, target: 1, data: { visible: true } },
      { id: 1, source: 1, target: 3, data: { visible: true } },
      { id: 2, source: 0, target: 2, data: { visible: true } },
      { id: 3, source: 2, target: 3, data: { visible: true } },
    ]);
  });

  it.each(['none', 'auto'])('hasNode && hasEdge', (mode) => {
    const { graphView } = initGraphView(mode);
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

  it.each(['none', 'auto'])('areNeighbors', (mode) => {
    const { graphView } = initGraphView(mode);
    expect(graphView.areNeighbors(0, 1)).toBe(true);
    expect(graphView.areNeighbors(0, 3)).toBe(false);
  });

  it.each(['none', 'auto'])('getNode && getEdge && getEdgeDetail', (mode) => {
    const { graphView } = initGraphView(mode);

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

  it.each(['none', 'auto'])('getRelatedEdges', (mode) => {
    const { graphView } = initGraphView(mode);
    expect(graphView.getRelatedEdges(0)).toEqual([
      { id: 0, source: 0, target: 1, data: { visible: true } },
      { id: 2, source: 0, target: 2, data: { visible: true } },
    ]);
  });

  it.each(['none', 'auto'])(
    'getSuccessors && getPredecessors && getNeighbors && getDegree',
    (mode) => {
      const { graphView } = initGraphView(mode);
      expect(graphView.getSuccessors(3)).toEqual([]);
      expect(graphView.getPredecessors(0)).toEqual([]);
      expect(graphView.getNeighbors(1)).toEqual([
        { id: 0, data: { visible: true } },
        { id: 3, data: { visible: true } },
      ]);
      expect(graphView.getDegree(0)).toEqual(2);
      expect(graphView.getDegree(0, 'in')).toEqual(0);
      expect(graphView.getDegree(0, 'out')).toEqual(2);
    },
  );

  it.each(['none', 'auto'])(
    'hasTreeStructure && getRoots && getParent && getChildren',
    (mode) => {
      const { graph, graphView } = initGraphView(mode);

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
    },
  );

  it.each(['none', 'auto'])('bfs', (mode) => {
    const { graphView } = initGraphView(mode);
    const nodeIdList: any[] = [];
    graphView.bfs(0, (node) => {
      nodeIdList.push(node.id);
    });
    expect(nodeIdList).toEqual([0, 1, 2, 3]);
  });

  it.each(['none', 'auto'])('dfs', (mode) => {
    const { graphView } = initGraphView(mode);
    const nodeIdList: any[] = [];
    graphView.dfs(0, (node) => {
      nodeIdList.push(node.id);
    });
    expect(nodeIdList).toEqual([0, 1, 3, 2]);
  });

  it.each(['none', 'auto'])('createGraphView with default options', (mode) => {
    const { graph } = initGraphView(mode);
    const graphViewNodeFilterOnly = new GraphView({
      graph,
      nodeFilter: (node) => node.data.visible,
    });
    const graphViewEdgeFilterOnly = new GraphView({
      graph,
      edgeFilter: (edge) => edge.data.visible,
    });
    const graphViewWithNoFilter = new GraphView({ graph });

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

  it.each(['none', 'auto'])('works fine after graph changed', (mode) => {
    const { graph, graphView } = initGraphView(mode);
    graph.addNodes([
      { id: 5, data: { visible: true } },
      { id: 6, data: { visible: false } },
    ]);
    graph.addEdges([
      { id: 7, source: 4, target: 5, data: { visible: true } },
      { id: 8, source: 0, target: 6, data: { visible: false } },
    ]);
    graph.updateEdgeTarget(0, 4);
    graph.removeNode(1);
    graph.updateNodeData(3, 'visible', false);
    graph.updateNodeData(4, 'visible', true);
    graph.updateEdgeData(3, 'visible', false);
    graph.updateEdgeData(6, 'visible', true);

    // Current nodes:
    //   0: visible: true
    //   1: visible: true // Removed
    //   2: visible: true
    //   3: visible: false
    //   4: visible: true
    //   5: visible: true
    //   6: visible: false
    const nodeIds = graphView.getAllNodes().map((n) => n.id);
    expect(nodeIds.sort()).toEqual([0, 2, 4, 5]);

    // Current edges:
    //   0: 0->4, visible: true
    //   1: 1->3, visible: true   // Node1 not visitable
    //   2: 0->2, visible: true
    //   3: 2->3, visible: false  // Edge invisible
    //   4: 1->4, visible: true   // Node1 not visitable
    //   5: 4->1, visible: true   // Node1 not visitable
    //   6: 3->0, visible: true   // Node3 not visitable
    //   7: 4->5, visible: true
    //   8: 0->6, visible: true   // Node6 not visitable

    const edgeIds = graphView.getAllEdges().map((e) => e.id);
    expect(edgeIds.sort()).toEqual([0, 2, 7]);
  });
});

describe('GraphView with auto cache', () => {
  it('update cache only when graph is changed', () => {
    const { graph, graphView } = initGraphView('auto');
    let allNodes: ReturnType<typeof graphView['getAllNodes']> = [];
    graph.batch(() => {
      graph.addNode({ id: 5, data: { visible: true } });
      allNodes = graphView.getAllNodes();
    });
    expect(sort(allNodes).map((n) => n.id)).toEqual([0, 1, 2, 3]);
    expect(sort(graphView.getAllNodes()).map((n) => n.id)).toEqual([
      0, 1, 2, 3, 5,
    ]);
  });

  it('stop/start auto caching', () => {
    const { graph, graphView } = initGraphView('auto');

    // Stop auto caching.
    graphView.stopAutoCache();
    graph.addNode({ id: 5, data: { visible: true } });
    expect(sort(graphView.getAllNodes()).map((n) => n.id)).toEqual([
      0, 1, 2, 3,
    ]);

    // Start auto caching.
    graphView.startAutoCache();
    expect(sort(graphView.getAllNodes()).map((n) => n.id)).toEqual([
      0, 1, 2, 3, 5,
    ]);
    graph.addNode({ id: 6, data: { visible: true } });
    expect(sort(graphView.getAllNodes()).map((n) => n.id)).toEqual([
      0, 1, 2, 3, 5, 6,
    ]);
  });
});

describe('GraphView with manual cache', () => {
  test('manual cache', () => {
    const { graph, graphView } = initGraphView('manual');
    // No cache yet.
    expect(graphView.getAllNodes()).toEqual([]);
    // Manually refresh cache.
    graphView.refreshCache();
    expect(sort(graphView.getAllNodes()).map((n) => n.id)).toEqual([
      0, 1, 2, 3,
    ]);
    // Cache remains unchanged unless we manually refresh it.
    graph.addNode({ id: 5, data: { visible: true } });
    expect(sort(graphView.getAllNodes()).map((n) => n.id)).toEqual([
      0, 1, 2, 3,
    ]);
    graphView.refreshCache();
    expect(sort(graphView.getAllNodes()).map((n) => n.id)).toEqual([
      0, 1, 2, 3, 5,
    ]);
    // Clearing cache.
    graphView.clearCache();
    expect(graphView.getAllNodes()).toEqual([]);
  });
});

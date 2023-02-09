import { Graph } from '../src';

const initTreeGraph = () => {
  //    1    4
  //   / \   |
  //  2   3  5
  const node2 = {
    id: 2,
    data: {},
  };
  const node3 = {
    id: 3,
    data: {},
  };
  const node1 = {
    id: 1,
    data: {},
    children: [node2, node3],
  };
  const node5 = {
    id: 5,
    data: {},
  };
  const node4 = {
    id: 4,
    data: {},
    children: [node5],
  };
  return new Graph({
    tree: [node1, node4],
  });
};

describe('Tree related methods', () => {
  test('Basic getter methods', () => {
    const graph = initTreeGraph();
    expect(graph.getAllNodes().map((n) => n.id)).toEqual([1, 4, 2, 3, 5]);
    expect(graph.getRoots().map((n) => n.id)).toEqual([1, 4]);
    expect(graph.getParent(2)?.id).toEqual(1);
    expect(graph.getParent(4)).toEqual(null);
    expect(graph.getChildren(1).map((n) => n.id)).toEqual([2, 3]);
    expect(graph.getChildren(2).map((n) => n.id)).toEqual([]);

    //    1
    //   / \
    //  2   3
    //  |
    //  4
    //  |
    //  5
    graph.setParent(4, 2);
    expect(graph.getAncestors(5).map((n) => n.id)).toEqual([4, 2, 1]);
  });

  test('Attaching and detaching tree structures', () => {
    const graph = initTreeGraph();
    expect(() => {
      graph.getParent(2, 'TreeKey');
    }).toThrow('Tree structure not found');
    graph.attachTreeStructure('TreeKey');
    expect(graph.getParent(2, 'TreeKey')).toEqual(null);

    graph.detachTreeStructure('TreeKey');
    expect(() => {
      graph.getParent(2, 'TreeKey');
    }).toThrow('Tree structure not found');
  });

  test('Updating parent', () => {
    const graph = initTreeGraph();
    graph.setParent(2, 4);
    expect(graph.getParent(2)?.id).toEqual(4);
    expect(graph.getChildren(4).map((n) => n.id)).toEqual([5, 2]);
    expect(graph.getChildren(1).map((n) => n.id)).toEqual([3]);
  });

  test('Removing nodes', () => {
    const graph = initTreeGraph();
    graph.removeNode(1);
    expect(graph.getRoots().map((n) => n.id)).toEqual([4, 2, 3]);
    expect(graph.getParent(2)).toEqual(null);
    expect(() => {
      graph.getChildren(1);
    }).toThrow('Node not found');
  });

  test('Traversing', () => {
    const graph = initTreeGraph();
    graph.setParent(4, 2);
    graph.setParent(5, 2);
    //     1
    //    / \
    //   2   3
    //  / \
    // 4   5

    const ids: number[] = [];

    // dfs
    graph.dfsTree(1, (n) => {
      ids.push(Number(n.id));
    });
    expect(ids).toEqual([1, 2, 4, 5, 3]);
    // dfs + abort
    ids.length = 0;
    graph.dfsTree(1, (n) => {
      ids.push(Number(n.id));
      if (n.id === 4) return true;
    });
    expect(ids).toEqual([1, 2, 4]);
    // bfs
    ids.length = 0;
    graph.bfsTree(1, (n) => {
      ids.push(Number(n.id));
    });
    expect(ids).toEqual([1, 2, 3, 4, 5]);
    // bfs + abort
    ids.length = 0;
    graph.bfsTree(1, (n) => {
      ids.push(Number(n.id));
      if (n.id === 3) return true;
    });
    expect(ids).toEqual([1, 2, 3]);
  });
});

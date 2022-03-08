import Graph from '../Graph';

const doDFS = <NodeIDType = any>(
  graph: Graph<NodeIDType>,
  node: NodeIDType,
  postorder: boolean,
  visited: Set<NodeIDType>,
  navigator: (n: NodeIDType) => NodeIDType[],
  result: NodeIDType[],
) => {
  if (!visited.has(node)) {
    visited.add(node);
    if (!postorder) {
      result.push(node);
    }
    navigator(node).forEach((n) =>
      doDFS<NodeIDType>(graph, n, postorder, visited, navigator, result),
    );
    if (postorder) {
      result.push(node);
    }
  }
};

const dfs = <NodeIDType = any>(
  graph: Graph<NodeIDType>,
  node: NodeIDType | NodeIDType[],
  order: 'pre' | 'post',
) => {
  const nodes = Array.isArray(node) ? node : [node];
  const navigator = (n: NodeIDType) =>
    (graph.isDirected() ? graph.successors(n) : graph.neighbors(n))!;
  const results: NodeIDType[] = [];
  const visited = new Set<NodeIDType>();
  nodes.forEach((node) => {
    if (!graph.hasNode(node)) {
      throw new Error('Graph does not have node: ' + node);
    } else {
      doDFS(graph, node, order === 'post', visited, navigator, results);
    }
  });

  return results;
};

export default dfs;

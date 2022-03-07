import Graph from '../Graph';

const doDFS = <NodeType = any>(
  graph: Graph<NodeType>,
  node: NodeType,
  postorder: boolean,
  visited: Set<NodeType>,
  navigator: (n: NodeType) => NodeType[],
  result: NodeType[],
) => {
  if (!visited.has(node)) {
    visited.add(node);
    if (!postorder) {
      result.push(node);
    }
    navigator(node).forEach((n) =>
      doDFS<NodeType>(graph, n, postorder, visited, navigator, result),
    );
    if (postorder) {
      result.push(node);
    }
  }
};

const dfs = <NodeType = any>(
  graph: Graph<NodeType>,
  node: NodeType | NodeType[],
  order: 'pre' | 'post',
) => {
  const nodes = Array.isArray(node) ? node : [node];
  const navigator = (n: NodeType) =>
    (graph.isDirected() ? graph.successors(n) : graph.neighbors(n))!;
  const results: NodeType[] = [];
  const visited = new Set<NodeType>();
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

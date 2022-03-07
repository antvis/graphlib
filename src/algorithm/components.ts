import Graph from '../Graph';

const components = <NodeType = any>(graph: Graph<NodeType>) => {
  const visited = new Set();
  const resultComponents: NodeType[][] = [];
  const nodes = graph.nodes();

  const dfs = (node: NodeType, arr: NodeType[]) => {
    if (!visited.has(node)) {
      visited.add(node);
      arr.push(node);
      graph.successors(node)?.forEach((n) => dfs(n, arr));
      graph.predecessors(node)?.forEach((n) => dfs(n, arr));
    }
  };

  nodes.forEach((n) => {
    const componentsArr: any[] = [];
    dfs(n, componentsArr);
    if (componentsArr.length) {
      resultComponents.push(componentsArr);
    }
  });

  return resultComponents;
};

export default components;

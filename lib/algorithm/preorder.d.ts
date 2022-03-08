import Graph from '../Graph';
declare const preorder: <NodeType>(
  graph: Graph<NodeType, Record<string, any>, Record<string, any>, string>,
  nodes: NodeType[],
) => NodeType[];
export default preorder;

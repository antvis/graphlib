import Graph from '../Graph';
declare const postorder: <NodeType>(
  graph: Graph<NodeType, Record<string, any>, Record<string, any>, string>,
  nodes: NodeType[],
) => NodeType[];
export default postorder;

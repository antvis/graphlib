import Graph from '../Graph';
declare const tarjan: <NodeIDType>(
  graph: Graph<NodeIDType, Record<string, any>, Record<string, any>, string>,
) => NodeIDType[][];
export default tarjan;

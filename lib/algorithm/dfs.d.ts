import Graph from '../Graph';
declare const dfs: <NodeIDType = any>(
  graph: Graph<NodeIDType, Record<string, any>, Record<string, any>, string>,
  node: NodeIDType | NodeIDType[],
  order: 'pre' | 'post',
) => NodeIDType[];
export default dfs;

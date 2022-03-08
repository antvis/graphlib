import Graph, { DefaultEdgeType } from '../Graph';
declare const dijkstra: <NodeIDType, EdgeType>(
  graph: Graph<NodeIDType, any, EdgeType, string>,
  source: NodeIDType,
  weightFn?: ((node: DefaultEdgeType<NodeIDType, EdgeType>) => number) | undefined,
  edgeFn?: ((node: NodeIDType) => DefaultEdgeType<NodeIDType, EdgeType>[]) | undefined,
) => Record<string, Entry<NodeIDType>>;
declare type Entry<NodeIDType> = {
  distance: number;
  predecessor?: NodeIDType;
};
export default dijkstra;

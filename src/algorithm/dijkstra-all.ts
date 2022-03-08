import Graph, { DefaultEdgeType } from '../Graph';
import dijkstra from './dijkstra';

const dijkstraAll = <NodeType, EdgeType>(
  graph: Graph<NodeType, any, EdgeType>,
  weightFn?: (node: DefaultEdgeType<NodeType, EdgeType>) => number,
  edgeFn?: (node: NodeType) => DefaultEdgeType<NodeType, EdgeType>[],
) => {
  return graph.nodes().reduce((map, node) => {
    map[String(node)] = dijkstra(graph, node, weightFn, edgeFn);
    return map;
  }, {} as Record<any, ReturnType<typeof dijkstra>>);
};

export default dijkstraAll;

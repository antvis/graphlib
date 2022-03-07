import dfs from './dfs';
import Graph from '../Graph';

const preorder = <NodeType>(graph: Graph<NodeType>, nodes: NodeType[]) =>
  dfs<NodeType>(graph, nodes, 'pre');

export default preorder;

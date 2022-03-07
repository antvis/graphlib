import dfs from './dfs';
import Graph from '../Graph';

const postorder = <NodeType>(graph: Graph<NodeType>, nodes: NodeType[]) =>
  dfs<NodeType>(graph, nodes, 'post');

export default postorder;

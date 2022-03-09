import Graph, { GraphOption } from '.';

type JSONNode<NodeIDType = string, NodeType = any> = {
  id: NodeIDType;
  value?: NodeType;
  parent?: NodeIDType;
};

const nodeToJSON = <NodeIDType = string, NodeType = any>(
  graph: Graph<NodeIDType, NodeType, any, any>,
) => {
  return graph.nodes().map((n) => {
    const value = graph.node(n);
    const parent = graph.parent(n);
    const node = {
      id: n,
      value,
      parent,
    };
    if (node.value === undefined) {
      delete node.value;
    }
    if (node.parent === undefined) {
      delete node.parent;
    }
    return node as JSONNode<NodeIDType, NodeType>;
  });
};

type JSONEdge<NodeIDType = string, EdgeType = Record<string, any>> = {
  v: NodeIDType;
  w: NodeIDType;
  value?: EdgeType;
  name?: string;
};

const edgeToJSON = <NodeIDType = string, EdgeType = Record<string, any>>(
  graph: Graph<NodeIDType, any, EdgeType, any>,
) => {
  return graph.edges().map((edge) => {
    const value = graph.edge(edge);
    const e = {
      v: edge.v,
      w: edge.w,
      value,
      name: edge.name,
    };

    if (e.name === undefined) {
      delete e.name;
    }

    if (e.value === undefined) {
      delete e.value;
    }

    return e as JSONEdge<NodeIDType, EdgeType>;
  });
};

type JSONGraph<NodeIDType, NodeType, EdgeType, GraphType> = {
  options: GraphOption;
  nodes: JSONNode<NodeIDType, NodeType>[];
  edges: JSONEdge<NodeIDType, EdgeType>[];
  value?: GraphType;
};

export const write = <
  NodeIDType = string,
  NodeType = Record<string, any>,
  EdgeType = Record<string, any>,
  GraphType = string,
>(
  graph: Graph<NodeIDType, NodeType, EdgeType, GraphType>,
) => {
  const json: JSONGraph<NodeIDType, NodeType, EdgeType, GraphType> = {
    options: {
      directed: graph.isDirected(),
      multigraph: graph.isMultigraph(),
      compound: graph.isCompound(),
    },
    nodes: nodeToJSON<NodeIDType, NodeType>(graph),
    edges: edgeToJSON<NodeIDType, EdgeType>(graph),
    value: graph.graph(),
  };
  if (json.value === undefined) {
    delete json.value;
  }

  return json;
};

export const read = <
  NodeIDType = string,
  NodeType = Record<string, any>,
  EdgeType = Record<string, any>,
  GraphType = string,
>(
  json: JSONGraph<NodeIDType, NodeType, EdgeType, GraphType>,
) => {
  const graph = new Graph<NodeIDType, NodeType, EdgeType, GraphType>(json.options);
  if (json.value !== undefined) {
    graph.setGraph(json.value);
  }
  json.nodes.forEach((entry) => {
    graph.setNode(entry.id, entry.value);
    if (entry.parent) {
      graph.setParent(entry.id, entry.parent);
    }
  });
  json.edges.forEach((entry) => {
    graph.setEdge(entry.v, entry.w, entry.value, entry.name);
  });
  return graph;
};

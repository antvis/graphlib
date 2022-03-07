import { edgeArgsToId, isFunction } from '../util';
import { GraphEnum } from '../enum';
import { decrementOrRemoveEntry, edgeArgsToObj, edgeObjToId, incrementOrInitEntry } from '../util';

export interface GraphOption {
  /**
   * @description Is the graph directed or not
   * @description.zh-CN 这个图是否是有向图
   * @default true
   */
  directed?: boolean;

  /**
   * @description Is this graph contains more than one graph data
   * @description.zh-CN 这个图是否包含多个图
   * @default false
   */
  multigraph?: boolean;

  /**
   * @description Is this graph a compound graph;
   * @description.zh-CN 这个图是否是复合图（包含嵌套节点的图）
   * @default false
   */
  compound?: boolean;
}

const defaultOption: GraphOption = {
  compound: false,
  multigraph: false,
  directed: true,
};

export interface DefaultEdgeType<NodeType, EdgeType> {
  v: NodeType;
  w: NodeType;
  name?: string;
  value?: EdgeType;
}

type EdgeID = string;

export default class Graph<NodeType = string, EdgeType = Record<string, any>, LabelType = string> {
  // Graph option or basic props
  private directed: boolean = true;

  private multigraph: boolean = false;

  private compound: boolean = false;

  private GRAPH_NODE = GraphEnum.GRAPH_NODE as unknown as NodeType;

  /**
   * @description Label for this graph itself
   * @description.zh-CN 图本身的标签（label）
   * @default undefined
   */
  label?: LabelType;

  /**
   * @description Number of nodes in the graph
   * @description.zh-CN 节点的数量
   * @default 0
   */
  private nodeCountNum = 0;

  /**
   * @description Number of edges in the graph
   * @description.zh-CN 节点的数量
   * @default 0
   */
  private edgeCountNum = 0;

  private defaultNodeLabelFn: (v: NodeType) => LabelType | undefined = () => undefined;

  private defaultEdgeLabelFn: (v: NodeType, w: NodeType, name?: string) => LabelType | undefined =
    () => undefined;

  constructor(options: GraphOption = {}) {
    const resultOptions = {
      ...defaultOption,
      ...options,
    };
    this.compound = resultOptions.compound!;
    this.directed = resultOptions.directed!;
    this.multigraph = resultOptions.multigraph!;

    if (this.compound) {
      this.parentMap = new Map();
      this.childrenMap = new Map();
    }
  }

  // Map for graph

  private parentMap?: Map<NodeType, NodeType>;

  private childrenMap?: Map<NodeType, Map<NodeType, boolean>>;

  private nodesLabelMap = new Map<NodeType, LabelType | undefined>();

  private inEdgesMap = new Map<NodeType, Map<EdgeID, DefaultEdgeType<NodeType, EdgeType>>>();

  private outEdgesMap = new Map<NodeType, Map<EdgeID, DefaultEdgeType<NodeType, EdgeType>>>();

  private predecessorsMap = new Map<NodeType, Map<NodeType, number>>();

  private successorsMap = new Map<NodeType, Map<NodeType, number>>();

  private edgesMap = new Map<string, DefaultEdgeType<NodeType, EdgeType>>();

  private edgesLabelsMap = new Map<string, LabelType | undefined>();

  /**
   * @description Is the graph directed or not
   * @description.zh-CN 这个图是否是有向图
   * @default true
   */
  isDirected = () => this.directed;

  /**
   * @description Is this graph contains more than one graph data
   * @description.zh-CN 这个图是否包含多个图
   * @default false
   */
  isMultigraph = () => this.multigraph;

  /**
   * @description Is this graph a compound graph;
   * @description.zh-CN 这个图是否是复合图（包含嵌套节点的图）
   * @default false
   */
  isCompound = () => this.compound;

  /**
   * @description Set Graph label (Identity for graph)
   * @description.zh-CN 设置图的标识符
   * @param label
   * @returns
   */
  setGraph = (label?: LabelType) => {
    this.label = label;
    return this;
  };

  /**
   * @description Get Graph label (Identity for graph)
   * @description.zh-CN 获取图的标识符
   * @returns stirng | undefined
   */
  graph = () => this.label as LabelType;

  /**
   * @description Set function that generate default label for node, if param is non-function value then default label will always be this value;
   * @description.zh-CN 设置默认获取节点Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值
   * @param newDefault (node) => label | label
   * @returns this
   */
  setDefaultNodeLabel = (newDefault: any) => {
    if (isFunction(newDefault)) {
      this.defaultNodeLabelFn = newDefault;
    } else {
      this.defaultNodeLabelFn = () => newDefault;
    }
    return this;
  };

  /**
   * @description Count the nodes in graph
   * @description.zh-CN 计算图中所有节点的数量
   * @returns number
   */
  nodeCount = () => this.nodeCountNum;

  node = (n: NodeType) => this.nodesLabelMap.get(n);

  /**
   * @description Return all nodes in graph
   * @description 返回图中所有节点
   * @returns
   */
  nodes = () => Array.from(this.nodesLabelMap.keys());

  /**
   * @description Return all source nodes in graph
   * @description 返回图中所有源头节点（入度为0）
   * @returns
   */
  sources = () => this.nodes().filter((n) => !this.inEdgesMap.get(n)?.size);

  /**
   * @description Return all sink nodes in graph
   * @description 返回图中所有终点节点（出度为0）
   * @returns
   */
  sinks = () => this.nodes().filter((n) => !this.outEdgesMap.get(n)?.size);

  /**
   * @description Set Node label in graph if node not in graph then create it
   * @description.zh-CN 设置节点的label，如果这个节点不在图中，则在图中创建这个节点
   * @param node
   * @param value
   * @returns
   */
  setNode = (node: NodeType, value?: LabelType) => {
    const {
      nodesLabelMap,
      defaultNodeLabelFn,
      isCompound,
      parentMap,
      childrenMap,
      inEdgesMap,
      outEdgesMap,
      predecessorsMap,
      successorsMap,
    } = this;
    if (nodesLabelMap.has(node)) {
      if (value) {
        nodesLabelMap.set(node, value);
      }
      return this;
    }

    nodesLabelMap.set(node, value || defaultNodeLabelFn(node));

    if (isCompound()) {
      parentMap?.set(node, this.GRAPH_NODE);
      childrenMap?.set(node, new Map());
      if (!childrenMap?.has(this.GRAPH_NODE)) {
        childrenMap?.set(this.GRAPH_NODE, new Map());
      }
      childrenMap?.get(this.GRAPH_NODE)?.set(node, true);
    }

    [inEdgesMap, outEdgesMap, predecessorsMap, successorsMap].forEach((map) =>
      map.set(node, new Map()),
    );

    this.nodeCountNum += 1;
    return this;
  };

  /**
   * @description Set nodes or add nodes in batch
   * @description.zh-CN 批量设置或者创建节点
   * @param nodes
   * @param value
   * @returns
   */
  setNodes = (nodes: NodeType[], value?: LabelType) => {
    nodes.map((node) => this.setNode(node, value));
    return this;
  };

  /**
   * @description Is the node in graph
   * @description.zh-CN 判断节点是否在图中
   * @param node
   * @returns
   */
  hasNode = (node: NodeType) => this.nodesLabelMap.has(node);

  /**
   * @description if graph is not compound then throw error
   * @description.zh-CN 如果图不是复合图就报错
   */
  private checkCompound = () => {
    if (!this.isCompound()) {
      throw new Error('Cannot construct parent-children relations in a non-compound graph');
    }
  };

  /**
   * @description Find node's parent (compond graph only)
   * @description.zh-CN 寻找节点的父节点 (只有复合图可以使用)
   * @param node
   * @returns
   */
  parent = (node: NodeType) => {
    if (this.isCompound()) {
      const parent = this.parentMap?.get(node);
      if (parent !== this.GRAPH_NODE) {
        return parent;
      }
    }
  };

  /**
   * @description Remove node from its parent (compond graph only)
   * @description.zh-CN 将节点与其父节点之间的父子关系删除(只有复合图可以使用)
   * @param node
   */
  private removeFromParentsChildList = (node: NodeType) => {
    const targetParent = this.parentMap!.get(node)!;
    this.childrenMap!.get(targetParent)!.delete(node);
  };

  /**
   * @description Set node's parent(default is the graph) (compond graph only)
   * @description.zh-CN 设置节点的父节点，如果没有给定，父节点为这个图 (只有复合图可以使用)
   * @param node
   * @param parent
   * @returns
   */
  setParent = (node: NodeType, parent?: NodeType) => {
    this.checkCompound();
    let realParent = parent === undefined ? this.GRAPH_NODE : parent;
    let checkNode = this.parent(realParent);

    while (checkNode) {
      if (node === checkNode) {
        throw new Error('Setting ' + parent + ' as parent of ' + node + ' would create a cycle');
      }
      checkNode = this.parent(checkNode);
    }

    if (parent) {
      this.setNode(parent);
    }

    this.setNode(node);

    this.removeFromParentsChildList(node);
    this.parentMap?.set(node, realParent);

    const realParentChilren = this.childrenMap!.get(realParent)!;

    realParentChilren.set(node, true);
    this.childrenMap?.set(realParent, realParentChilren);

    return this;
  };

  /**
   * @description get graph's or node's children
   * @description.zh-CN 获取图或者节点的字节点
   * @param node
   * @returns
   */
  children = (node?: NodeType) => {
    const targetNode = node === undefined ? this.GRAPH_NODE : node;

    if (this.isCompound()) {
      const target = this.childrenMap?.get(targetNode);
      if (target) {
        return Array.from(target.keys());
      }
      return undefined;
    }
    if (targetNode === this.GRAPH_NODE) {
      return this.nodes();
    }
    if (node && this.hasNode(node)) {
      return [];
    }
  };

  /**
   * @description get node's predecessors
   * @description.zh-CN 获取节点的所有上游节点
   * @param node
   * @returns
   */
  predecessors = (node: NodeType) => {
    const preds = this.predecessorsMap.get(node);
    return preds ? Array.from(preds.keys()) : undefined;
  };

  /**
   * @description get node's successors
   * @description.zh-CN 获取节点的所有下游节点
   * @param node
   * @returns
   */
  successors = (node: NodeType) => {
    const succs = this.successorsMap.get(node);
    return succs ? Array.from(succs.keys()) : undefined;
  };

  /**
   * @description get node's neighbors
   * @description.zh-CN 获取节点的所有邻居节点
   * @param node
   * @returns
   */
  neighbors = (node: NodeType) => {
    if (!this.hasNode(node)) {
      return undefined;
    }
    return Array.from(new Set(this.predecessors(node)?.concat(this.successors(node)!)));
  };

  /**
   * @description Is the node a leaf node
   * @description.zh-CN 判断节点是否为叶子节点
   * @param node
   * @returns
   */
  isLeaf = (node: NodeType) => {
    if (this.isDirected()) {
      return !this.successors(node)?.length;
    }
    return !this.neighbors(node)?.length;
  };

  /**
   * @description Using node filter to create a new graph;
   * @description.zh-CN 过滤节点并创建一个新图
   * @param filter
   * @returns
   */
  filterNodes = (filter: (node: NodeType) => boolean) => {
    const { directed, multigraph, compound } = this;
    const copyGraph = new Graph<NodeType, EdgeType, LabelType>({
      directed,
      multigraph,
      compound,
    });

    copyGraph.setGraph(this.graph());

    Array.from(this.nodesLabelMap.entries()).forEach(([node, value]) => {
      if (filter(node)) {
        copyGraph.setNode(node, value);
      }
    });

    Array.from(this.edgesMap.entries()).forEach(([edgeId, edgeObj]) => {
      if (copyGraph.hasNode(edgeObj.v) && copyGraph.hasNode(edgeObj.w)) {
        copyGraph.setEdge(edgeObj.v, edgeObj.w, this.edgesLabelsMap.get(edgeId), edgeObj.name);
      }
    });

    if (compound) {
      const findParent = (node: NodeType) => {
        let parent = this.parent(node);

        while (parent !== undefined && !copyGraph.hasNode(parent)) {
          parent = this.parent(parent);
        }

        return parent;
      };
      copyGraph.nodes().forEach((node) => {
        copyGraph.setParent(node, findParent(node));
      });
    }

    return copyGraph;
  };

  /**
   * @description Remove node from graph
   * @description.zh-CN 将节点从图中移除
   * @param node
   * @returns
   */
  removeNode = (node: NodeType) => {
    if (this.hasNode(node)) {
      const cleanEdge = (edgeObj: DefaultEdgeType<NodeType, EdgeType>) => {
        this.removeEdge(edgeObj.v, edgeObj.w, edgeObj.name);
      };

      const { inEdgesMap, outEdgesMap, predecessorsMap, successorsMap, nodesLabelMap } = this;

      if (this.isCompound()) {
        this.removeFromParentsChildList(node);
        this.parentMap?.delete(node);
        this.children(node)?.forEach((n) => this.setParent(n));
        this.childrenMap?.delete(node);
      }

      const inE = inEdgesMap.get(node)!;
      const outE = outEdgesMap.get(node)!;

      Array.from(inE.values()).forEach((edge) => cleanEdge(edge));

      Array.from(outE.values()).forEach((edge) => cleanEdge(edge));

      [nodesLabelMap, inEdgesMap, outEdgesMap, predecessorsMap, successorsMap].forEach((map) =>
        map.delete(node),
      );
      this.nodeCountNum -= 1;
    }
    return this;
  };

  /**
   * @description Set function that generate default label for edge, if param is non-function value then default label will always be this value;
   * @description.zh-CN 设置默认获取边Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值
   * @param newDefault
   * @returns
   */
  setDefaultEdgeLabel = (newDefault: any) => {
    if (isFunction(newDefault)) {
      this.defaultEdgeLabelFn = newDefault;
    } else {
      this.defaultEdgeLabelFn = () => newDefault;
    }
    return this;
  };

  /**
   * @description Count the edge in graph
   * @description.zh-CN 返回图中边的数量
   * @returns number
   */
  edgeCount = () => this.edgeCountNum;

  /**
   * @description set edge value, if nodes or edges not exsit then add to graph
   * @description.zh-CN 设置边的属性，如果边或节点不存在，那么将他们加入这个图
   * @param v
   * @param w
   * @param value
   * @param name
   * @returns
   */
  setEdge = (v_: NodeType, w_: NodeType, value?: any, name?: string) => {
    const edgeObj = edgeArgsToObj<NodeType>(this.isDirected(), v_, w_, name);
    const edgeId = edgeObjToId(this.isDirected(), edgeObj);
    const { v, w } = edgeObj;

    if (this.edgesLabelsMap.has(edgeId)) {
      this.edgesLabelsMap.set(edgeId, value);
      return this;
    }

    if (name !== undefined && !this.isMultigraph()) {
      throw new Error('Cannot set a named edge when isMultigraph = false');
    }

    this.setNode(v);
    this.setNode(w);
    this.edgesLabelsMap.set(edgeId, value || this.defaultEdgeLabelFn(v, w, name));

    Object.freeze(edgeObj);

    this.edgesMap.set(edgeId, edgeObj);
    const preds = this.predecessorsMap.get(w)!;
    const succs = this.successorsMap.get(v)!;
    incrementOrInitEntry(preds, v);
    incrementOrInitEntry(succs, w);

    this.inEdgesMap.get(w)?.set(edgeId, edgeObj);
    this.outEdgesMap.get(v)?.set(edgeId, edgeObj);
    this.edgeCountNum += 1;

    return this;
  };

  setEdgeObj = (edgeObj: DefaultEdgeType<NodeType, EdgeType>) => {
    return this.setEdge(edgeObj.v, edgeObj.w, edgeObj.value, edgeObj.name);
  };

  /**
   * @description Add edge using a sorted node array ([a,b,c] => a->b b->c c->a)
   * @description.zh-CN 用一系列节点来定义一群边([a,b,c] => a->b b->c c->a)
   * @param edges
   * @param value
   * @returns
   */
  setPath = (edges: NodeType[], value?: any) => {
    edges.reduce((v, w) => {
      this.setEdge(v, w, value);
      return w;
    });
    return this;
  };

  /**
   * @description Get edge between two nodes
   * @description.zh-CN 获得两个节点中的一条边
   * @param v
   * @param w
   * @param name
   * @returns
   */
  edge = (v: NodeType, w: NodeType, name?: any) => {
    return this.edgesLabelsMap.get(edgeObjToId(this.isDirected(), { v, w, name }));
  };

  /**
   * @description Get edge between two nodes by edge object
   * @description.zh-CN 从edgeObj获得两个节点中的一条边
   * @param edgeObj
   * @returns
   */
  edgeFromObj = (edgeObj: { v: NodeType; w: NodeType; name?: any }) => {
    return this.edgesLabelsMap.get(edgeObjToId(this.isDirected(), edgeObj));
  };

  /**
   * @description Does two nodes has a specific edge
   * @description.zh-CN 两个节点之间是否存在确定的一条边
   * @param v
   * @param w
   * @param name
   * @returns
   */
  hasEdge = (v: NodeType, w: NodeType, name?: any) => {
    return this.edgesLabelsMap.has(edgeObjToId(this.isDirected(), { v, w, name }));
  };

  /**
   * @description remove a specific edge
   * @description.zh-CN 删除一条边
   * @param v
   * @param w
   * @param name
   * @returns
   */
  removeEdge = (v_: NodeType, w_: NodeType, name?: any) => {
    const edgeId = edgeArgsToId(this.isDirected(), v_, w_, name);
    const edgeObj = this.edgesMap.get(edgeId);
    if (edgeObj) {
      const { v, w } = edgeArgsToObj(this.isDirected(), v_, w_, name);
      this.edgesLabelsMap.delete(edgeId);
      this.edgesMap.delete(edgeId);
      const preds = this.predecessorsMap.get(w)!;
      const succs = this.successorsMap.get(v)!;
      decrementOrRemoveEntry(preds, v);
      decrementOrRemoveEntry(succs, w);

      this.inEdgesMap.get(w)!.delete(edgeId);
      this.outEdgesMap.get(v)!.delete(edgeId);

      this.edgeCountNum -= 1;
    }
    return this;
  };

  edges = () => Array.from(this.edgesMap.values());

  /**
   * @description get edges that target at the node (could be from certain node)
   * @description.zh-CN 获取所有指向节点的边，可以指定来源节点
   * @param v
   * @param u
   * @returns
   */
  inEdges = (v: NodeType, u?: NodeType) => {
    const inV = this.inEdgesMap.get(v);
    if (inV) {
      return Array.from(inV.values()).filter((e) => !u || e.v === u);
    }
    return undefined;
  };

  /**
   * @description get edges that from the node (could target at certain node)
   * @description.zh-CN 获取所有来源于节点的边，可以指定目标节点
   * @param w
   * @param u
   * @returns
   */
  outEdges = (w: NodeType, u?: NodeType) => {
    const outW = this.outEdgesMap.get(w);
    if (outW) {
      return Array.from(outW.values()).filter((e) => !u || e.w === u);
    }
    return undefined;
  };

  /**
   * @description get edges between two nodes
   * @description.zh-CN 获取两个节点间所有的节点
   * @param w
   * @param u
   * @returns
   */
  nodeEdges = (v: NodeType, w?: NodeType) => {
    if (!this.hasNode(v)) {
      return undefined;
    }
    return this.inEdges(v, w)?.concat(this.outEdges(v, w)!);
  };
}

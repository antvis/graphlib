import { Graph } from './graph';
import { Edge, GraphViewOptions, ID, Node, PlainObject } from './types';
import { doBFS, doDFS } from './utils/traverse';

const defaultFilter = () => true;

export class GraphView<N extends PlainObject, E extends PlainObject> {
  private graph: Graph<N, E>;
  private nodeFilter: (node: Node<N>, graph: Graph<N, E>) => boolean;
  private edgeFilter: (edge: Edge<E>, graph: Graph<N, E>) => boolean;

  constructor(options: GraphViewOptions<N, E>) {
    this.graph = options.graph;
    const nodeFilter = options.nodeFilter || defaultFilter;
    const edgeFilter = options.edgeFilter || defaultFilter;

    this.nodeFilter = nodeFilter;
    this.edgeFilter = (edge, graph) => {
      const { source, target } = graph.getEdgeDetail(edge.id);
      if (!nodeFilter(source, graph) || !nodeFilter(target, graph)) {
        return false;
      }
      return edgeFilter(edge, source, target, graph);
    };
  }

  // ================= Node =================
  private checkNodeExistence(id: ID): void {
    this.getNode(id);
  }

  hasNode(id: ID): boolean {
    if (!this.graph.hasNode(id)) return false;
    const node = this.graph.getNode(id);
    return this.nodeFilter(node, this.graph);
  }

  public areNeighbors(firstNodeId: ID, secondNodeId: ID): boolean {
    this.checkNodeExistence(firstNodeId);
    return this.getNeighbors(secondNodeId).some(
      (neighbor) => neighbor.id === firstNodeId,
    );
  }

  public getNode(id: ID): Node<N> {
    const node = this.graph.getNode(id);
    if (!this.nodeFilter(node, this.graph)) {
      throw new Error('Node not found for id: ' + id);
    }
    return node;
  }

  public getRelatedEdges(id: ID, direction?: 'in' | 'out' | 'both'): Edge<E>[] {
    this.checkNodeExistence(id);
    const edges = this.graph.getRelatedEdges(id, direction);
    return edges.filter((edge) => this.edgeFilter(edge, this.graph));
  }

  public getDegree(id: ID, direction?: 'in' | 'out' | 'both'): number {
    return this.getRelatedEdges(id, direction).length;
  }

  public getSuccessors(id: ID): Node<N>[] {
    const outEdges = this.getRelatedEdges(id, 'out');
    const targets = outEdges.map((edge) => edge.target);
    return Array.from(new Set(targets)).map((id) => this.getNode(id));
  }

  public getPredecessors(id: ID): Node<N>[] {
    const inEdges = this.getRelatedEdges(id, 'in');
    const sources = inEdges.map((edge) => edge.source);
    return Array.from(new Set(sources)).map((id) => this.getNode(id));
  }

  public getNeighbors(id: ID): Node<N>[] {
    const predecessors = this.getPredecessors(id);
    const successors = this.getSuccessors(id);
    return Array.from(new Set([...predecessors, ...successors]));
  }

  // ================= Edge =================
  public hasEdge(id: ID): boolean {
    if (!this.graph.hasEdge(id)) return false;
    const edge = this.graph.getEdge(id);
    return this.edgeFilter(edge, this.graph);
  }

  public getEdge(id: ID): Edge<E> {
    const edge = this.graph.getEdge(id);
    if (!this.edgeFilter(edge, this.graph)) {
      throw new Error('Edge not found for id: ' + id);
    }
    return edge;
  }

  public getEdgeDetail(id: ID): {
    edge: Edge<E>;
    source: Node<N>;
    target: Node<N>;
  } {
    const edge = this.getEdge(id);
    return {
      edge,
      source: this.getNode(edge.source),
      target: this.getNode(edge.target),
    };
  }

  // ================= Tree =================
  public hasTreeStructure(treeKey: string | undefined): boolean {
    return this.graph.hasTreeStructure(treeKey);
  }

  public getRoots(treeKey?: string): Node<N>[] {
    return this.graph
      .getRoots(treeKey)
      .filter((node) => this.nodeFilter(node, this.graph));
  }

  public getChildren(id: ID, treeKey?: string): Node<N>[] {
    this.checkNodeExistence(id);
    return this.graph
      .getChildren(id, treeKey)
      .filter((node) => this.nodeFilter(node, this.graph));
  }

  public getParent(id: ID, treeKey?: string): Node<N> | null {
    this.checkNodeExistence(id);
    const parent = this.graph.getParent(id, treeKey);
    if (!parent || !this.nodeFilter(parent, this.graph)) return null;
    return parent;
  }

  // ================= Graph =================
  public getAllNodes(): Node<N>[] {
    return this.graph
      .getAllNodes()
      .filter((node) => this.nodeFilter(node, this.graph));
  }

  public getAllEdges(): Edge<E>[] {
    return this.graph
      .getAllEdges()
      .filter((edge) => this.edgeFilter(edge, this.graph));
  }

  public bfs(
    id: ID,
    fn: (node: Node<N>) => void,
    direction: 'in' | 'out' | 'both' = 'out',
  ): void {
    const navigator = {
      in: this.getPredecessors.bind(this),
      out: this.getSuccessors.bind(this),
      both: this.getNeighbors.bind(this),
    }[direction];
    doBFS([this.getNode(id)], new Set(), fn, navigator);
  }

  public dfs(
    id: ID,
    fn: (node: Node<N>) => void,
    direction: 'in' | 'out' | 'both' = 'out',
  ): void {
    const navigator = {
      in: this.getPredecessors.bind(this),
      out: this.getSuccessors.bind(this),
      both: this.getNeighbors.bind(this),
    }[direction];
    doDFS(this.getNode(id), new Set(), fn, navigator);
  }
}

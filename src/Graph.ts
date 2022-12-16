import {
  Node,
  Edge,
  GraphChange,
  GraphChangedEvent,
  GraphDiff,
  GraphOptions,
  ID,
  TreeData,
  PlainObject,
  TreeIndices,
} from './types';

export class Graph<N extends PlainObject, E extends PlainObject> {
  private nodeMap: Map<ID, Node<N>> = new Map();
  private edgeMap: Map<ID, Edge<E>> = new Map();
  private inEdgesMap: Map<ID, Set<Edge<E>>> = new Map();
  private outEdgesMap: Map<ID, Set<Edge<E>>> = new Map();
  private treeIndices: TreeIndices<Node<N>> = new Map();

  private changes: GraphChange<N, E>[] = [];
  private batchCount = 0;

  /**
   * This function is called with a {@link GraphChangedEvent} each time a graph change happened.
   *
   * `event.changes` contains all the graph changes in order since last `onChanged`.
   */
  public onChanged: (event: GraphChangedEvent<N, E>) => void = () => {
    // Do nothing.
  };

  /**
   * Create a new Graph instance.
   * @param options - The options to initialize a graph. See {@link GraphOptions}.
   *
   * ```ts
   * const graph = new Graph({
   *   // Optional, initial nodes.
   *   nodes: [
   *     // Each node has a unique ID.
   *     { id: 'A', foo: 1 },
   *     { id: 'B', foo: 1 },
   *   ],
   *   // Optional, initial edges.
   *   edges: [
   *     { id: 'C', source: 'B', target: 'B', weight: 1 },
   *   ],
   *   // Optional, called with a GraphChangedEvent.
   *   onChanged: (event) => {
   *     console.log(event);
   *   }
   * });
   * ```
   */
  constructor(options?: GraphOptions<N, E>) {
    if (!options) return;
    if (options.nodes) this.addNodes(options.nodes);
    if (options.edges) this.addEdges(options.edges);
    if (options.tree) this.addTree(options.tree);
    if (options.onChanged) this.onChanged = options.onChanged;
  }

  /**
   * Batch several graph changes into one.
   *
   * Make several changes, but dispatch only one ChangedEvent at the end of batch:
   * ```ts
   * graph.batch(() => {
   *   graph.addNodes([]);
   *   graph.addEdges([]);
   * });
   * ```
   *
   * Batches can be nested. Only the outermost batch will dispatch a ChangedEvent:
   * ```ts
   * graph.batch(() => {
   *   graph.addNodes([]);
   *   graph.batch(() => {
   *     graph.addEdges([]);
   *   });
   * });
   * ```
   */
  public batch = (fn: () => void): void => {
    this.batchCount += 1;
    fn();
    this.batchCount -= 1;
    if (!this.batchCount) {
      this.commit();
    }
  };

  /**
   * Reset changes and dispatch a ChangedEvent.
   */
  private commit(): void {
    const changes = this.changes;
    this.changes = [];
    this.onChanged({
      graph: this,
      changes,
    });
  }

  /**
   * Merge ordered atomic changes to a single {@link GraphDiff}.
   */
  public mergeChanges(changes: GraphChange<N, E>[]): GraphDiff<N, E> {
    throw new Error('To be implemented');
  }

  // ================= Node =================
  private checkNodeExistence(id: ID): void {
    if (!this.hasNode(id)) {
      throw new Error('Node not found for id: ' + id);
    }
  }

  /**
   * Check if a node exists in the graph.
   * @group NodeMethods
   */
  public hasNode(id: ID): boolean {
    return this.nodeMap.has(id);
  }

  /**
   * Tell if two nodes are neighbors.
   * @group NodeMethods
   */
  public areNeighbors(firstNodeId: ID, secondNodeId: ID): boolean {
    this.checkNodeExistence(firstNodeId);
    return this.getNeighbors(secondNodeId).some(
      (neighbor) => neighbor.id === firstNodeId,
    );
  }

  /**
   * Get the node data with given ID.
   * @group NodeMethods
   */
  public getNode(id: ID): Node<N> {
    this.checkNodeExistence(id);
    return this.nodeMap.get(id)!;
  }

  /**
   * Given a node ID, find all edges of the node.
   * @param id - ID of the node
   * @param direction - Edge direction, defaults to 'both'.
   * @group NodeMethods
   */
  public getRelatedEdges(id: ID, direction?: 'in' | 'out' | 'both'): Edge<E>[] {
    this.checkNodeExistence(id);

    const inEdges = this.inEdgesMap.get(id)!;
    const outEdges = this.outEdgesMap.get(id)!;

    if (direction === 'in') {
      return Array.from(inEdges);
    } else if (direction === 'out') {
      return Array.from(outEdges);
    }

    const bothEdges = new Set([...inEdges, ...outEdges]);
    return Array.from(bothEdges);
  }

  /**
   * Get the degree of the given node.
   * @group NodeMethods
   */
  public getDegree(id: ID, direction?: 'in' | 'out' | 'both'): number {
    return this.getRelatedEdges(id, direction).length;
  }

  /**
   * Get all successors of the given node.
   */
  public getSuccessors(id: ID): Node<N>[] {
    const outEdges = this.getRelatedEdges(id, 'out');
    const targets = outEdges.map((edge) => edge.target);
    return Array.from(new Set(targets)).map((id) => this.getNode(id));
  }

  /**
   * Get all predecessors of the given node.
   */
  public getPredecessors(id: ID): Node<N>[] {
    const inEdges = this.getRelatedEdges(id, 'in');
    const sources = inEdges.map((edge) => edge.source);
    return Array.from(new Set(sources)).map((id) => this.getNode(id));
  }

  /**
   * Given a node ID, find its neighbors.
   * @param id - ID of the node
   * @group NodeMethods
   */
  public getNeighbors(id: ID): Node<N>[] {
    const predecessors = this.getPredecessors(id);
    const successors = this.getSuccessors(id);
    return Array.from(new Set([...predecessors, ...successors]));
  }

  private doAddNode(node: Node<N>): void {
    if (this.hasNode(node.id)) {
      throw new Error('Node already exists: ' + node.id);
    }
    this.nodeMap.set(node.id, node);
    this.inEdgesMap.set(node.id, new Set());
    this.outEdgesMap.set(node.id, new Set());
    this.treeIndices.forEach((tree) => {
      tree.childrenMap.set(node.id, new Set());
    });
    this.changes.push({ type: 'NodeAdded', value: node });
  }

  /**
   * Add all nodes of the given array, or iterable, into the graph.
   * @group NodeMethods
   */
  public addNodes(nodes: Iterable<Node<N>>) {
    this.batch(() => {
      for (const node of nodes) {
        this.doAddNode(node);
      }
    });
  }

  /**
   * Add a single node into the graph.
   * @group NodeMethods
   */
  public addNode(node: Node<N>): void {
    this.addNodes([node]);
  }

  private doRemoveNode(id: ID): void {
    const node = this.getNode(id);
    const inEdges = this.inEdgesMap.get(id);
    const outEdges = this.outEdgesMap.get(id);
    inEdges?.forEach((edge) => this.doRemoveEdge(edge.id));
    outEdges?.forEach((edge) => this.doRemoveEdge(edge.id));
    this.nodeMap.delete(id);
    this.treeIndices.forEach((tree) => {
      tree.childrenMap.get(id)?.forEach((child) => {
        tree.parentMap.delete(child.id);
      });
      tree.parentMap.delete(id);
      tree.childrenMap.delete(id);
    });
    this.changes.push({ type: 'NodeRemoved', value: node });
  }

  /**
   * Remove nodes and their attached edges from the graph.
   * @group NodeMethods
   */
  public removeNodes(idList: ID[]): void {
    this.batch(() => {
      idList.forEach((id) => this.doRemoveNode(id));
    });
  }

  /**
   * Remove a single node and its attached edges from the graph.
   * @group NodeMethods
   */
  public removeNode(id: ID): void {
    this.removeNodes([id]);
  }

  /**
   * Update node data.
   * @group NodeMethods
   */
  public updateNodeData<P extends keyof N>(
    id: ID,
    propertyName: P,
    value: N[P],
  ): void {
    const node = this.getNode(id);
    this.batch(() => {
      const oldValue = node.data[propertyName];
      const newValue = value;
      node.data[propertyName] = newValue;
      this.changes.push({
        type: 'NodeDataUpdated',
        id,
        propertyName,
        oldValue,
        newValue,
      });
    });
  }

  /**
   * Like Object.assign, merge all properties of `path` to the node data.
   * @param id Node ID.
   * @param patch A data object to merge.
   */
  public mergeNodeData(id: ID, patch: Partial<N>): void {
    this.batch(() => {
      Object.entries(patch).forEach(([propertyName, value]) => {
        this.updateNodeData(id, propertyName, value);
      });
    });
  }

  // ================= Edge =================
  private checkEdgeExistence(id: ID): void {
    if (!this.hasEdge(id)) {
      throw new Error('Edge not found for id: ' + id);
    }
  }

  /**
   * Check if an edge exists in the graph.
   * @group NodeMethods
   */
  public hasEdge(id: ID): boolean {
    return this.edgeMap.has(id);
  }

  /**
   * Get the edge data with given ID.
   * @group EdgeMethods
   */
  public getEdge(id: ID): Edge<E> {
    this.checkEdgeExistence(id);
    return this.edgeMap.get(id)!;
  }

  /**
   * Get the edge, the source node, and the target node by an edge ID.
   * @group EdgeMethods
   */
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

  private doAddEdge(edge: Edge<E>): void {
    if (this.hasEdge(edge.id)) {
      throw new Error('Edge already exists: ' + edge.id);
    }
    this.checkNodeExistence(edge.source);
    this.checkNodeExistence(edge.target);

    this.edgeMap.set(edge.id, edge);
    const inEdges = this.inEdgesMap.get(edge.target)!;
    const outEdges = this.outEdgesMap.get(edge.source)!;
    inEdges.add(edge);
    outEdges.add(edge);

    this.changes.push({ type: 'EdgeAdded', value: edge });
  }

  /**
   * Add all edges of the given iterable(an array, a set, etc.) into the graph.
   * @group EdgeMethods
   */
  public addEdges(edges: Iterable<Edge<E>>): void {
    this.batch(() => {
      for (const edge of edges) {
        this.doAddEdge(edge);
      }
    });
  }

  /**
   * Add a single edge pointing from `source` to `target` into the graph.
   *
   * ```ts
   * graph.addNode({ id: 'NodeA' });
   * graph.addNode({ id: 'NodeB' });
   * graph.addEdge({ id: 'EdgeA', source: 'NodeA', target: 'NodeB' });
   * ```
   *
   * If `source` or `target` were not found in the current graph, it throws an Error.
   * @group EdgeMethods
   */
  public addEdge(edge: Edge<E>): void {
    this.addEdges([edge]);
  }

  private doRemoveEdge(id: ID): void {
    const edge = this.getEdge(id);
    const outEdges = this.outEdgesMap.get(edge.source)!;
    const inEdges = this.inEdgesMap.get(edge.target)!;
    outEdges.delete(edge);
    inEdges.delete(edge);
    this.edgeMap.delete(id);
    this.changes.push({ type: 'EdgeRemoved', value: edge });
  }

  /**
   * Remove edges whose id was included in the given id list.
   * @group EdgeMethods
   */
  public removeEdges(idList: ID[]): void {
    this.batch(() => {
      idList.forEach((id) => this.doRemoveEdge(id));
    });
  }

  /**
   * Remove a single edge of the given id.
   * @group EdgeMethods
   */
  public removeEdge(id: ID): void {
    this.removeEdges([id]);
  }

  /**
   * Change the source of an edge. The source must be found in current graph.
   * @group EdgeMethods
   */
  public updateEdgeSource(id: ID, source: ID): void {
    const edge = this.getEdge(id);
    this.checkNodeExistence(source);
    const oldSource = edge.source;
    const newSource = source;
    this.outEdgesMap.get(oldSource)!.delete(edge);
    this.outEdgesMap.get(newSource)!.add(edge);
    edge.source = source;
    this.batch(() => {
      this.changes.push({
        type: 'EdgeUpdated',
        id,
        propertyName: 'source',
        oldValue: oldSource,
        newValue: newSource,
      });
    });
  }

  /**
   * Change the target of an edge. The target must be found in current graph.
   * @group EdgeMethods
   */
  public updateEdgeTarget(id: ID, target: ID): void {
    const edge = this.getEdge(id);
    this.checkNodeExistence(target);
    const oldTarget = edge.target;
    const newTarget = target;
    this.inEdgesMap.get(oldTarget)!.delete(edge);
    this.inEdgesMap.get(newTarget)!.add(edge);
    edge.target = target;
    this.batch(() => {
      this.changes.push({
        type: 'EdgeUpdated',
        id,
        propertyName: 'target',
        oldValue: oldTarget,
        newValue: newTarget,
      });
    });
  }

  /**
   * Update edge data.
   * @group EdgeMethods
   */
  public updateEdgeData<P extends keyof E>(
    id: ID,
    propertyName: P,
    value: E[P],
  ): void {
    const edge = this.getEdge(id);
    this.batch(() => {
      const oldValue = edge.data[propertyName];
      const newValue = value;
      edge.data[propertyName] = newValue;
      this.changes.push({
        type: 'EdgeDataUpdated',
        id,
        propertyName,
        oldValue,
        newValue,
      });
    });
  }
  /**
   * @group EdgeMethods
   */
  public mergeEdgeData(id: ID, patch: Partial<E>): void {
    this.batch(() => {
      Object.entries(patch).forEach(([propertyName, value]) => {
        this.updateEdgeData(id, propertyName, value);
      });
    });
  }

  // ================= Tree =================
  private checkTreeExistence(treeKey: string | undefined): void {
    if (!this.treeIndices.has(treeKey)) {
      throw new Error('Tree structure not found for treeKey: ' + treeKey);
    }
  }

  /**
   * Attach a new tree structure representing the hierarchy of all nodes in the graph.
   * @param treeKey A unique key of the tree structure. You can attach multiple tree structures with different keys.
   *
   * ```ts
   * const graph = new Graph({
   *   nodes: [{ id: 1 }, { id: 2 }, { id: 3 }],
   * });
   * graph.attachTreeStructure('Inheritance');
   * graph.setParent(2, 1, 'Inheritance');
   * graph.setParent(3, 1, 'Inheritance');
   * graph.getRoots('Inheritance'); // [1]
   * graph.getChildren(1, 'Inheritance'); // [2,3]
   * ```
   * @group TreeMethods
   */
  public attachTreeStructure(treeKey?: string): void {
    if (this.treeIndices.has(treeKey)) {
      // Already attached.
      return;
    }
    this.treeIndices.set(treeKey, {
      parentMap: new Map(),
      childrenMap: new Map(),
    });
    this.batch(() => {
      this.changes.push({
        type: 'TreeStructureAttached',
        treeKey,
      });
    });
  }

  /**
   * Detach the tree structure of the given tree key from the graph.
   *
   * ```ts
   * graph.detachTreeStructure('Inheritance');
   * graph.getRoots('Inheritance'); // Error!
   * ```
   * @group TreeMethods
   */
  public detachTreeStructure(treeKey?: string): void {
    this.checkTreeExistence(treeKey);
    this.treeIndices.delete(treeKey);
    this.batch(() => {
      this.changes.push({
        type: 'TreeStructureDetached',
        treeKey,
      });
    });
  }

  /**
   * Traverse the given tree data, add each node into the graph, then attach the tree structure.
   *
   * ```ts
   * graph.addTree({
   *   id: 1,
   *   children: [
   *     { id: 2 },
   *     { id: 3 },
   *   ],
   * }, 'Inheritance');
   * graph.getRoots('Inheritance'); // [1]
   * graph.getChildren(1, 'Inheritance'); // [2, 3]
   * graph.getAllNodes(); // [1, 2, 3]
   * graph.getAllEdges(); // []
   * ```
   * @group TreeMethods
   */
  public addTree(tree: TreeData<N> | TreeData<N>[], treeKey?: string): void {
    this.batch(() => {
      this.attachTreeStructure(treeKey);

      // Add Nodes
      const nodes: TreeData<N>[] = [];
      const stack = Array.isArray(tree) ? tree : [tree];
      while (stack.length) {
        const node = stack.shift()!;
        nodes.push(node);
        if (node.children) {
          stack.push(...node.children);
        }
      }
      this.addNodes(nodes);

      // Set parent for each child node.
      nodes.forEach((parent) => {
        parent.children?.forEach((child) => {
          this.setParent(child.id, parent.id, treeKey);
        });
      });
    });
  }

  /**
   * Get the root nodes of an attached tree structure.
   *
   * Consider a graph with the following tree structure attached:
   * ```
   * Tree structure:
   *    O     3
   *   / \    |
   *  1   2   4
   * ```
   * `graph.getRoots()` takes all nodes without a parent, therefore [0, 3] was returned.
   *
   * Newly added nodes are also unparented. So they are counted as roots.
   * ```ts
   * graph.addNode({ id: 5 });
   * graph.getRoots(); // [0, 3, 5]
   * ```
   *
   * Here is how the tree structure looks like:
   * ```
   * Tree structure:
   *    O     3  5
   *   / \    |
   *  1   2   4
   * ```
   *
   * By setting a parent, a root node no more be a root.
   * ```ts
   * graph.setParent(5, 2);
   * graph.getRoots(); // [0, 3]
   * ```
   *
   * The tree structure now becomes:
   * ```
   * Tree structure:
   *    O     3
   *   / \    |
   *  1   2   4
   *      |
   *      5
   * ```
   *
   * Removing a node forces its children to be unparented, or roots.
   * ```ts
   * graph.removeNode(0);
   * graph.getRoots(); // [1, 2, 3]
   * ```
   *
   * You might draw the the structure as follow:
   * ```
   * Tree structure:
   *  1   2  3
   *      |  |
   *      5  4
   * ```
   * @group TreeMethods
   */
  public getRoots(treeKey?: string): Node<N>[] {
    this.checkTreeExistence(treeKey);
    return this.getAllNodes().filter(
      (node) => !this.getParent(node.id, treeKey),
    );
  }

  /**
   * Given a node ID and an optional tree key, get the children of the node in the specified tree structure.
   * @group TreeMethods
   */
  public getChildren(id: ID, treeKey?: string): Node<N>[] {
    this.checkNodeExistence(id);
    this.checkTreeExistence(treeKey);
    const tree = this.treeIndices.get(treeKey)!;
    const children = tree.childrenMap.get(id);
    return Array.from(children || []);
  }

  /**
   * Given a node ID and an optional tree key, get the parent of the node in the specified tree structure.
   * If the given node is one of the tree roots, this returns null.
   * @group TreeMethods
   */
  public getParent(id: ID, treeKey?: string): Node<N> | null {
    this.checkNodeExistence(id);
    this.checkTreeExistence(treeKey);
    const tree = this.treeIndices.get(treeKey)!;
    return tree.parentMap.get(id) || null;
  }

  /**
   * Set node parent. If this operation causes a circle, it fails with an error.
   * @param id - ID of the child node.
   * @param parent - ID of the parent node.
   * @param treeKey - Which tree structure the relation is applied to.
   * @group TreeMethods
   */
  public setParent(id: ID, parent: ID, treeKey?: string) {
    this.checkTreeExistence(treeKey);

    const tree = this.treeIndices.get(treeKey)!;
    const node = this.getNode(id);
    const oldParent = tree.parentMap.get(id);
    const newParent = this.getNode(parent);

    // Set parent
    tree.parentMap.set(id, newParent);

    // Set children
    if (oldParent) {
      tree.childrenMap.get(oldParent.id)?.delete(node);
    }
    let children = tree.childrenMap.get(newParent.id);
    if (!children) {
      children = new Set();
      tree.childrenMap.set(newParent.id, children);
    }
    children.add(node);

    this.batch(() => {
      this.changes.push({
        type: 'TreeStructureChanged',
        treeKey,
        nodeId: id,
        oldParentId: oldParent?.id,
        newParentId: newParent.id,
      });
    });
  }

  // ================= Graph =================
  /**
   * Get all nodes in the graph as an array.
   */
  public getAllNodes(): Node<N>[] {
    return Array.from(this.nodeMap.values());
  }

  /**
   * Get all edges in the graph as an array.
   */
  public getAllEdges(): Edge<E>[] {
    return Array.from(this.edgeMap.values());
  }

  public bfs(id: ID, fn: (node: Node<N>) => void): void {
    throw new Error('To be implemented');
  }

  public dfs(id: ID, fn: (node: Node<N>) => void): void {
    throw new Error('To be implemented');
  }

  public clone(): Graph<N, E> {
    // FIXME: Should deep clone nodes, edges, and tree structures.
    const newGraph = new Graph<N, E>({
      nodes: this.getAllNodes(),
      edges: this.getAllEdges(),
      onChanged: this.onChanged,
    });
    newGraph.treeIndices = new Map();
    newGraph.treeIndices = this.treeIndices;
    return newGraph;
  }

  public toJSON(): string {
    return JSON.stringify({
      nodes: this.getAllNodes(),
      edges: this.getAllEdges(),
      // FIXME: And tree structures?
    });
  }
}

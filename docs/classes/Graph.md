[@antv/graphlib](../README.md) / [Exports](../modules.md) / Graph

# Class: Graph<N, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`PlainObject`](../modules.md#plainobject) |
| `E` | extends [`PlainObject`](../modules.md#plainobject) |

## Hierarchy

- `default`

  ↳ **`Graph`**

## Table of contents

### Constructors

- [constructor](Graph.md#constructor)

### Properties

- [batchCount](Graph.md#batchcount)
- [bothEdgesMap](Graph.md#bothedgesmap)
- [changes](Graph.md#changes)
- [edgeMap](Graph.md#edgemap)
- [inEdgesMap](Graph.md#inedgesmap)
- [nodeMap](Graph.md#nodemap)
- [onChanged](Graph.md#onchanged)
- [outEdgesMap](Graph.md#outedgesmap)
- [treeIndices](Graph.md#treeindices)

### EdgeMethods

- [addEdge](Graph.md#addedge)
- [addEdges](Graph.md#addedges)
- [getEdge](Graph.md#getedge)
- [getEdgeDetail](Graph.md#getedgedetail)
- [mergeEdgeData](Graph.md#mergeedgedata)
- [removeEdge](Graph.md#removeedge)
- [removeEdges](Graph.md#removeedges)
- [updateEdgeData](Graph.md#updateedgedata)
- [updateEdgeSource](Graph.md#updateedgesource)
- [updateEdgeTarget](Graph.md#updateedgetarget)

### NodeMethods

- [addNode](Graph.md#addnode)
- [addNodes](Graph.md#addnodes)
- [areNeighbors](Graph.md#areneighbors)
- [getDegree](Graph.md#getdegree)
- [getNeighbors](Graph.md#getneighbors)
- [getNode](Graph.md#getnode)
- [getRelatedEdges](Graph.md#getrelatededges)
- [hasEdge](Graph.md#hasedge)
- [hasNode](Graph.md#hasnode)
- [removeNode](Graph.md#removenode)
- [removeNodes](Graph.md#removenodes)
- [updateNodeData](Graph.md#updatenodedata)

### TreeMethods

- [addTree](Graph.md#addtree)
- [attachTreeStructure](Graph.md#attachtreestructure)
- [detachTreeStructure](Graph.md#detachtreestructure)
- [getChildren](Graph.md#getchildren)
- [getParent](Graph.md#getparent)
- [getRoots](Graph.md#getroots)
- [setParent](Graph.md#setparent)

### Methods

- [batch](Graph.md#batch)
- [bfs](Graph.md#bfs)
- [bfsTree](Graph.md#bfstree)
- [checkEdgeExistence](Graph.md#checkedgeexistence)
- [checkNodeExistence](Graph.md#checknodeexistence)
- [checkTreeExistence](Graph.md#checktreeexistence)
- [clone](Graph.md#clone)
- [commit](Graph.md#commit)
- [createView](Graph.md#createview)
- [dfs](Graph.md#dfs)
- [dfsTree](Graph.md#dfstree)
- [doAddEdge](Graph.md#doaddedge)
- [doAddNode](Graph.md#doaddnode)
- [doRemoveEdge](Graph.md#doremoveedge)
- [doRemoveNode](Graph.md#doremovenode)
- [emit](Graph.md#emit)
- [getAllEdges](Graph.md#getalledges)
- [getAllNodes](Graph.md#getallnodes)
- [getAncestors](Graph.md#getancestors)
- [getEvents](Graph.md#getevents)
- [getPredecessors](Graph.md#getpredecessors)
- [getSuccessors](Graph.md#getsuccessors)
- [hasTreeStructure](Graph.md#hastreestructure)
- [mergeNodeData](Graph.md#mergenodedata)
- [off](Graph.md#off)
- [on](Graph.md#on)
- [once](Graph.md#once)
- [reduceChanges](Graph.md#reducechanges)
- [toJSON](Graph.md#tojson)
- [updateEdgeDataProperty](Graph.md#updateedgedataproperty)
- [updateNodeDataProperty](Graph.md#updatenodedataproperty)

## Constructors

### constructor

• **new Graph**<`N`, `E`\>(`options?`)

Create a new Graph instance.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`PlainObject`](../modules.md#plainobject) |
| `E` | extends [`PlainObject`](../modules.md#plainobject) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`GraphOptions`](../interfaces/GraphOptions.md)<`N`, `E`\> | The options to initialize a graph. See [GraphOptions](../interfaces/GraphOptions.md). ```ts const graph = new Graph({ // Optional, initial nodes. nodes: [ // Each node has a unique ID. { id: 'A', foo: 1 }, { id: 'B', foo: 1 }, ], // Optional, initial edges. edges: [ { id: 'C', source: 'B', target: 'B', weight: 1 }, ], // Optional, called with a GraphChangedEvent. onChanged: (event) => { console.log(event); } }); ``` |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/graph.ts:65](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L65)

## Properties

### batchCount

• `Private` **batchCount**: `number` = `0`

#### Defined in

[src/graph.ts:31](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L31)

___

### bothEdgesMap

• `Private` **bothEdgesMap**: `Map`<[`ID`](../modules.md#id), `Set`<[`Edge`](../interfaces/Edge.md)<`E`\>\>\>

#### Defined in

[src/graph.ts:27](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L27)

___

### changes

• `Private` **changes**: [`GraphChange`](../modules.md#graphchange)<`N`, `E`\>[] = `[]`

#### Defined in

[src/graph.ts:30](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L30)

___

### edgeMap

• `Private` **edgeMap**: `Map`<[`ID`](../modules.md#id), [`Edge`](../interfaces/Edge.md)<`E`\>\>

#### Defined in

[src/graph.ts:24](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L24)

___

### inEdgesMap

• `Private` **inEdgesMap**: `Map`<[`ID`](../modules.md#id), `Set`<[`Edge`](../interfaces/Edge.md)<`E`\>\>\>

#### Defined in

[src/graph.ts:25](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L25)

___

### nodeMap

• `Private` **nodeMap**: `Map`<[`ID`](../modules.md#id), [`Node`](../interfaces/Node.md)<`N`\>\>

#### Defined in

[src/graph.ts:23](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L23)

___

### onChanged

• **onChanged**: (`event`: [`GraphChangedEvent`](../interfaces/GraphChangedEvent.md)<`N`, `E`\>) => `void`

#### Type declaration

▸ (`event`): `void`

This function is called with a [GraphChangedEvent](../interfaces/GraphChangedEvent.md) each time a graph change happened.

`event.changes` contains all the graph changes in order since last `onChanged`.

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`GraphChangedEvent`](../interfaces/GraphChangedEvent.md)<`N`, `E`\> |

##### Returns

`void`

#### Defined in

[src/graph.ts:38](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L38)

___

### outEdgesMap

• `Private` **outEdgesMap**: `Map`<[`ID`](../modules.md#id), `Set`<[`Edge`](../interfaces/Edge.md)<`E`\>\>\>

#### Defined in

[src/graph.ts:26](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L26)

___

### treeIndices

• `Private` **treeIndices**: [`TreeIndices`](../modules.md#treeindices)<[`Node`](../interfaces/Node.md)<`N`\>\>

#### Defined in

[src/graph.ts:28](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L28)

## EdgeMethods

### addEdge

▸ **addEdge**(`edge`): `void`

Add a single edge pointing from `source` to `target` into the graph.

```ts
graph.addNode({ id: 'NodeA' });
graph.addNode({ id: 'NodeB' });
graph.addEdge({ id: 'EdgeA', source: 'NodeA', target: 'NodeB' });
```

If `source` or `target` were not found in the current graph, it throws an Error.

#### Parameters

| Name | Type |
| :------ | :------ |
| `edge` | [`Edge`](../interfaces/Edge.md)<`E`\> |

#### Returns

`void`

#### Defined in

[src/graph.ts:600](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L600)

___

### addEdges

▸ **addEdges**(`edges`): `void`

Add all edges of the given iterable(an array, a set, etc.) into the graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `edges` | `Iterable`<[`Edge`](../interfaces/Edge.md)<`E`\>\> |

#### Returns

`void`

#### Defined in

[src/graph.ts:580](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L580)

___

### getEdge

▸ **getEdge**(`id`): [`Edge`](../interfaces/Edge.md)<`E`\>

Get the edge data with given ID.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

[`Edge`](../interfaces/Edge.md)<`E`\>

#### Defined in

[src/graph.ts:534](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L534)

___

### getEdgeDetail

▸ **getEdgeDetail**(`id`): `Object`

Get the edge, the source node, and the target node by an edge ID.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `edge` | [`Edge`](../interfaces/Edge.md)<`E`\> |
| `source` | [`Node`](../interfaces/Node.md)<`N`\> |
| `target` | [`Node`](../interfaces/Node.md)<`N`\> |

#### Defined in

[src/graph.ts:543](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L543)

___

### mergeEdgeData

▸ **mergeEdgeData**(`id`, `patch`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `patch` | `Partial`<`E`\> |

#### Returns

`void`

#### Defined in

[src/graph.ts:774](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L774)

___

### removeEdge

▸ **removeEdge**(`id`): `void`

Remove a single edge of the given id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[src/graph.ts:632](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L632)

___

### removeEdges

▸ **removeEdges**(`idList`): `void`

Remove edges whose id was included in the given id list.

#### Parameters

| Name | Type |
| :------ | :------ |
| `idList` | [`ID`](../modules.md#id)[] |

#### Returns

`void`

#### Defined in

[src/graph.ts:622](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L622)

___

### updateEdgeData

▸ **updateEdgeData**(`id`, `data`): `void`

Update edge data. This will replace the whole data object.

```ts
updateEdgeData(id, data); // Works like `edge.data = data`
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `data` | `E` |

#### Returns

`void`

#### Defined in

[src/graph.ts:715](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L715)

▸ **updateEdgeData**<`P`\>(`id`, `propertyName`, `value`): `void`

Update a single property on the edge data.

To update multiple properties, you could [batch](Graph.md#batch) several updates or use [mergeNodeData](Graph.md#mergeedgedata).

```ts
updateEdgeData(id, key, value); // Works like `edge.data[key] = value`
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `propertyName` | `P` |
| `value` | `E`[`P`] |

#### Returns

`void`

#### Defined in

[src/graph.ts:727](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L727)

▸ **updateEdgeData**(`id`, `update`): `void`

Update edge data by a update function.

```ts
updateEdgeData(id, oldData => newData);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `update` | (`data`: `E`) => `E` |

#### Returns

`void`

#### Defined in

[src/graph.ts:740](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L740)

___

### updateEdgeSource

▸ **updateEdgeSource**(`id`, `source`): `void`

Change the source of an edge. The source must be found in current graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `source` | [`ID`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[src/graph.ts:640](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L640)

___

### updateEdgeTarget

▸ **updateEdgeTarget**(`id`, `target`): `void`

Change the target of an edge. The target must be found in current graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `target` | [`ID`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[src/graph.ts:665](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L665)

## NodeMethods

### addNode

▸ **addNode**(`node`): `void`

Add a single node into the graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](../interfaces/Node.md)<`N`\> |

#### Returns

`void`

#### Defined in

[src/graph.ts:380](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L380)

___

### addNodes

▸ **addNodes**(`nodes`): `void`

Add all nodes of the given array, or iterable, into the graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `Iterable`<[`Node`](../interfaces/Node.md)<`N`\>\> |

#### Returns

`void`

#### Defined in

[src/graph.ts:368](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L368)

___

### areNeighbors

▸ **areNeighbors**(`firstNodeId`, `secondNodeId`): `boolean`

Tell if two nodes are neighbors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `firstNodeId` | [`ID`](../modules.md#id) |
| `secondNodeId` | [`ID`](../modules.md#id) |

#### Returns

`boolean`

#### Defined in

[src/graph.ts:274](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L274)

___

### getDegree

▸ **getDegree**(`id`, `direction?`): `number`

Get the degree of the given node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `direction?` | ``"in"`` \| ``"out"`` \| ``"both"`` |

#### Returns

`number`

#### Defined in

[src/graph.ts:317](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L317)

___

### getNeighbors

▸ **getNeighbors**(`id`): [`Node`](../interfaces/Node.md)<`N`\>[]

Given a node ID, find its neighbors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules.md#id) | ID of the node |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graph.ts:344](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L344)

___

### getNode

▸ **getNode**(`id`): [`Node`](../interfaces/Node.md)<`N`\>

Get the node data with given ID.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>

#### Defined in

[src/graph.ts:284](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L284)

___

### getRelatedEdges

▸ **getRelatedEdges**(`id`, `direction?`): [`Edge`](../interfaces/Edge.md)<`E`\>[]

Given a node ID, find all edges of the node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules.md#id) | ID of the node |
| `direction?` | ``"in"`` \| ``"out"`` \| ``"both"`` | Edge direction, defaults to 'both'. |

#### Returns

[`Edge`](../interfaces/Edge.md)<`E`\>[]

#### Defined in

[src/graph.ts:298](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L298)

___

### hasEdge

▸ **hasEdge**(`id`): `boolean`

Check if an edge exists in the graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`boolean`

#### Defined in

[src/graph.ts:526](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L526)

___

### hasNode

▸ **hasNode**(`id`): `boolean`

Check if a node exists in the graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`boolean`

#### Defined in

[src/graph.ts:266](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L266)

___

### removeNode

▸ **removeNode**(`id`): `void`

Remove a single node and its attached edges from the graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[src/graph.ts:413](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L413)

___

### removeNodes

▸ **removeNodes**(`idList`): `void`

Remove nodes and their attached edges from the graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `idList` | [`ID`](../modules.md#id)[] |

#### Returns

`void`

#### Defined in

[src/graph.ts:403](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L403)

___

### updateNodeData

▸ **updateNodeData**(`id`, `data`): `void`

Update node data. This will replace the whole data object.

```ts
updateNodeData(id, data); // Works like `node.data = data`
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `data` | `N` |

#### Returns

`void`

#### Defined in

[src/graph.ts:459](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L459)

▸ **updateNodeData**<`P`\>(`id`, `propertyName`, `value`): `void`

Update a single property on the node data.

To update multiple properties, you could [batch](Graph.md#batch) several updates or use [mergeNodeData](Graph.md#mergenodedata).

```ts
updateNodeData(id, key, value); // Works like `node.data[key] = value`
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `propertyName` | `P` |
| `value` | `N`[`P`] |

#### Returns

`void`

#### Defined in

[src/graph.ts:471](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L471)

▸ **updateNodeData**(`id`, `update`): `void`

Update node data by a update function.

```ts
updateNodeData(id, oldData => newData);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `update` | (`data`: `N`) => `N` |

#### Returns

`void`

#### Defined in

[src/graph.ts:484](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L484)

## TreeMethods

### addTree

▸ **addTree**(`tree`, `treeKey?`): `void`

Traverse the given tree data, add each node into the graph, then attach the tree structure.

```ts
graph.addTree({
  id: 1,
  children: [
    { id: 2 },
    { id: 3 },
  ],
}, 'Inheritance');
graph.getRoots('Inheritance'); // [1]
graph.getChildren(1, 'Inheritance'); // [2, 3]
graph.getAllNodes(); // [1, 2, 3]
graph.getAllEdges(); // []
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `tree` | [`TreeData`](../interfaces/TreeData.md)<`N`\> \| [`TreeData`](../interfaces/TreeData.md)<`N`\>[] |
| `treeKey?` | `string` |

#### Returns

`void`

#### Defined in

[src/graph.ts:864](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L864)

___

### attachTreeStructure

▸ **attachTreeStructure**(`treeKey?`): `void`

Attach a new tree structure representing the hierarchy of all nodes in the graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeKey?` | `string` | A unique key of the tree structure. You can attach multiple tree structures with different keys. ```ts const graph = new Graph({ nodes: [{ id: 1 }, { id: 2 }, { id: 3 }], }); graph.attachTreeStructure('Inheritance'); graph.setParent(2, 1, 'Inheritance'); graph.setParent(3, 1, 'Inheritance'); graph.getRoots('Inheritance'); // [1] graph.getChildren(1, 'Inheritance'); // [2,3] ``` |

#### Returns

`void`

#### Defined in

[src/graph.ts:809](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L809)

___

### detachTreeStructure

▸ **detachTreeStructure**(`treeKey?`): `void`

Detach the tree structure of the given tree key from the graph.

```ts
graph.detachTreeStructure('Inheritance');
graph.getRoots('Inheritance'); // Error!
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `treeKey?` | `string` |

#### Returns

`void`

#### Defined in

[src/graph.ts:835](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L835)

___

### getChildren

▸ **getChildren**(`id`, `treeKey?`): [`Node`](../interfaces/Node.md)<`N`\>[]

Given a node ID and an optional tree key, get the children of the node in the specified tree structure.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `treeKey?` | `string` |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graph.ts:957](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L957)

___

### getParent

▸ **getParent**(`id`, `treeKey?`): ``null`` \| [`Node`](../interfaces/Node.md)<`N`\>

Given a node ID and an optional tree key, get the parent of the node in the specified tree structure.
If the given node is one of the tree roots, this returns null.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `treeKey?` | `string` |

#### Returns

``null`` \| [`Node`](../interfaces/Node.md)<`N`\>

#### Defined in

[src/graph.ts:970](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L970)

___

### getRoots

▸ **getRoots**(`treeKey?`): [`Node`](../interfaces/Node.md)<`N`\>[]

Get the root nodes of an attached tree structure.

Consider a graph with the following tree structure attached:
```
Tree structure:
   O     3
  / \    |
 1   2   4
```
`graph.getRoots()` takes all nodes without a parent, therefore [0, 3] was returned.

Newly added nodes are also unparented. So they are counted as roots.
```ts
graph.addNode({ id: 5 });
graph.getRoots(); // [0, 3, 5]
```

Here is how the tree structure looks like:
```
Tree structure:
   O     3  5
  / \    |
 1   2   4
```

By setting a parent, a root node no more be a root.
```ts
graph.setParent(5, 2);
graph.getRoots(); // [0, 3]
```

The tree structure now becomes:
```
Tree structure:
   O     3
  / \    |
 1   2   4
     |
     5
```

Removing a node forces its children to be unparented, or roots.
```ts
graph.removeNode(0);
graph.getRoots(); // [1, 2, 3]
```

You might draw the the structure as follow:
```
Tree structure:
 1   2  3
     |  |
     5  4
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `treeKey?` | `string` |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graph.ts:946](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L946)

___

### setParent

▸ **setParent**(`id`, `parent`, `treeKey?`): `void`

Set node parent. If this operation causes a circle, it fails with an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules.md#id) | ID of the child node. |
| `parent` | [`ID`](../modules.md#id) | ID of the parent node. |
| `treeKey?` | `string` | Which tree structure the relation is applied to. |

#### Returns

`void`

#### Defined in

[src/graph.ts:999](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L999)

## Methods

### batch

▸ **batch**(`fn`): `void`

Batch several graph changes into one.

Make several changes, but dispatch only one ChangedEvent at the end of batch:
```ts
graph.batch(() => {
  graph.addNodes([]);
  graph.addEdges([]);
});
```

Batches can be nested. Only the outermost batch will dispatch a ChangedEvent:
```ts
graph.batch(() => {
  graph.addNodes([]);
  graph.batch(() => {
    graph.addEdges([]);
  });
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => `void` |

#### Returns

`void`

#### Defined in

[src/graph.ts:95](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L95)

___

### bfs

▸ **bfs**(`id`, `fn`, `direction?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules.md#id) | `undefined` |
| `fn` | (`node`: [`Node`](../interfaces/Node.md)<`N`\>) => `boolean` \| `void` | `undefined` |
| `direction` | ``"in"`` \| ``"out"`` \| ``"both"`` | `'out'` |

#### Returns

`boolean`

#### Defined in

[src/graph.ts:1057](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L1057)

___

### bfsTree

▸ **bfsTree**(`id`, `fn`, `treeKey?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `fn` | (`node`: [`Node`](../interfaces/Node.md)<`N`\>) => `boolean` \| `void` |
| `treeKey?` | `string` |

#### Returns

`boolean`

#### Defined in

[src/graph.ts:1037](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L1037)

___

### checkEdgeExistence

▸ `Private` **checkEdgeExistence**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[src/graph.ts:516](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L516)

___

### checkNodeExistence

▸ `Private` **checkNodeExistence**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[src/graph.ts:258](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L258)

___

### checkTreeExistence

▸ `Private` **checkTreeExistence**(`treeKey`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `treeKey` | `undefined` \| `string` |

#### Returns

`void`

#### Defined in

[src/graph.ts:783](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L783)

___

### clone

▸ **clone**(): [`Graph`](Graph.md)<`N`, `E`\>

#### Returns

[`Graph`](Graph.md)<`N`, `E`\>

#### Defined in

[src/graph.ts:1083](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L1083)

___

### commit

▸ `Private` **commit**(): `void`

Reset changes and dispatch a ChangedEvent.

#### Returns

`void`

#### Defined in

[src/graph.ts:107](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L107)

___

### createView

▸ **createView**(`options`): [`GraphView`](GraphView.md)<`N`, `E`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Omit`<[`GraphViewOptions`](../interfaces/GraphViewOptions.md)<`N`, `E`\>, ``"graph"``\> |

#### Returns

[`GraphView`](GraphView.md)<`N`, `E`\>

#### Defined in

[src/graph.ts:1132](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L1132)

___

### dfs

▸ **dfs**(`id`, `fn`, `direction?`): `boolean`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules.md#id) | `undefined` |
| `fn` | (`node`: [`Node`](../interfaces/Node.md)<`N`\>) => `boolean` \| `void` | `undefined` |
| `direction` | ``"in"`` \| ``"out"`` \| ``"both"`` | `'out'` |

#### Returns

`boolean`

#### Defined in

[src/graph.ts:1070](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L1070)

___

### dfsTree

▸ **dfsTree**(`id`, `fn`, `treeKey?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `fn` | (`node`: [`Node`](../interfaces/Node.md)<`N`\>) => `boolean` \| `void` |
| `treeKey?` | `string` |

#### Returns

`boolean`

#### Defined in

[src/graph.ts:1032](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L1032)

___

### doAddEdge

▸ `Private` **doAddEdge**(`edge`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `edge` | [`Edge`](../interfaces/Edge.md)<`E`\> |

#### Returns

`void`

#### Defined in

[src/graph.ts:556](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L556)

___

### doAddNode

▸ `Private` **doAddNode**(`node`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](../interfaces/Node.md)<`N`\> |

#### Returns

`void`

#### Defined in

[src/graph.ts:350](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L350)

___

### doRemoveEdge

▸ `Private` **doRemoveEdge**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[src/graph.ts:604](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L604)

___

### doRemoveNode

▸ `Private` **doRemoveNode**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`void`

#### Defined in

[src/graph.ts:384](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L384)

___

### emit

▸ **emit**(`evt`, `...args`): `void`

触发一个事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `...args` | `any`[] |

#### Returns

`void`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:25

___

### getAllEdges

▸ **getAllEdges**(): [`Edge`](../interfaces/Edge.md)<`E`\>[]

Get all edges in the graph as an array.

#### Returns

[`Edge`](../interfaces/Edge.md)<`E`\>[]

#### Defined in

[src/graph.ts:1053](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L1053)

___

### getAllNodes

▸ **getAllNodes**(): [`Node`](../interfaces/Node.md)<`N`\>[]

Get all nodes in the graph as an array.

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graph.ts:1046](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L1046)

___

### getAncestors

▸ **getAncestors**(`id`, `treeKey?`): [`Node`](../interfaces/Node.md)<`N`\>[]

Returns an array of all the ancestor nodes, staring from the parent to the root.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `treeKey?` | `string` |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graph.ts:980](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L980)

___

### getEvents

▸ **getEvents**(): `Record`<`string`, `EventType`[]\>

#### Returns

`Record`<`string`, `EventType`[]\>

#### Inherited from

EventEmitter.getEvents

#### Defined in

node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:32

___

### getPredecessors

▸ **getPredecessors**(`id`): [`Node`](../interfaces/Node.md)<`N`\>[]

Get all predecessors of the given node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graph.ts:333](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L333)

___

### getSuccessors

▸ **getSuccessors**(`id`): [`Node`](../interfaces/Node.md)<`N`\>[]

Get all successors of the given node.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graph.ts:324](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L324)

___

### hasTreeStructure

▸ **hasTreeStructure**(`treeKey`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `treeKey` | `undefined` \| `string` |

#### Returns

`boolean`

#### Defined in

[src/graph.ts:789](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L789)

___

### mergeNodeData

▸ **mergeNodeData**(`id`, `patch`): `void`

Like Object.assign, merge all properties of `path` to the node data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules.md#id) | Node ID. |
| `patch` | `Partial`<`N`\> | A data object to merge. |

#### Returns

`void`

#### Defined in

[src/graph.ts:442](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L442)

___

### off

▸ **off**(`evt?`, `callback?`): [`Graph`](Graph.md)<`N`, `E`\>

取消监听一个事件，或者一个channel

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt?` | `string` |
| `callback?` | `Function` |

#### Returns

[`Graph`](Graph.md)<`N`, `E`\>

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:31

___

### on

▸ **on**(`evt`, `callback`, `once?`): [`Graph`](Graph.md)<`N`, `E`\>

监听一个事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `callback` | `Function` |
| `once?` | `boolean` |

#### Returns

[`Graph`](Graph.md)<`N`, `E`\>

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:13

___

### once

▸ **once**(`evt`, `callback`): [`Graph`](Graph.md)<`N`, `E`\>

监听一个事件一次

#### Parameters

| Name | Type |
| :------ | :------ |
| `evt` | `string` |
| `callback` | `Function` |

#### Returns

[`Graph`](Graph.md)<`N`, `E`\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/_@antv_event-emitter@0.1.3@@antv/event-emitter/lib/index.d.ts:19

___

### reduceChanges

▸ **reduceChanges**(`changes`): [`GraphChange`](../modules.md#graphchange)<`N`, `E`\>[]

Reduce the number of ordered graph changes by dropping or merging unnecessary changes.

For example, if we update a node and remove it in a batch:

```ts
graph.batch(() => {
  graph.updateNodeData('A', 'foo', 2);
  graph.removeNode('A');
});
```

We get 2 atomic graph changes like

```ts
[
  { type: 'NodeDataUpdated', id: 'A', propertyName: 'foo', oldValue: 1, newValue: 2 },
  { type: 'NodeRemoved', value: { id: 'A', data: { foo: 2 } },
]
```

Since node 'A' has been removed, we actually have no need to handle with NodeDataUpdated change.

`reduceChanges()` here helps us remove such changes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | [`GraphChange`](../modules.md#graphchange)<`N`, `E`\>[] |

#### Returns

[`GraphChange`](../modules.md#graphchange)<`N`, `E`\>[]

#### Defined in

[src/graph.ts:143](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L143)

___

### toJSON

▸ **toJSON**(): `string`

#### Returns

`string`

#### Defined in

[src/graph.ts:1124](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L1124)

___

### updateEdgeDataProperty

▸ `Private` **updateEdgeDataProperty**<`P`\>(`id`, `propertyName`, `value`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `propertyName` | `P` |
| `value` | `E`[`P`] |

#### Returns

`void`

#### Defined in

[src/graph.ts:686](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L686)

___

### updateNodeDataProperty

▸ `Private` **updateNodeDataProperty**<`P`\>(`id`, `propertyName`, `value`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `propertyName` | `P` |
| `value` | `N`[`P`] |

#### Returns

`void`

#### Defined in

[src/graph.ts:417](https://github.com/antvis/graphlib/blob/07dc2de/src/graph.ts#L417)

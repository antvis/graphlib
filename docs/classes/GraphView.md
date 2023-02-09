[@antv/graphlib](../README.md) / [Exports](../modules.md) / GraphView

# Class: GraphView<N, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`PlainObject`](../modules.md#plainobject) |
| `E` | extends [`PlainObject`](../modules.md#plainobject) |

## Table of contents

### Constructors

- [constructor](GraphView.md#constructor)

### Properties

- [allEdgesMap](GraphView.md#alledgesmap)
- [allNodesMap](GraphView.md#allnodesmap)
- [bothEdgesMap](GraphView.md#bothedgesmap)
- [cacheEnabled](GraphView.md#cacheenabled)
- [edgeFilter](GraphView.md#edgefilter)
- [graph](GraphView.md#graph)
- [inEdgesMap](GraphView.md#inedgesmap)
- [nodeFilter](GraphView.md#nodefilter)
- [outEdgesMap](GraphView.md#outedgesmap)

### Methods

- [areNeighbors](GraphView.md#areneighbors)
- [bfs](GraphView.md#bfs)
- [checkNodeExistence](GraphView.md#checknodeexistence)
- [clearCache](GraphView.md#clearcache)
- [dfs](GraphView.md#dfs)
- [getAllEdges](GraphView.md#getalledges)
- [getAllNodes](GraphView.md#getallnodes)
- [getChildren](GraphView.md#getchildren)
- [getDegree](GraphView.md#getdegree)
- [getEdge](GraphView.md#getedge)
- [getEdgeDetail](GraphView.md#getedgedetail)
- [getNeighbors](GraphView.md#getneighbors)
- [getNode](GraphView.md#getnode)
- [getParent](GraphView.md#getparent)
- [getPredecessors](GraphView.md#getpredecessors)
- [getRelatedEdges](GraphView.md#getrelatededges)
- [getRoots](GraphView.md#getroots)
- [getSuccessors](GraphView.md#getsuccessors)
- [handleGraphChanged](GraphView.md#handlegraphchanged)
- [hasEdge](GraphView.md#hasedge)
- [hasNode](GraphView.md#hasnode)
- [hasTreeStructure](GraphView.md#hastreestructure)
- [refreshCache](GraphView.md#refreshcache)
- [startAutoCache](GraphView.md#startautocache)
- [stopAutoCache](GraphView.md#stopautocache)
- [updateCache](GraphView.md#updatecache)

## Constructors

### constructor

• **new GraphView**<`N`, `E`\>(`options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`PlainObject`](../modules.md#plainobject) |
| `E` | extends [`PlainObject`](../modules.md#plainobject) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`GraphViewOptions`](../interfaces/GraphViewOptions.md)<`N`, `E`\> |

#### Defined in

[src/graphView.ts:27](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L27)

## Properties

### allEdgesMap

• `Private` **allEdgesMap**: `Map`<[`ID`](../modules.md#id), [`Edge`](../interfaces/Edge.md)<`E`\>\>

#### Defined in

[src/graphView.ts:25](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L25)

___

### allNodesMap

• `Private` **allNodesMap**: `Map`<[`ID`](../modules.md#id), [`Node`](../interfaces/Node.md)<`N`\>\>

#### Defined in

[src/graphView.ts:24](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L24)

___

### bothEdgesMap

• `Private` **bothEdgesMap**: `Map`<[`ID`](../modules.md#id), [`Edge`](../interfaces/Edge.md)<`E`\>[]\>

#### Defined in

[src/graphView.ts:23](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L23)

___

### cacheEnabled

• **cacheEnabled**: `boolean`

#### Defined in

[src/graphView.ts:20](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L20)

___

### edgeFilter

• `Private` **edgeFilter**: (`edge`: [`Edge`](../interfaces/Edge.md)<`E`\>) => `boolean`

#### Type declaration

▸ (`edge`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `edge` | [`Edge`](../interfaces/Edge.md)<`E`\> |

##### Returns

`boolean`

#### Defined in

[src/graphView.ts:17](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L17)

___

### graph

• `Private` **graph**: [`Graph`](Graph.md)<`N`, `E`\>

#### Defined in

[src/graphView.ts:15](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L15)

___

### inEdgesMap

• `Private` **inEdgesMap**: `Map`<[`ID`](../modules.md#id), [`Edge`](../interfaces/Edge.md)<`E`\>[]\>

#### Defined in

[src/graphView.ts:21](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L21)

___

### nodeFilter

• `Private` **nodeFilter**: (`node`: [`Node`](../interfaces/Node.md)<`N`\>) => `boolean`

#### Type declaration

▸ (`node`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](../interfaces/Node.md)<`N`\> |

##### Returns

`boolean`

#### Defined in

[src/graphView.ts:16](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L16)

___

### outEdgesMap

• `Private` **outEdgesMap**: `Map`<[`ID`](../modules.md#id), [`Edge`](../interfaces/Edge.md)<`E`\>[]\>

#### Defined in

[src/graphView.ts:22](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L22)

## Methods

### areNeighbors

▸ **areNeighbors**(`firstNodeId`, `secondNodeId`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `firstNodeId` | [`ID`](../modules.md#id) |
| `secondNodeId` | [`ID`](../modules.md#id) |

#### Returns

`boolean`

#### Defined in

[src/graphView.ts:191](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L191)

___

### bfs

▸ **bfs**(`id`, `fn`, `direction?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules.md#id) | `undefined` |
| `fn` | (`node`: [`Node`](../interfaces/Node.md)<`N`\>) => `void` | `undefined` |
| `direction` | ``"in"`` \| ``"out"`` \| ``"both"`` | `'out'` |

#### Returns

`void`

#### Defined in

[src/graphView.ts:307](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L307)

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

[src/graphView.ts:181](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L181)

___

### clearCache

▸ **clearCache**(): `void`

Clear all cache data. Therefore `getAllNodes()` will return `[]`.
If you want to disable caching, use `graphView.cacheEnabled = false` instead.

#### Returns

`void`

#### Defined in

[src/graphView.ts:55](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L55)

___

### dfs

▸ **dfs**(`id`, `fn`, `direction?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | [`ID`](../modules.md#id) | `undefined` |
| `fn` | (`node`: [`Node`](../interfaces/Node.md)<`N`\>) => `void` | `undefined` |
| `direction` | ``"in"`` \| ``"out"`` \| ``"both"`` | `'out'` |

#### Returns

`void`

#### Defined in

[src/graphView.ts:320](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L320)

___

### getAllEdges

▸ **getAllEdges**(): [`Edge`](../interfaces/Edge.md)<`E`\>[]

#### Returns

[`Edge`](../interfaces/Edge.md)<`E`\>[]

#### Defined in

[src/graphView.ts:300](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L300)

___

### getAllNodes

▸ **getAllNodes**(): [`Node`](../interfaces/Node.md)<`N`\>[]

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graphView.ts:293](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L293)

___

### getChildren

▸ **getChildren**(`id`, `treeKey?`): [`Node`](../interfaces/Node.md)<`N`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `treeKey?` | `string` |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graphView.ts:280](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L280)

___

### getDegree

▸ **getDegree**(`id`, `direction?`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `direction?` | ``"in"`` \| ``"out"`` \| ``"both"`` |

#### Returns

`number`

#### Defined in

[src/graphView.ts:221](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L221)

___

### getEdge

▸ **getEdge**(`id`): [`Edge`](../interfaces/Edge.md)<`E`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

[`Edge`](../interfaces/Edge.md)<`E`\>

#### Defined in

[src/graphView.ts:250](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L250)

___

### getEdgeDetail

▸ **getEdgeDetail**(`id`): `Object`

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

[src/graphView.ts:258](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L258)

___

### getNeighbors

▸ **getNeighbors**(`id`): [`Node`](../interfaces/Node.md)<`N`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graphView.ts:237](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L237)

___

### getNode

▸ **getNode**(`id`): [`Node`](../interfaces/Node.md)<`N`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>

#### Defined in

[src/graphView.ts:198](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L198)

___

### getParent

▸ **getParent**(`id`, `treeKey?`): ``null`` \| [`Node`](../interfaces/Node.md)<`N`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `treeKey?` | `string` |

#### Returns

``null`` \| [`Node`](../interfaces/Node.md)<`N`\>

#### Defined in

[src/graphView.ts:285](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L285)

___

### getPredecessors

▸ **getPredecessors**(`id`): [`Node`](../interfaces/Node.md)<`N`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graphView.ts:231](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L231)

___

### getRelatedEdges

▸ **getRelatedEdges**(`id`, `direction?`): [`Edge`](../interfaces/Edge.md)<`E`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |
| `direction?` | ``"in"`` \| ``"out"`` \| ``"both"`` |

#### Returns

[`Edge`](../interfaces/Edge.md)<`E`\>[]

#### Defined in

[src/graphView.ts:206](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L206)

___

### getRoots

▸ **getRoots**(`treeKey?`): [`Node`](../interfaces/Node.md)<`N`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `treeKey?` | `string` |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graphView.ts:276](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L276)

___

### getSuccessors

▸ **getSuccessors**(`id`): [`Node`](../interfaces/Node.md)<`N`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

[`Node`](../interfaces/Node.md)<`N`\>[]

#### Defined in

[src/graphView.ts:225](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L225)

___

### handleGraphChanged

▸ `Private` **handleGraphChanged**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`GraphChangedEvent`](../interfaces/GraphChangedEvent.md)<`N`, `E`\> |

#### Returns

`void`

#### Defined in

[src/graphView.ts:134](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L134)

___

### hasEdge

▸ **hasEdge**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`boolean`

#### Defined in

[src/graphView.ts:244](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L244)

___

### hasNode

▸ **hasNode**(`id`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](../modules.md#id) |

#### Returns

`boolean`

#### Defined in

[src/graphView.ts:185](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L185)

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

[src/graphView.ts:272](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L272)

___

### refreshCache

▸ **refreshCache**(): `void`

Fully refresh all cache data to the current graph state.

#### Returns

`void`

#### Defined in

[src/graphView.ts:66](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L66)

___

### startAutoCache

▸ **startAutoCache**(): `void`

#### Returns

`void`

#### Defined in

[src/graphView.ts:125](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L125)

___

### stopAutoCache

▸ **stopAutoCache**(): `void`

#### Returns

`void`

#### Defined in

[src/graphView.ts:130](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L130)

___

### updateCache

▸ **updateCache**(`involvedNodeIds`): `void`

Instead of a fully refreshment, this method partially update the cache data by specifying
involved(added, removed, updated) nodes. It's more efficient when handling small changes
on a large graph.

#### Parameters

| Name | Type |
| :------ | :------ |
| `involvedNodeIds` | `Set`<[`ID`](../modules.md#id)\> \| [`ID`](../modules.md#id)[] |

#### Returns

`void`

#### Defined in

[src/graphView.ts:76](https://github.com/antvis/graphlib/blob/07dc2de/src/graphView.ts#L76)

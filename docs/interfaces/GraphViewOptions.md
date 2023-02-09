[@antv/graphlib](../README.md) / [Exports](../modules.md) / GraphViewOptions

# Interface: GraphViewOptions<N, E\>

Options to create a GraphView

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`PlainObject`](../modules.md#plainobject) |
| `E` | extends [`PlainObject`](../modules.md#plainobject) |

## Table of contents

### Properties

- [cache](GraphViewOptions.md#cache)
- [edgeFilter](GraphViewOptions.md#edgefilter)
- [graph](GraphViewOptions.md#graph)
- [nodeFilter](GraphViewOptions.md#nodefilter)

## Properties

### cache

• `Optional` **cache**: ``"none"`` \| ``"auto"`` \| ``"manual"``

Cache mode of the GraphView. Defaults to 'none'.

- `none`: Use no cache. Filters are applied when reading data. Fast to create but a bit
slow to read data.

- `auto`: Automatically cache data when view created or graph changed. Fast to read
data but takes time to build up cache. You should call `stopAutoCache()` to avoid
unnecessary updates if the GraphView is no longer active.

- `manual` Manage cache manually. `clearCache()` `refreshCache()` `updateCache()`
might be useful.

#### Defined in

[src/types.ts:228](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L228)

___

### edgeFilter

• `Optional` **edgeFilter**: (`edge`: [`Edge`](Edge.md)<`E`\>, `source`: [`Node`](Node.md)<`N`\>, `target`: [`Node`](Node.md)<`N`\>) => `boolean`

#### Type declaration

▸ (`edge`, `source`, `target`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `edge` | [`Edge`](Edge.md)<`E`\> |
| `source` | [`Node`](Node.md)<`N`\> |
| `target` | [`Node`](Node.md)<`N`\> |

##### Returns

`boolean`

#### Defined in

[src/types.ts:214](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L214)

___

### graph

• **graph**: [`Graph`](../classes/Graph.md)<`N`, `E`\>

The original Graph

#### Defined in

[src/types.ts:212](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L212)

___

### nodeFilter

• `Optional` **nodeFilter**: (`node`: [`Node`](Node.md)<`N`\>) => `boolean`

#### Type declaration

▸ (`node`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`Node`](Node.md)<`N`\> |

##### Returns

`boolean`

#### Defined in

[src/types.ts:213](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L213)

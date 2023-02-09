[@antv/graphlib](../README.md) / [Exports](../modules.md) / GraphOptions

# Interface: GraphOptions<N, E\>

Options to create a graph.

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`PlainObject`](../modules.md#plainobject) |
| `E` | extends [`PlainObject`](../modules.md#plainobject) |

## Table of contents

### Properties

- [edges](GraphOptions.md#edges)
- [nodes](GraphOptions.md#nodes)
- [onChanged](GraphOptions.md#onchanged)
- [tree](GraphOptions.md#tree)

## Properties

### edges

• `Optional` **edges**: [`Edge`](Edge.md)<`E`\>[]

An array of edge data representing the initial edges.

Each edge must have a unique ID.

The source and target of each edge must be present in `nodes`.

**`Example`**

```ts
[
  { id: 9, source: 1, target: 2, weight: 10 },
]
```

#### Defined in

[src/types.ts:93](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L93)

___

### nodes

• `Optional` **nodes**: [`Node`](Node.md)<`N`\>[]

An array of node data representing the initial nodes.

Each node must have a unique ID.

**`Example`**

```ts
[
  { id: 1, color: 'red' },
  { id: 2, color: 'blue' },
]
```

#### Defined in

[src/types.ts:79](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L79)

___

### onChanged

• `Optional` **onChanged**: (`event`: [`GraphChangedEvent`](GraphChangedEvent.md)<`N`, `E`\>) => `void`

#### Type declaration

▸ (`event`): `void`

A listener function which will be called with a [GraphChangedEvent](GraphChangedEvent.md) whenever a graph change happened.

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`GraphChangedEvent`](GraphChangedEvent.md)<`N`, `E`\> |

##### Returns

`void`

#### Defined in

[src/types.ts:100](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L100)

___

### tree

• `Optional` **tree**: [`TreeData`](TreeData.md)<`N`\> \| [`TreeData`](TreeData.md)<`N`\>[]

#### Defined in

[src/types.ts:95](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L95)

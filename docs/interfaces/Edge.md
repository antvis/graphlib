[@antv/graphlib](../README.md) / [Exports](../modules.md) / Edge

# Interface: Edge<D\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`PlainObject`](../modules.md#plainobject) |

## Table of contents

### Properties

- [data](Edge.md#data)
- [id](Edge.md#id)
- [source](Edge.md#source)
- [target](Edge.md#target)

## Properties

### data

• **data**: `D`

Edge data should be an object with string key and any value.

#### Defined in

[src/types.ts:43](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L43)

___

### id

• **id**: [`ID`](../modules.md#id)

Every edge in a graph must have a unique ID.

#### Defined in

[src/types.ts:28](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L28)

___

### source

• **source**: [`ID`](../modules.md#id)

The ID of the starting node of the edge.

#### Defined in

[src/types.ts:33](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L33)

___

### target

• **target**: [`ID`](../modules.md#id)

The ID of the ending node of the edge.

#### Defined in

[src/types.ts:38](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L38)

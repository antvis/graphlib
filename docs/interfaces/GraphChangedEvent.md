[@antv/graphlib](../README.md) / [Exports](../modules.md) / GraphChangedEvent

# Interface: GraphChangedEvent<N, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`PlainObject`](../modules.md#plainobject) |
| `E` | extends [`PlainObject`](../modules.md#plainobject) |

## Table of contents

### Properties

- [changes](GraphChangedEvent.md#changes)
- [graph](GraphChangedEvent.md#graph)

## Properties

### changes

• **changes**: [`GraphChange`](../modules.md#graphchange)<`N`, `E`\>[]

Atomic changes that have occurred in the graph since the last time `graph.onChanged` was triggered.

`changes` are ordered by the time they occurred.

Each change object is a smallest unit of change that can be made to a graph, including addition, removal, or modification of nodes or edges.

You can call [reduceChanges](../classes/Graph.md#reducechanges) to reduce them.

#### Defined in

[src/types.ts:129](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L129)

___

### graph

• **graph**: [`Graph`](../classes/Graph.md)<`N`, `E`\>

The [Graph](../classes/Graph.md) instance which triggered this event.

#### Defined in

[src/types.ts:118](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L118)

[@antv/graphlib](../README.md) / [Exports](../modules.md) / TreeData

# Interface: TreeData<D\>

TreeData is a nested data structure that contains nodes represent a tree.

## Type parameters

| Name |
| :------ |
| `D` |

## Table of contents

### Properties

- [children](TreeData.md#children)
- [data](TreeData.md#data)
- [id](TreeData.md#id)

## Properties

### children

• `Optional` **children**: [`TreeData`](TreeData.md)<`D`\>[]

Children nodes. Each node itself is a TreeData object, allowing for an arbitrary depth of nesting.

#### Defined in

[src/types.ts:63](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L63)

___

### data

• **data**: `D`

An object with string key and any value.

#### Defined in

[src/types.ts:58](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L58)

___

### id

• **id**: [`ID`](../modules.md#id)

Tree node IDs must be unique within the whole graph, not only the current tree.

#### Defined in

[src/types.ts:53](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L53)

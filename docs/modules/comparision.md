[@antv/graphlib](../README.md) / [Exports](../modules.md) / comparision

# Namespace: comparision

## Table of contents

### Functions

- [containAllSameEdges](comparision.md#containallsameedges)
- [containAllSameNodes](comparision.md#containallsamenodes)
- [containSameEdges](comparision.md#containsameedges)
- [containSameNodes](comparision.md#containsamenodes)
- [getSameEdges](comparision.md#getsameedges)
- [getSameNodes](comparision.md#getsamenodes)
- [isGraphContainsAnother](comparision.md#isgraphcontainsanother)
- [isGraphOptionSame](comparision.md#isgraphoptionsame)
- [isGraphSame](comparision.md#isgraphsame)

## Functions

### containAllSameEdges

▸ **containAllSameEdges**<`NodeIDType`, `EdgeType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if a graph contains all edges in another graph.

**`description.zh-cn`** 检查一个图是否包含另一个图的所有边。

#### Type parameters

| Name         | Type  |
| :----------- | :---- |
| `NodeIDType` | `any` |
| `EdgeType`   | `any` |

#### Parameters

| Name     | Type                                                                    |
| :------- | :---------------------------------------------------------------------- |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparison.ts:96](https://github.com/antvis/graphlib/blob/630e2c1/src/comparison.ts#L96)

---

### containAllSameNodes

▸ **containAllSameNodes**<`NodeIDType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if a graph contains all nodes in another graph.

**`description.zh-cn`** 检查一个图是否包含另一个图的所有节点。

#### Type parameters

| Name         | Type  |
| :----------- | :---- |
| `NodeIDType` | `any` |

#### Parameters

| Name     | Type                                                               |
| :------- | :----------------------------------------------------------------- |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `any`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `any`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparison.ts:84](https://github.com/antvis/graphlib/blob/630e2c1/src/comparison.ts#L84)

---

### containSameEdges

▸ **containSameEdges**<`NodeIDType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if two graphs are contains the same edges.

**`description.zh-cn`** 检查两个图是否包含相同的边。

#### Type parameters

| Name         | Type  |
| :----------- | :---- |
| `NodeIDType` | `any` |

#### Parameters

| Name | Type |
| :-- | :-- |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`boolean`

#### Defined in

[comparison.ts:25](https://github.com/antvis/graphlib/blob/630e2c1/src/comparison.ts#L25)

---

### containSameNodes

▸ **containSameNodes**<`NodeIDType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if two graphs are contains the same nodes.

**`description.zh-cn`** 检查两个图是否包含相同的节点。

#### Type parameters

| Name         | Type  |
| :----------- | :---- |
| `NodeIDType` | `any` |

#### Parameters

| Name | Type |
| :-- | :-- |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`boolean`

#### Defined in

[comparison.ts:7](https://github.com/antvis/graphlib/blob/630e2c1/src/comparison.ts#L7)

---

### getSameEdges

▸ **getSameEdges**<`NodeIDType`, `EdgeType`\>(`aGraph`, `bGraph`): `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

**`description`** get same edges in two graphs.

**`description.zh-cn`** 获取两个图中相同的边。

#### Type parameters

| Name         | Type  |
| :----------- | :---- |
| `NodeIDType` | `any` |
| `EdgeType`   | `any` |

#### Parameters

| Name     | Type                                                                    |
| :------- | :---------------------------------------------------------------------- |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

#### Defined in

[comparison.ts:56](https://github.com/antvis/graphlib/blob/630e2c1/src/comparison.ts#L56)

---

### getSameNodes

▸ **getSameNodes**<`NodeIDType`\>(`aGraph`, `bGraph`): `NodeIDType`[]

**`description`** get same nodes in two graphs.

**`description.zh-cn`** 获取两个图中相同的节点。

#### Type parameters

| Name         | Type  |
| :----------- | :---- |
| `NodeIDType` | `any` |

#### Parameters

| Name | Type |
| :-- | :-- |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`NodeIDType`[]

#### Defined in

[comparison.ts:43](https://github.com/antvis/graphlib/blob/630e2c1/src/comparison.ts#L43)

---

### isGraphContainsAnother

▸ **isGraphContainsAnother**<`NodeIDType`, `EdgeType`\>(`originGraph`, `targetGraph`): `boolean`

**`description`** Check if one graph is the subgraph of another graph.

**`description.zh-cn`** 检查一个图是否是另一个图的子图。

#### Type parameters

| Name         | Type  |
| :----------- | :---- |
| `NodeIDType` | `any` |
| `EdgeType`   | `any` |

#### Parameters

| Name          | Type                                                                    |
| :------------ | :---------------------------------------------------------------------- |
| `originGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `targetGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparison.ts:125](https://github.com/antvis/graphlib/blob/630e2c1/src/comparison.ts#L125)

---

### isGraphOptionSame

▸ **isGraphOptionSame**<`NodeIDType`, `EdgeType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if two graphs'option are the same.

**`description.zh-cn`** 检查两个图的选项是否相同。

#### Type parameters

| Name         | Type  |
| :----------- | :---- |
| `NodeIDType` | `any` |
| `EdgeType`   | `any` |

#### Parameters

| Name     | Type                                                                    |
| :------- | :---------------------------------------------------------------------- |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparison.ts:69](https://github.com/antvis/graphlib/blob/630e2c1/src/comparison.ts#L69)

---

### isGraphSame

▸ **isGraphSame**<`NodeIDType`, `EdgeType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if two graphs are the same.

**`description.zh-cn`** 检查两个图是否相同。

#### Type parameters

| Name         | Type  |
| :----------- | :---- |
| `NodeIDType` | `any` |
| `EdgeType`   | `any` |

#### Parameters

| Name     | Type                                                                    |
| :------- | :---------------------------------------------------------------------- |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparison.ts:108](https://github.com/antvis/graphlib/blob/630e2c1/src/comparison.ts#L108)

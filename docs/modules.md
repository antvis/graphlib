[@antv/graphlib](README.md) / Exports

# @antv/graphlib

## Table of contents

### Classes

- [Graph](classes/Graph.md)
- [GraphView](classes/GraphView.md)

### Interfaces

- [Edge](interfaces/Edge.md)
- [GraphChangedEvent](interfaces/GraphChangedEvent.md)
- [GraphOptions](interfaces/GraphOptions.md)
- [GraphViewOptions](interfaces/GraphViewOptions.md)
- [Node](interfaces/Node.md)
- [TreeData](interfaces/TreeData.md)

### Type Aliases

- [EdgeAdded](modules.md#edgeadded)
- [EdgeDataUpdated](modules.md#edgedataupdated)
- [EdgeRemoved](modules.md#edgeremoved)
- [EdgeUpdated](modules.md#edgeupdated)
- [GraphChange](modules.md#graphchange)
- [ID](modules.md#id)
- [NodeAdded](modules.md#nodeadded)
- [NodeDataUpdated](modules.md#nodedataupdated)
- [NodeRemoved](modules.md#noderemoved)
- [PlainObject](modules.md#plainobject)
- [TreeIndices](modules.md#treeindices)
- [TreeStructureAttached](modules.md#treestructureattached)
- [TreeStructureChanged](modules.md#treestructurechanged)
- [TreeStructureDetached](modules.md#treestructuredetached)

## Type Aliases

### EdgeAdded

Ƭ **EdgeAdded**<`D`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`PlainObject`](modules.md#plainobject) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"EdgeAdded"`` |
| `value` | [`Edge`](interfaces/Edge.md)<`D`\> |

#### Defined in

[src/types.ts:162](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L162)

___

### EdgeDataUpdated

Ƭ **EdgeDataUpdated**<`D`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`PlainObject`](modules.md#plainobject) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](modules.md#id) |
| `newValue` | `any` |
| `oldValue` | `any` |
| `propertyName?` | `PropertyKey` |
| `type` | ``"EdgeDataUpdated"`` |

#### Defined in

[src/types.ts:180](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L180)

___

### EdgeRemoved

Ƭ **EdgeRemoved**<`D`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`PlainObject`](modules.md#plainobject) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"EdgeRemoved"`` |
| `value` | [`Edge`](interfaces/Edge.md)<`D`\> |

#### Defined in

[src/types.ts:167](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L167)

___

### EdgeUpdated

Ƭ **EdgeUpdated**<`D`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`PlainObject`](modules.md#plainobject) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](modules.md#id) |
| `newValue` | [`ID`](modules.md#id) |
| `oldValue` | [`ID`](modules.md#id) |
| `propertyName` | ``"source"`` \| ``"target"`` |
| `type` | ``"EdgeUpdated"`` |

#### Defined in

[src/types.ts:172](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L172)

___

### GraphChange

Ƭ **GraphChange**<`N`, `E`\>: [`NodeAdded`](modules.md#nodeadded)<`N`\> \| [`NodeRemoved`](modules.md#noderemoved)<`N`\> \| [`NodeDataUpdated`](modules.md#nodedataupdated)<`N`\> \| [`EdgeAdded`](modules.md#edgeadded)<`E`\> \| [`EdgeRemoved`](modules.md#edgeremoved)<`E`\> \| [`EdgeUpdated`](modules.md#edgeupdated)<`E`\> \| [`EdgeDataUpdated`](modules.md#edgedataupdated)<`E`\> \| [`TreeStructureAttached`](modules.md#treestructureattached) \| [`TreeStructureDetached`](modules.md#treestructuredetached) \| [`TreeStructureChanged`](modules.md#treestructurechanged)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | extends [`PlainObject`](modules.md#plainobject) |
| `E` | extends [`PlainObject`](modules.md#plainobject) |

#### Defined in

[src/types.ts:132](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L132)

___

### ID

Ƭ **ID**: `string` \| `number`

Supported node/edge ID type.

"1" and 1 are treated as different IDs.

#### Defined in

[src/types.ts:8](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L8)

___

### NodeAdded

Ƭ **NodeAdded**<`D`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`PlainObject`](modules.md#plainobject) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"NodeAdded"`` |
| `value` | [`Node`](interfaces/Node.md)<`D`\> |

#### Defined in

[src/types.ts:144](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L144)

___

### NodeDataUpdated

Ƭ **NodeDataUpdated**<`D`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`PlainObject`](modules.md#plainobject) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | [`ID`](modules.md#id) |
| `newValue` | `any` |
| `oldValue` | `any` |
| `propertyName?` | `PropertyKey` |
| `type` | ``"NodeDataUpdated"`` |

#### Defined in

[src/types.ts:154](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L154)

___

### NodeRemoved

Ƭ **NodeRemoved**<`D`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `D` | extends [`PlainObject`](modules.md#plainobject) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"NodeRemoved"`` |
| `value` | [`Node`](interfaces/Node.md)<`D`\> |

#### Defined in

[src/types.ts:149](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L149)

___

### PlainObject

Ƭ **PlainObject**: `Record`<`string`, `unknown`\>

#### Defined in

[src/types.ts:10](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L10)

___

### TreeIndices

Ƭ **TreeIndices**<`N`\>: `Map`<`string` \| `undefined`, { `childrenMap`: `Map`<[`ID`](modules.md#id), `Set`<`N`\>\> ; `parentMap`: `Map`<[`ID`](modules.md#id), `N`\>  }\>

#### Type parameters

| Name |
| :------ |
| `N` |

#### Defined in

[src/types.ts:103](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L103)

___

### TreeStructureAttached

Ƭ **TreeStructureAttached**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `treeKey` | `string` \| `undefined` |
| `type` | ``"TreeStructureAttached"`` |

#### Defined in

[src/types.ts:188](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L188)

___

### TreeStructureChanged

Ƭ **TreeStructureChanged**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `newParentId` | [`ID`](modules.md#id) |
| `nodeId` | [`ID`](modules.md#id) |
| `oldParentId?` | [`ID`](modules.md#id) |
| `treeKey` | `string` \| `undefined` |
| `type` | ``"TreeStructureChanged"`` |

#### Defined in

[src/types.ts:198](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L198)

___

### TreeStructureDetached

Ƭ **TreeStructureDetached**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `treeKey` | `string` \| `undefined` |
| `type` | ``"TreeStructureDetached"`` |

#### Defined in

[src/types.ts:193](https://github.com/antvis/graphlib/blob/07dc2de/src/types.ts#L193)

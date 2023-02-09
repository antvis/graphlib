@antv/graphlib / [Exports](modules.md)

# Graphlib

> a lib containing multible usages for graph structure, graph algorithm, and other graph ops.
>
> 一个包含方便的图结构，图算法，以及其他操作图的方法的图库，为 antv 上层提供相应的图基础能力

![build status](https://img.shields.io/github/workflow/status/antvis/graphlib/Build) ![coverage status](https://img.shields.io/codecov/c/github/antvis/graphlib)

## Content of Package

### Namespaces

- [algorithm](docs/modules/algorithm.md)
- [comparision](docs/modules/comparision.md)
- [essence](docs/modules/essence.md)
- [generate](docs/modules/generate.md)

### Classes

- [Graph](docs/classes/Graph.md)
- [GraphWithEvent](docs/classes/GraphWithEvent.md)

## Change Log

#### 1.2.0

- 🎉 `GraphWithEvent` now you can use graph with event listener
- 🎉 `essece` module for graph basic essence property check
- 🎉 `generate` module for graph generate new graph, now support graph's complement;
-

#### 1.1.0

- 🎉 Now we have comparision module for graph comparing with nodes/edges/options even subgraph
- 💪 Add isGraph to check if a object is a "Graph", and add a self loop checking function

#### 1.0.1

- 🔨 Completes test and bring all to 100%

#### 1.0.0

- 🎉 Release new graphlib with graph and algorithm

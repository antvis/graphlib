# Graphlib

> The typescript rewrite version of @dagrejs/graphlib, because graphlib was old and lacked typescript annotations, which led to inconsistent typescript files and even compilation failure or failure due to the typescript of Graphlib, antv team has rewritten it;

![build status](https://img.shields.io/github/workflow/status/antvis/graphlib/Build) ![coverage status](https://img.shields.io/codecov/c/github/antvis/graphlib)

### Improvements and break changes

- Graph has a type that accepts four parameters `<NodeIDType,NodeType, EdgeType, GraphType>` to make it easier for users to customize it themselves, no longer stuck to the original single number/string type, now because of the use of Map and Set, you can use any type (including reference Now, because of Map and Set, you can use any type (including reference type) as the index of a point.
- no longer accept the same node ID string, 1 and "1" are two different points, no automatic type conversion of NodeIDType comparison. 1.
- Graph's edge-related methods `edge` `setEdge` `removeEdge` no longer accept type overloading.
  - `edge` `setEdgeObj` `removeEdgeObj` accepts an edgeObj
  - `edgeFromArgs` `setEdge` `removeEdge` accepts specific parameters (v, w, name, value)

### Benchmark

| test\\performance(ops/s)  | @dagre/graphlib | @antv/graphlib | times    |
| ------------------------- | --------------- | -------------- | -------- |
| nodes(100,0.2)            | 353,396.95      | 3,429,316.12   | **9.7**  |
| sources(100,0.2)          | 10,521.67       | 392,493.77     | **37**   |
| sinks(100,0.2)            | 10,959.91       | 386,649.19     | **35**   |
| filterNodes all(100,0.2)  | 153.71          | 309.45         | **2.0**  |
| filterNodes none(100,0.2) | 2,519.81        | 9,639.13       | **3.83** |
| setNode(100,0.2)          | 12,312,125.13   | 46,866,922.24  | **3.81** |
| node(100,0.2)             | 28,205,461.65   | 47,093,921.57  | **1.67** |
| set + removeNode(100,0.2) | 1,272,331.16    | 391,557.00     | **0.31** |
| predecessors(100,0.2)     | 1,307,177.14    | 7,508,958.21   | **5.7**  |
| successors(100,0.2)       | 1,485,256.81    | 7,448,177.23   | **5.0**  |
| neighbors(100,0.2)        | 250,082.05      | 326,744.33     | **1.31** |
| edges(100,0.2)            | 4,594.50        | 195,840.56     | **43**   |
| setPath(100,0.2)          | 1,056,189.24    | 1,579,308.80   | **1.5**  |
| setEdge(100,0.2)          | 4,483,547.20    | 5,541,620.41   | **1.24** |
| edge(100,0.2)             | 3,254,316.17    | 7,126,976.06   | **2.2**  |
| set + removeEdge(100,0.2) | 557,579.88      | 76,798.23      | **0.14** |
| inEdges(100,0.2)          | 710,823.70      | 3,856,353.97   | **5.4**  |
| outEdges(100,0.2)         | 690,512.54      | 3,756,590.81   | **5.4**  |
| nodeEdges(100,0.2)        | 309,098.91      | 1,263,443.14   | **4.1**  |
| components(100,0.2)       | 1,729.79        | 5,321.20       | **3.1**  |
| dijkstraAll(100,0.2)      | 30.83           | 47.73          | **1.55** |

### Test Coverage

| File              | % Stmts | % Branch | % Funcs | % Lines |
| ----------------- | ------- | -------- | ------- | ------- |
| All files         | 100     | 100      | 100     | 100     |
| src               | 100     | 100      | 100     | 100     |
| enum.ts           | 0       | 0        | 0       | 0       |
| index.ts          | 0       | 0        | 0       | 0       |
| util.ts           | 100     | 100      | 100     | 100     |
| src/Graph         | 100     | 100      | 100     | 100     |
| index.ts          | 100     | 100      | 100     | 100     |
| src/PriorityQueue | 100     | 100      | 100     | 100     |
| index.ts          | 100     | 100      | 100     | 100     |
| src/algorithm     | 100     | 100      | 100     | 100     |
| components.ts     | 100     | 100      | 100     | 100     |
| dfs.ts            | 100     | 100      | 100     | 100     |
| dijkstra-all.ts   | 100     | 100      | 100     | 100     |
| dijkstra.ts       | 100     | 100      | 100     | 100     |
| find-cycles.ts    | 100     | 100      | 100     | 100     |
| floyd-warshall.ts | 100     | 100      | 100     | 100     |
| index.ts          | 0       | 0        | 0       | 0       |
| is-acyclic.ts     | 100     | 100      | 100     | 100     |
| postorder.ts      | 100     | 100      | 100     | 100     |
| preorder.ts       | 100     | 100      | 100     | 100     |
| prim.ts           | 100     | 100      | 100     | 100     |
| tarjan.ts         | 100     | 100      | 100     | 100     |
| topsort.ts        | 100     | 100      | 100     | 100     |

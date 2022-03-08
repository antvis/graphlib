# Benchmark record

### new version

```bash
               nodes(100,0.2):  3,429,316.12 ops/sec ± 1.19% ( 90 run(s) sampled)
             sources(100,0.2):    392,493.77 ops/sec ± 0.82% ( 92 run(s) sampled)
               sinks(100,0.2):    386,649.19 ops/sec ± 0.82% ( 85 run(s) sampled)
     filterNodes all(100,0.2):        309.45 ops/sec ± 1.75% ( 83 run(s) sampled)
    filterNodes none(100,0.2):      9,639.13 ops/sec ± 0.61% ( 91 run(s) sampled)
             setNode(100,0.2): 46,866,922.24 ops/sec ± 0.68% ( 92 run(s) sampled)
                node(100,0.2): 47,093,921.57 ops/sec ± 2.06% ( 87 run(s) sampled)
    set + removeNode(100,0.2):    391,557.00 ops/sec ± 1.90% ( 87 run(s) sampled)
        predecessors(100,0.2):  7,508,958.21 ops/sec ± 0.58% ( 93 run(s) sampled)
          successors(100,0.2):  7,448,177.23 ops/sec ± 0.78% ( 93 run(s) sampled)
           neighbors(100,0.2):    326,744.33 ops/sec ± 2.06% ( 94 run(s) sampled)
               edges(100,0.2):    195,840.56 ops/sec ± 0.43% ( 90 run(s) sampled)
             setPath(100,0.2):  1,579,308.80 ops/sec ± 1.96% ( 87 run(s) sampled)
             setEdge(100,0.2):  5,541,620.41 ops/sec ± 1.71% ( 89 run(s) sampled)
                edge(100,0.2):  7,126,976.06 ops/sec ± 7.29% ( 80 run(s) sampled)
    set + removeEdge(100,0.2):     76,798.23 ops/sec ± 3.23% ( 82 run(s) sampled)
             inEdges(100,0.2):  3,856,353.97 ops/sec ± 2.66% ( 86 run(s) sampled)
            outEdges(100,0.2):  3,756,590.81 ops/sec ± 2.89% ( 87 run(s) sampled)
           nodeEdges(100,0.2):  1,263,443.14 ops/sec ± 0.72% ( 86 run(s) sampled)
          components(100,0.2):      5,321.20 ops/sec ± 0.48% ( 94 run(s) sampled)
         dijkstraAll(100,0.2):         47.73 ops/sec ± 2.04% ( 63 run(s) sampled)
```

### graphlib version

```bash
               nodes(100,0.2):    353,396.95 ops/sec ± 0.38% ( 95 run(s) sampled)
             sources(100,0.2):     10,521.67 ops/sec ± 3.56% ( 87 run(s) sampled)
               sinks(100,0.2):     10,959.91 ops/sec ± 0.86% ( 89 run(s) sampled)
     filterNodes all(100,0.2):        153.71 ops/sec ± 3.14% ( 77 run(s) sampled)
    filterNodes none(100,0.2):      2,519.81 ops/sec ± 1.17% ( 90 run(s) sampled)
             setNode(100,0.2): 12,312,125.13 ops/sec ± 2.02% ( 89 run(s) sampled)
                node(100,0.2): 28,205,461.65 ops/sec ± 2.44% ( 89 run(s) sampled)
    set + removeNode(100,0.2):  1,272,331.16 ops/sec ± 1.49% ( 87 run(s) sampled)
        predecessors(100,0.2):  1,307,177.14 ops/sec ± 1.29% ( 85 run(s) sampled)
          successors(100,0.2):  1,485,256.81 ops/sec ± 0.92% ( 87 run(s) sampled)
           neighbors(100,0.2):    250,082.05 ops/sec ± 0.78% ( 95 run(s) sampled)
               edges(100,0.2):      4,594.50 ops/sec ± 1.58% ( 86 run(s) sampled)
             setPath(100,0.2):  1,056,189.24 ops/sec ± 1.37% ( 93 run(s) sampled)
             setEdge(100,0.2):  4,483,547.20 ops/sec ± 0.99% ( 88 run(s) sampled)
                edge(100,0.2):  3,254,316.17 ops/sec ± 1.46% ( 84 run(s) sampled)
    set + removeEdge(100,0.2):    557,579.88 ops/sec ± 3.08% ( 84 run(s) sampled)
             inEdges(100,0.2):    710,823.70 ops/sec ± 0.38% ( 89 run(s) sampled)
            outEdges(100,0.2):    690,512.54 ops/sec ± 1.06% ( 94 run(s) sampled)
           nodeEdges(100,0.2):    309,098.91 ops/sec ± 1.79% ( 88 run(s) sampled)
          components(100,0.2):      1,729.79 ops/sec ± 0.50% ( 93 run(s) sampled)
         dijkstraAll(100,0.2):         30.83 ops/sec ± 3.04% ( 55 run(s) sampled)
```

# Graphlib

> a typescript rewrite for graphlib

<a href="https://github.com/mxz96102/new-graphlib/actions">
  <img src="https://img.shields.io/github/workflow/status/mxz96102/new-graphlib/Node.js%20CI?style=flat-square" />
</a>

<img src="https://img.shields.io/codecov/c/github/mxz96102/new-graphlib" />

### Break change

- Methods `edge` `setEdge` `removeEdge` no longer accept both two form of params;
  - Using `edge` `setEdgeObj` `removeEdgeObj` on edgeObj
  - Using `edgeFromArgs` `setEdge` `removeEdge` on (v, w, name, value)
- No more auto type convert on nodeid, and support other type of value to index node

'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tarjan = function (graph) {
  var index = 0;
  var stack = [];
  var visited = new Map(); // node id -> { onStack, lowlink, index }
  var results = [];
  function dfs(v) {
    var _a;
    var entry = {
      onStack: true,
      lowlink: index,
      index: index,
    };
    visited.set(v, entry);
    index += 1;
    stack.push(v);
    (_a = graph.successors(v)) === null || _a === void 0
      ? void 0
      : _a.forEach(function (w) {
          var _a;
          if (!visited.has(w)) {
            dfs(w);
            var wEntry = visited.get(w);
            entry.lowlink = Math.min(entry.lowlink, wEntry.lowlink);
          } else if ((_a = visited.get(w)) === null || _a === void 0 ? void 0 : _a.onStack) {
            var wEntry = visited.get(w);
            entry.lowlink = Math.min(entry.lowlink, wEntry.index);
          }
        });
    if (entry.lowlink === entry.index) {
      var cmpt = [];
      var w = void 0;
      do {
        w = stack.pop();
        var wEntry = visited.get(w);
        wEntry.onStack = false;
        cmpt.push(w);
      } while (v !== w);
      results.push(cmpt);
    }
  }
  graph.nodes().forEach(function (v) {
    if (!visited.has(v)) {
      dfs(v);
    }
  });
  return results;
};
exports.default = tarjan;

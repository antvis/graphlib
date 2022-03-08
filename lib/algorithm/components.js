'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var components = function (graph) {
  var visited = new Set();
  var resultComponents = [];
  var nodes = graph.nodes();
  var dfs = function (node, arr) {
    var _a, _b;
    if (!visited.has(node)) {
      visited.add(node);
      arr.push(node);
      (_a = graph.successors(node)) === null || _a === void 0
        ? void 0
        : _a.forEach(function (n) {
            return dfs(n, arr);
          });
      (_b = graph.predecessors(node)) === null || _b === void 0
        ? void 0
        : _b.forEach(function (n) {
            return dfs(n, arr);
          });
    }
  };
  nodes.forEach(function (n) {
    var componentsArr = [];
    dfs(n, componentsArr);
    if (componentsArr.length) {
      resultComponents.push(componentsArr);
    }
  });
  return resultComponents;
};
exports.default = components;

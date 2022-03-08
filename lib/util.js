'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isFunction =
  exports.edgeObjToId =
  exports.edgeArgsToObj =
  exports.edgeArgsToId =
  exports.decrementOrRemoveEntry =
  exports.incrementOrInitEntry =
    void 0;
var enum_1 = require('./enum');
function incrementOrInitEntry(map, key) {
  var val = map.get(key) || 0;
  map.set(key, val + 1);
}
exports.incrementOrInitEntry = incrementOrInitEntry;
function decrementOrRemoveEntry(map, key) {
  var val = map.get(key);
  if (val !== undefined) {
    val = val - 1;
    if (val > 0) {
      map.set(key, val);
    } else {
      map.delete(key);
    }
  }
}
exports.decrementOrRemoveEntry = decrementOrRemoveEntry;
function edgeArgsToId(isDirected, v_, w_, name) {
  var v = String(v_);
  var w = String(w_);
  if (!isDirected && v > w) {
    var tmp = v;
    v = w;
    w = tmp;
  }
  return (
    v +
    enum_1.GraphEnum.EDGE_KEY_DELIM +
    w +
    enum_1.GraphEnum.EDGE_KEY_DELIM +
    (name === undefined ? enum_1.GraphEnum.DEFAULT_EDGE_NAME : name)
  );
}
exports.edgeArgsToId = edgeArgsToId;
function edgeArgsToObj(isDirected, v, w, name) {
  var strV = String(v);
  var strW = String(w);
  var edgeObj = { v: v, w: w };
  if (!isDirected && strV > strW) {
    var tmp = edgeObj.v;
    edgeObj.v = edgeObj.w;
    edgeObj.w = tmp;
  }
  if (name !== undefined) {
    edgeObj.name = name;
  }
  return edgeObj;
}
exports.edgeArgsToObj = edgeArgsToObj;
function edgeObjToId(isDirected, edgeObj) {
  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}
exports.edgeObjToId = edgeObjToId;
function isFunction(target) {
  return !!(target && target.constructor && target.call && target.apply);
}
exports.isFunction = isFunction;

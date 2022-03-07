import { GraphEnum } from './enum';
import { DefaultEdgeType } from './Graph';

export function incrementOrInitEntry(map: Map<any, any>, key: any) {
  const val = map.get(key) || 0;
  map.set(key, val + 1);
}

export function decrementOrRemoveEntry(map: Map<any, number>, key: any) {
  let val = map.get(key);
  if (val !== undefined) {
    val = val - 1;
    if (val > 0) {
      map.set(key, val);
    } else {
      map.delete(key);
    }
  }
}


export function edgeArgsToId<NodeType>(isDirected: boolean, v_: NodeType, w_: NodeType, name?: any) {
  let v = String(v_);
  let w = String(w_);
  if (!isDirected && v > w) {
    let tmp = v;
    v = w;
    w = tmp;
  }

  return (
    v +
    GraphEnum.EDGE_KEY_DELIM +
    w +
    GraphEnum.EDGE_KEY_DELIM +
    (name === undefined ? GraphEnum.DEFAULT_EDGE_NAME : name)
  );
}

export function edgeArgsToObj<NodeType>(
  isDirected: boolean,
  v: NodeType,
  w: NodeType,
  name?: string,
) {
  const strV = String(v);
  const strW = String(w);
  const edgeObj: DefaultEdgeType<NodeType, any> = { v: v, w: w };
  if (!isDirected && strV > strW) {
    let tmp = edgeObj.v;
    edgeObj.v = edgeObj.w;
    edgeObj.w = tmp;
  }

  if (name !== undefined) {
    edgeObj.name = name;
  }
  return edgeObj;
}

export function edgeObjToId(isDirected: boolean, edgeObj: { v: any; w: any; name?: any }) {
  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}

export function isFunction(target: any) {
  return !!(target && target.constructor && target.call && target.apply);
}

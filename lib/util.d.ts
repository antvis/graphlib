import { DefaultEdgeType } from './Graph';
export declare function incrementOrInitEntry(map: Map<any, any>, key: any): void;
export declare function decrementOrRemoveEntry(map: Map<any, number>, key: any): void;
export declare function edgeArgsToId<NodeType>(
  isDirected: boolean,
  v_: NodeType,
  w_: NodeType,
  name?: any,
): string;
export declare function edgeArgsToObj<NodeType>(
  isDirected: boolean,
  v: NodeType,
  w: NodeType,
  name?: string,
): DefaultEdgeType<NodeType, any>;
export declare function edgeObjToId(
  isDirected: boolean,
  edgeObj: {
    v: any;
    w: any;
    name?: any;
  },
): string;
export declare function isFunction(target: any): boolean;

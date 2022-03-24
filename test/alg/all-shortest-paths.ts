import { Graph } from '../../src';
import { DefaultEdgeType } from '../../src/Graph';

function weightFn(g: Graph<string, any, number>) {
  return function (e: DefaultEdgeType<string, number>) {
    return g.edge(e)!;
  };
}

export function allShortestPathsTest(
  sp: (
    graph: Graph<string, any, any>,
    weightFn?: (node: DefaultEdgeType<string, any>) => number,
    edgeFn?: (node: string) => DefaultEdgeType<string, any>[],
  ) => void,
  name: string,
) {
  describe(`${name} allShortestPaths`, function () {
    it('returns 0 for the node itself', function () {
      let g = new Graph();
      g.setNode('a');
      expect(sp(g)).toEqual({
        a: {
          a: {
            distance: 0,
          },
        },
      });
    });

    it('returns the distance and path from all nodes to other nodes', function () {
      let g = new Graph();
      g.setEdge('a', 'b');
      g.setEdge('b', 'c');
      expect(sp(g)).toEqual({
        a: {
          a: {
            distance: 0,
          },
          b: {
            distance: 1,
            predecessor: 'a',
          },
          c: {
            distance: 2,
            predecessor: 'b',
          },
        },
        b: {
          a: {
            distance: Number.POSITIVE_INFINITY,
          },
          b: {
            distance: 0,
          },
          c: {
            distance: 1,
            predecessor: 'b',
          },
        },
        c: {
          a: {
            distance: Number.POSITIVE_INFINITY,
          },
          b: {
            distance: Number.POSITIVE_INFINITY,
          },
          c: {
            distance: 0,
          },
        },
      });
    });

    it('uses an optionally supplied weight function', function () {
      let g = new Graph<string, any, number>();
      g.setEdge('a', 'b', 2);
      g.setEdge('b', 'c', 3);

      expect(sp(g, weightFn(g))).toEqual({
        a: {
          a: {
            distance: 0,
          },
          b: {
            distance: 2,
            predecessor: 'a',
          },
          c: {
            distance: 5,
            predecessor: 'b',
          },
        },
        b: {
          a: {
            distance: Number.POSITIVE_INFINITY,
          },
          b: {
            distance: 0,
          },
          c: {
            distance: 3,
            predecessor: 'b',
          },
        },
        c: {
          a: {
            distance: Number.POSITIVE_INFINITY,
          },
          b: {
            distance: Number.POSITIVE_INFINITY,
          },
          c: {
            distance: 0,
          },
        },
      });
    });

    it('uses an optionally supplied incident function', function () {
      let g = new Graph<string, any, any>();
      g.setEdge('a', 'b');
      g.setEdge('b', 'c');

      expect(
        sp(g, undefined, function (v) {
          return g.inEdges(v)!;
        }),
      ).toEqual({
        a: {
          a: {
            distance: 0,
          },
          b: {
            distance: Number.POSITIVE_INFINITY,
          },
          c: {
            distance: Number.POSITIVE_INFINITY,
          },
        },
        b: {
          a: {
            distance: 1,
            predecessor: 'b',
          },
          b: {
            distance: 0,
          },
          c: {
            distance: Number.POSITIVE_INFINITY,
          },
        },
        c: {
          a: {
            distance: 2,
            predecessor: 'b',
          },
          b: {
            distance: 1,
            predecessor: 'c',
          },
          c: {
            distance: 0,
          },
        },
      });
    });

    it('works with undirected graphs', function () {
      let g = new Graph<string, any, number, string>({
        directed: false,
      });
      g.setEdge('a', 'b', 1);
      g.setEdge('b', 'c', 2);
      g.setEdge('c', 'a', 4);
      g.setEdge('b', 'd', 6);

      expect(sp(g, weightFn(g), (n: string) => g.nodeEdges(n)!)).toEqual({
        a: {
          a: {
            distance: 0,
          },
          b: {
            distance: 1,
            predecessor: 'a',
          },
          c: {
            distance: 3,
            predecessor: 'b',
          },
          d: {
            distance: 7,
            predecessor: 'b',
          },
        },
        b: {
          a: {
            distance: 1,
            predecessor: 'b',
          },
          b: {
            distance: 0,
          },
          c: {
            distance: 2,
            predecessor: 'b',
          },
          d: {
            distance: 6,
            predecessor: 'b',
          },
        },
        c: {
          a: {
            distance: 3,
            predecessor: 'b',
          },
          b: {
            distance: 2,
            predecessor: 'c',
          },
          c: {
            distance: 0,
          },
          d: {
            distance: 8,
            predecessor: 'b',
          },
        },
        d: {
          a: {
            distance: 7,
            predecessor: 'b',
          },
          b: {
            distance: 6,
            predecessor: 'd',
          },
          c: {
            distance: 8,
            predecessor: 'b',
          },
          d: {
            distance: 0,
          },
        },
      });
    });
  });
}

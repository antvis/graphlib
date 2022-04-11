import { similar, Graph } from '../src';
import { isGraphOptionSame } from '../src/similar';

describe('similar', function () {
  describe('containSameNodes', function () {
    it('returns true if the two graphs contains all the same nodes', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      const bGraph = new Graph();
      bGraph.setNode('a');
      bGraph.setNode('b');
      bGraph.setNode('c');
      expect(similar.containSameNodes(aGraph, bGraph)).toBe(true);
    });

    it('returns true if the two graphs contains a same node', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      const bGraph = new Graph();
      bGraph.setNode('e');
      bGraph.setNode('f');
      bGraph.setNode('c');
      expect(similar.containSameNodes(aGraph, bGraph)).toBe(true);
    });

    it('returns false if the two graphs does not contains the same nodes', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      const bGraph = new Graph();
      bGraph.setNode('e');
      bGraph.setNode('f');
      bGraph.setNode('g');
      expect(similar.containSameNodes(aGraph, bGraph)).toBe(false);
    });
  });

  describe('containSameEdges', function () {
    it('returns true if the two graphs contains all the same edges', function () {
      const aGraph = new Graph();
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'c', 'b');
      bGraph.setEdge('c', 'd', 'c');
      expect(similar.containSameEdges(aGraph, bGraph)).toBe(true);
    });

    it('returns true if the two graphs contains a same edge', function () {
      const aGraph = new Graph();
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'd', 'b');
      bGraph.setEdge('c', 'e', 'c');
      expect(similar.containSameEdges(aGraph, bGraph)).toBe(true);
    });

    it('returns false if the two graphs does not contains the same edges', function () {
      const aGraph = new Graph();
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setEdge('a', 'h', 'a');
      bGraph.setEdge('b', 'd', 'b');
      bGraph.setEdge('c', 'e', 'c');
      expect(similar.containSameEdges(aGraph, bGraph)).toBe(false);
    });
  });

  describe('getSameNodes', function () {
    it('returns the same nodes in the two graphs', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      const bGraph = new Graph();
      bGraph.setNode('a');
      bGraph.setNode('b');
      bGraph.setNode('c');
      expect(similar.getSameNodes(aGraph, bGraph)).toEqual(['a', 'b', 'c']);
    });

    it('returns the same nodes in the two graphs', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      const bGraph = new Graph();
      bGraph.setNode('a');
      bGraph.setNode('b');
      bGraph.setNode('d');
      expect(similar.getSameNodes(aGraph, bGraph)).toEqual(['a', 'b']);
    });

    it('return empty array if the two graphs does not contains the same nodes', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      const bGraph = new Graph();
      bGraph.setNode('e');
      bGraph.setNode('f');
      bGraph.setNode('g');
      expect(similar.getSameNodes(aGraph, bGraph)).toEqual([]);
    });
  });

  describe('getSameEdges', function () {
    it('returns the same edges in the two graphs', function () {
      const aGraph = new Graph();
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'c', 'b');
      bGraph.setEdge('c', 'd', 'c');
      expect(similar.getSameEdges(aGraph, bGraph)).toEqual([
        {
          v: 'a',
          w: 'b',
        },
        {
          v: 'b',
          w: 'c',
        },
        {
          v: 'c',
          w: 'd',
        },
      ]);
    });

    it('returns the same edges in the two graphs', function () {
      const aGraph = new Graph();
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'd', 'b');
      bGraph.setEdge('c', 'e', 'c');
      expect(similar.getSameEdges(aGraph, bGraph)).toEqual([
        {
          v: 'a',
          w: 'b',
        },
      ]);
    });

    it('return empty array if the two graphs does not contains the same edges', function () {
      const aGraph = new Graph();
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setEdge('a', 'h', 'a');
      bGraph.setEdge('b', 'd', 'b');
      bGraph.setEdge('c', 'e', 'c');
      expect(similar.getSameEdges(aGraph, bGraph)).toEqual([]);
    });
  });

  describe('is graph option same', function () {
    it("returns false when graphs' options are different", function () {
      const graph11 = new Graph({
        compound: true,
      });
      const graph12 = new Graph({});

      expect(isGraphOptionSame(graph11, graph12)).toBeFalsy();

      const graph21 = new Graph({ compound: true, directed: false });
      const graph22 = new Graph({ compound: true, directed: true });

      expect(isGraphOptionSame(graph21, graph22)).toBeFalsy();

      const graph31 = new Graph({ compound: true, multigraph: true });
      const graph32 = new Graph({ compound: true, multigraph: false });

      expect(isGraphOptionSame(graph31, graph32)).toBeFalsy();
    });
  });

  describe('contain all same nodes', function () {
    it('returns true when the two graphs contain the same nodes', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      const bGraph = new Graph();
      bGraph.setNode('a');
      bGraph.setNode('b');
      bGraph.setNode('c');
      expect(similar.containAllSameNodes(aGraph, bGraph)).toBe(true);
    });

    it('returns false when the two graphs does not contain the same nodes', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      const bGraph = new Graph();
      bGraph.setNode('a');
      bGraph.setNode('b');
      bGraph.setNode('d');
      expect(similar.containAllSameNodes(aGraph, bGraph)).toBe(false);
    });
  });

  describe('contain all same edges', function () {
    it('returns true when the two graphs contain the same edges', function () {
      const aGraph = new Graph();
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'c', 'b');
      bGraph.setEdge('c', 'd', 'c');
      expect(similar.containAllSameEdges(aGraph, bGraph)).toBe(true);
    });

    it('returns false when the two graphs does not contain the same edges', function () {
      const aGraph = new Graph();
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'd', 'b');
      bGraph.setEdge('c', 'e', 'c');
      expect(similar.containAllSameEdges(aGraph, bGraph)).toBe(false);
    });
  });

  describe('is graph same', function () {
    it('returns true when the two graphs are the same', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setNode('a');
      bGraph.setNode('b');
      bGraph.setNode('c');
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'c', 'b');
      bGraph.setEdge('c', 'd', 'c');
      expect(similar.isGraphSame(aGraph, bGraph)).toBe(true);
    });

    it('returns false when the two graphs are not the same', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setNode('a');
      bGraph.setNode('b');
      bGraph.setNode('c');
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'd', 'b');
      bGraph.setEdge('c', 'e', 'c');
      expect(similar.isGraphSame(aGraph, bGraph)).toBe(false);
    });
  });

  describe('is graph contains another graph', function () {
    it('returns true when the first graph contains the second graph', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setNode('a');
      bGraph.setNode('b');
      bGraph.setNode('c');
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'c', 'b');
      bGraph.setEdge('c', 'd', 'c');
      expect(similar.isGraphContainsAnother(aGraph, bGraph)).toBe(true);
    });

    it('returns false when the first graph does not contain the second graph', function () {
      const aGraph = new Graph();
      aGraph.setNode('a');
      aGraph.setNode('b');
      aGraph.setNode('c');
      aGraph.setEdge('a', 'b', 'a');
      aGraph.setEdge('b', 'c', 'b');
      aGraph.setEdge('c', 'd', 'c');
      const bGraph = new Graph();
      bGraph.setNode('a');
      bGraph.setNode('b');
      bGraph.setNode('c');
      bGraph.setEdge('a', 'b', 'a');
      bGraph.setEdge('b', 'd', 'b');
      bGraph.setEdge('c', 'e', 'c');
      expect(similar.isGraphContainsAnother(aGraph, bGraph)).toBe(false);
    });
  });
});

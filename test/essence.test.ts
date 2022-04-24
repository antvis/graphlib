import { Graph } from '../src';
import { hasSelfLoop, isGraph, isNullGraph, isSimpleGraph } from '../src/essence';

describe('Essence', () => {
  it('is graph', () => {
    const g = new Graph();
    expect(isGraph(g)).toBeTruthy();
    expect(isGraph(1)).toBeFalsy();
    expect(isGraph('1')).toBeFalsy();
    expect(isGraph({})).toBeFalsy();
  });

  describe('self loop', () => {
    it('should return true', () => {
      const g = new Graph();
      g.setEdge('a', 'a');
      expect(hasSelfLoop(g)).toBeTruthy();
    });

    it('should return false', () => {
      const g = new Graph();
      g.setEdge('a', 'b');
      expect(hasSelfLoop(g)).toBeFalsy();
    });
  });

  describe('is simple graph', () => {
    it('should return true', () => {
      const g = new Graph();
      g.setEdge('a', 'b');
      g.setEdge('b', 'c');
      expect(isSimpleGraph(g)).toBeTruthy();
    });

    it('should return false when graph has self loop', () => {
      const g = new Graph();
      g.setEdge('a', 'a');
      expect(isSimpleGraph(g)).toBeFalsy();
    });

    it('should return false', () => {
      const g = new Graph();
      g.setEdge('a', 'b');
      g.setEdge('b', 'c');
      g.setEdge('c', 'b');
      expect(isSimpleGraph(g)).toBeFalsy();
    });
  });

  describe('is null graph', () => {
    it('should return true', () => {
      const g = new Graph();
      expect(isNullGraph(g)).toBeTruthy();
    });

    it('should return false', () => {
      const g = new Graph();
      g.setNode('a');
      expect(isNullGraph(g)).toBeFalsy();
    });
  });
});

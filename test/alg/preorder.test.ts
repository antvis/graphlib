import _ from 'lodash';
import { Graph } from '../../src';
import { preorder } from '../../src/algorithm';

describe('alg.preorder', function () {
  it('returns the root for a singleton graph', function () {
    let g = new Graph();
    g.setNode('a');
    expect(preorder(g, 'a')).toEqual(['a']);
  });

  it('visits each node in the graph once', function () {
    let g = new Graph();
    g.setPath(['a', 'b', 'd', 'e']);
    g.setPath(['a', 'c', 'd', 'e']);

    let nodes = preorder(g, 'a');
    expect(_.sortBy(nodes)).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it("visits each node in the graph once when it's undirected", function () {
    let g = new Graph({ directed: false });
    g.setPath(['a', 'b', 'd', 'e']);
    g.setPath(['a', 'c', 'd', 'e']);

    let nodes = preorder(g, 'a');
    expect(_.sortBy(nodes)).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('works for a tree', function () {
    let g = new Graph();
    g.setEdge('a', 'b');
    g.setPath(['a', 'c', 'd']);
    g.setEdge('c', 'e');

    let nodes = preorder(g, 'a');
    expect(_.sortBy(nodes)).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(nodes.indexOf('b')).toBeGreaterThan(nodes.indexOf('a'));
    expect(nodes.indexOf('c')).toBeGreaterThan(nodes.indexOf('a'));
    expect(nodes.indexOf('d')).toBeGreaterThan(nodes.indexOf('c'));
    expect(nodes.indexOf('e')).toBeGreaterThan(nodes.indexOf('c'));
  });

  it('works for an array of roots', function () {
    let g = new Graph();
    g.setEdge('a', 'b');
    g.setEdge('c', 'd');
    g.setNode('e');
    g.setNode('f');

    let nodes = preorder(g, ['a', 'c', 'e']);
    expect(_.sortBy(nodes)).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(nodes.indexOf('b')).toBeGreaterThan(nodes.indexOf('a'));
    expect(nodes.indexOf('d')).toBeGreaterThan(nodes.indexOf('c'));
  });

  it('fails if root is not in the graph', function () {
    let g = new Graph();
    g.setNode('a');
    expect(function () {
      preorder(g, 'b');
    }).toThrow();
  });
});

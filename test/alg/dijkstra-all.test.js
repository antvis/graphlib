import { Graph } from '../../src';
import { dijkstraAll } from '../../src/algorithm';
import { allShortestPathsTest } from './all-shortest-paths';

function weight(g) {
  return function(e) {
    return g.edgeFromObj(e);
  };
}

describe("alg.dijkstraAll", function() {
  allShortestPathsTest(dijkstraAll, "dijkstraAll");

  it("throws an Error if it encounters a negative edge weight", function() {
    let g = new Graph();
    g.setEdge("a", "b",  1);
    g.setEdge("a", "c", -2);
    g.setEdge("b", "d",  3);
    g.setEdge("c", "d",  3);

    expect(function() { dijkstraAll(g, weight(g)); }).toThrow();
  });
});



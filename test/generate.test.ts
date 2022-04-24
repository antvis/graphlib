import { generate, Graph } from '../src';

describe('generate', () => {
  describe('complement', () => {
    it("should return the graph's complement", () => {
      const originGraph = new Graph({
        compound: false,
        directed: false,
        multigraph: false,
      });
      originGraph.setNode('a');
      originGraph.setNode('b');
      originGraph.setNode('c');
      originGraph.setEdge('a', 'b');
      originGraph.setEdge('b', 'c');
      const complementGraph = generate.getGraphComplement(originGraph);
      expect(complementGraph.nodeCount()).toBe(3);
      console.log(complementGraph.edges());
      expect(complementGraph.edgeCount()).toBe(1);

      expect(complementGraph.hasEdge('a', 'b')).toBeFalsy();
      expect(complementGraph.hasEdge('b', 'c')).toBeFalsy();
      expect(complementGraph.hasEdge('c', 'a')).toBeTruthy();
    });

    it('should return null when graph is not simple', () => {
      const originGraph = new Graph({
        compound: false,
        directed: true,
        multigraph: false,
      });
      originGraph.setNode('a');
      originGraph.setNode('b');
      originGraph.setNode('c');
      originGraph.setEdge('a', 'b');
      originGraph.setEdge('b', 'c');
      originGraph.setEdge('c', 'b');
      expect(generate.getGraphComplement(originGraph)).toBeNull();
    });
  });
});

import Graph from '../Graph';

type Entry = {
  onStack: boolean;
  lowlink: number;
  index: number;
};

const tarjan = <NodeType>(graph: Graph<NodeType>) => {
  let index = 0;
  const stack: NodeType[] = [];
  const visited = new Map<NodeType, Entry>(); // node id -> { onStack, lowlink, index }
  const results: NodeType[][] = [];

  function dfs(v: NodeType) {
    const entry = {
      onStack: true,
      lowlink: index,
      index,
    };
    visited.set(v, entry);
    index += 1;
    stack.push(v);

    graph.successors(v)?.forEach(function (w) {
      if (!visited.has(w)) {
        dfs(w);
        const wEntry = visited.get(w);
        entry.lowlink = Math.min(entry.lowlink, wEntry!.lowlink);
      } else if (visited.get(w)?.onStack) {
        const wEntry = visited.get(w);
        entry.lowlink = Math.min(entry.lowlink, wEntry!.index);
      }
    });

    if (entry.lowlink === entry.index) {
      const cmpt = [];
      let w;
      do {
        w = stack.pop()!;
        const wEntry = visited.get(w)!;
        wEntry.onStack = false;
        cmpt.push(w);
      } while (v !== w);
      results.push(cmpt);
    }
  }

  graph.nodes().forEach(function (v) {
    if (!visited.has(v)) {
      dfs(v);
    }
  });

  return results;
};

export default tarjan;

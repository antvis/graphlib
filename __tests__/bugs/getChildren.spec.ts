import { Graph } from '../../src/graph';

describe('remove node and get children', () => {
  const data = {
    nodes: [
      {
        id: 'Modeling Methods',
        children: ['Classification', 'Consensus', 'Regression'],
      },
      {
        id: 'Classification',
        children: [
          'Logistic regression',
          'Linear discriminant analysis',
          'Rules',
          'Decision trees',
          'Naive Bayes',
          'K nearest neighbor',
          'Probabilistic neural network',
          'Support vector machine',
        ],
      },
      { id: 'Logistic regression' },
      { id: 'Linear discriminant analysis' },
      { id: 'Rules' },
      { id: 'Decision trees' },
      { id: 'Naive Bayes' },
      { id: 'K nearest neighbor' },
      { id: 'Probabilistic neural network' },
      { id: 'Support vector machine' },
      { id: 'Consensus', children: ['Models diversity', 'Methods', 'Common'] },
      {
        id: 'Models diversity',
        children: [
          'Different initializations',
          'Different parameter choices',
          'Different architectures',
          'Different modeling methods',
          'Different training sets',
          'Different feature sets',
        ],
      },
      { id: 'Different initializations' },
      { id: 'Different parameter choices' },
      { id: 'Different architectures' },
      { id: 'Different modeling methods' },
      { id: 'Different training sets' },
      { id: 'Different feature sets' },
      {
        id: 'Methods',
        children: ['Classifier selection', 'Classifier fusion'],
      },
      { id: 'Classifier selection' },
      { id: 'Classifier fusion' },
      { id: 'Common', children: ['Bagging', 'Boosting', 'AdaBoost'] },
      { id: 'Bagging' },
      { id: 'Boosting' },
      { id: 'AdaBoost' },
      {
        id: 'Regression',
        children: [
          'Multiple linear regression',
          'Partial least squares',
          'Multi-layer feed forward neural network',
          'General regression neural network',
          'Support vector regression',
        ],
      },
      { id: 'Multiple linear regression' },
      { id: 'Partial least squares' },
      { id: 'Multi-layer feed forward neural network' },
      { id: 'General regression neural network' },
      { id: 'Support vector regression' },
    ],
    edges: [
      { source: 'Modeling Methods', target: 'Classification' },
      { source: 'Modeling Methods', target: 'Consensus' },
      { source: 'Modeling Methods', target: 'Regression' },
      { source: 'Classification', target: 'Logistic regression' },
      { source: 'Classification', target: 'Linear discriminant analysis' },
      { source: 'Classification', target: 'Rules' },
      { source: 'Classification', target: 'Decision trees' },
      { source: 'Classification', target: 'Naive Bayes' },
      { source: 'Classification', target: 'K nearest neighbor' },
      { source: 'Classification', target: 'Probabilistic neural network' },
      { source: 'Classification', target: 'Support vector machine' },
      { source: 'Consensus', target: 'Models diversity' },
      { source: 'Consensus', target: 'Methods' },
      { source: 'Consensus', target: 'Common' },
      { source: 'Models diversity', target: 'Different initializations' },
      { source: 'Models diversity', target: 'Different parameter choices' },
      { source: 'Models diversity', target: 'Different architectures' },
      { source: 'Models diversity', target: 'Different modeling methods' },
      { source: 'Models diversity', target: 'Different training sets' },
      { source: 'Models diversity', target: 'Different feature sets' },
      { source: 'Methods', target: 'Classifier selection' },
      { source: 'Methods', target: 'Classifier fusion' },
      { source: 'Common', target: 'Bagging' },
      { source: 'Common', target: 'Boosting' },
      { source: 'Common', target: 'AdaBoost' },
      { source: 'Regression', target: 'Multiple linear regression' },
      { source: 'Regression', target: 'Partial least squares' },
      {
        source: 'Regression',
        target: 'Multi-layer feed forward neural network',
      },
      { source: 'Regression', target: 'General regression neural network' },
      { source: 'Regression', target: 'Support vector regression' },
    ],
  };

  const graph = new Graph({
    nodes: data.nodes.map(({ id }) => ({ id, data: {} })),
    edges: data.edges.map(({ source, target }) => ({
      id: `${source}-${target}`,
      source,
      target,
      data: {},
    })),
  });

  graph.attachTreeStructure('tree');

  data.nodes.forEach((node) => {
    node.children?.forEach((child) => {
      graph.setParent(child, node.id, 'tree');
    });
  });

  it('should get the correct children', () => {
    expect(graph.getParent('Logistic regression', 'tree')?.id).toBe(
      'Classification',
    );

    graph.removeNode('Rules');

    expect(
      graph.getChildren('Classification', 'tree').map((d) => d.id),
    ).toEqual([
      'Logistic regression',
      'Linear discriminant analysis',
      // 'Rules',
      'Decision trees',
      'Naive Bayes',
      'K nearest neighbor',
      'Probabilistic neural network',
      'Support vector machine',
    ]);
  });
});

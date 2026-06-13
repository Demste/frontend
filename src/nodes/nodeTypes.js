import { BaseNode } from './BaseNode';
import { nodeConfigs } from './nodeConfigs';

const createConfiguredNode = (config) => {
  return function ConfiguredNode(props) {
    return <BaseNode {...props} config={config} />;
  };
};

export const nodeTypes = Object.fromEntries(
  Object.entries(nodeConfigs).map(([type, config]) => [
    type,
    createConfiguredNode(config),
  ])
);

const toolbarOrder = [
  'customInput',
  'customOutput',
  'text',
  'llm',
  'prompt',
  'summarizer',
  'classifier',
  'translator',
  'apiRequest',
  'condition',
];

export const toolbarNodes = toolbarOrder
  .filter((type) => nodeConfigs[type])
  .map((type) => ({
    type,
    label: nodeConfigs[type].title,
    category: nodeConfigs[type].category || 'Other',
    description: nodeConfigs[type].description,
  }));

export const toolbarNodeGroups = [
  {
    name: 'Core',
    nodes: toolbarNodes.filter((node) => node.category === 'Core'),
  },
  {
    name: 'AI Tools',
    nodes: toolbarNodes.filter((node) => node.category === 'AI Tools'),
  },
  {
    name: 'Logic & Integration',
    nodes: toolbarNodes.filter(
      (node) => node.category === 'Logic & Integration'
    ),
  },
].filter((group) => group.nodes.length > 0);

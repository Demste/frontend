import { BaseNode } from './BaseNode';
import { TextNode } from './textNode';
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

nodeTypes.text = TextNode;

export const toolbarNodes = [
  { type: 'customInput', label: 'Input' },
  { type: 'llm', label: 'LLM' },
  { type: 'customOutput', label: 'Output' },
  { type: 'text', label: 'Text' },
  { type: 'prompt', label: 'Prompt' },
  { type: 'summarizer', label: 'Summarizer' },
  { type: 'classifier', label: 'Classifier' },
  { type: 'translator', label: 'Translator' },
  { type: 'apiRequest', label: 'API Request' },
  { type: 'condition', label: 'Condition' },
];

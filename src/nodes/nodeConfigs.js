export const nodeConfigs = {
  customInput: {
    type: 'customInput',
    title: 'Input',
    subtitle: 'Pipeline source',
    icon: '↧',
    variant: 'input',
    description: 'Defines a value that can be passed into the workflow.',
    inputs: [],
    outputs: [{ id: 'value', label: 'Value' }],
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'input',
        placeholder: 'input_name',
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: ['Text', 'File'],
      },
    ],
  },

  llm: {
    type: 'llm',
    title: 'LLM',
    subtitle: 'Generation step',
    icon: '✦',
    variant: 'llm',
    description: 'Generates a response from system and prompt inputs.',
    inputs: [
      { id: 'system', label: 'System' },
      { id: 'prompt', label: 'Prompt' },
    ],
    outputs: [{ id: 'response', label: 'Response' }],
    fields: [
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'GPT-4',
        options: ['GPT-4', 'Claude', 'Gemini', 'Local LLM'],
      },
      {
        name: 'temperature',
        label: 'Temperature',
        type: 'select',
        defaultValue: '0.7',
        options: ['0.0', '0.3', '0.7', '1.0'],
      },
    ],
  },

  customOutput: {
    type: 'customOutput',
    title: 'Output',
    subtitle: 'Pipeline result',
    icon: '↥',
    variant: 'output',
    description: 'Marks the final value returned by the workflow.',
    inputs: [{ id: 'value', label: 'Value' }],
    outputs: [],
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: 'output',
        placeholder: 'output_name',
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: ['Text', 'Image'],
      },
    ],
  },

  prompt: {
    type: 'prompt',
    title: 'Prompt',
    subtitle: 'Prompt builder',
    icon: '⌘',
    variant: 'prompt',
    description: 'Combines instructions and context into a reusable prompt.',
    inputs: [{ id: 'context', label: 'Context' }],
    outputs: [{ id: 'prompt', label: 'Prompt' }],
    fields: [
      {
        name: 'instruction',
        label: 'Instruction',
        type: 'textarea',
        defaultValue: 'Write a clear and helpful answer.',
        placeholder: 'Enter prompt instructions...',
        rows: 3,
      },
    ],
  },

  summarizer: {
    type: 'summarizer',
    title: 'Summarizer',
    subtitle: 'Text compression',
    icon: '≋',
    variant: 'utility',
    description: 'Condenses long content into a shorter summary.',
    inputs: [{ id: 'text', label: 'Text' }],
    outputs: [{ id: 'summary', label: 'Summary' }],
    fields: [
      {
        name: 'summaryStyle',
        label: 'Style',
        type: 'select',
        defaultValue: 'Bullet Points',
        options: ['Bullet Points', 'Paragraph', 'Executive Summary'],
      },
    ],
  },

  classifier: {
    type: 'classifier',
    title: 'Classifier',
    subtitle: 'Label prediction',
    icon: '◇',
    variant: 'utility',
    description: 'Classifies incoming text into a selected category set.',
    inputs: [{ id: 'text', label: 'Text' }],
    outputs: [{ id: 'label', label: 'Label' }],
    fields: [
      {
        name: 'labels',
        label: 'Labels',
        type: 'text',
        defaultValue: 'positive, neutral, negative',
        placeholder: 'label1, label2, label3',
      },
    ],
  },

  translator: {
    type: 'translator',
    title: 'Translator',
    subtitle: 'Language transform',
    icon: '文',
    variant: 'utility',
    description: 'Translates text into the selected target language.',
    inputs: [{ id: 'text', label: 'Text' }],
    outputs: [{ id: 'translation', label: 'Translation' }],
    fields: [
      {
        name: 'targetLanguage',
        label: 'Target',
        type: 'select',
        defaultValue: 'English',
        options: ['English', 'Spanish', 'Turkish', 'German', 'French'],
      },
    ],
  },

  apiRequest: {
    type: 'apiRequest',
    title: 'API Request',
    subtitle: 'External call',
    icon: '{}',
    variant: 'integration',
    description: 'Sends workflow data to an external API endpoint.',
    inputs: [{ id: 'payload', label: 'Payload' }],
    outputs: [
      { id: 'response', label: 'Response' },
      { id: 'error', label: 'Error' },
    ],
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'POST',
        options: ['GET', 'POST', 'PUT', 'PATCH'],
      },
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        defaultValue: 'https://api.example.com',
        placeholder: 'https://...',
      },
    ],
  },

  condition: {
    type: 'condition',
    title: 'Condition',
    subtitle: 'Branch logic',
    icon: '⌥',
    variant: 'logic',
    description: 'Routes data based on a simple condition.',
    inputs: [{ id: 'value', label: 'Value' }],
    outputs: [
      { id: 'true', label: 'True' },
      { id: 'false', label: 'False' },
    ],
    fields: [
      {
        name: 'operator',
        label: 'Operator',
        type: 'select',
        defaultValue: 'contains',
        options: ['contains', 'equals', 'starts with', 'ends with'],
      },
      {
        name: 'compareValue',
        label: 'Compare',
        type: 'text',
        defaultValue: '',
        placeholder: 'value',
      },
    ],
  },
};
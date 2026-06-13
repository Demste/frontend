// submit.js

import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useStore } from './store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  clearCanvas: state.clearCanvas,
});

const pluralize = (count, singular, plural) => {
  return `${count} ${count === 1 ? singular : plural}`;
};

export const SubmitButton = ({ onNotify }) => {
  const { nodes, edges, clearCanvas } = useStore(selector, shallow);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCanvasEmpty = nodes.length === 0 && edges.length === 0;

  const handleClearCanvas = () => {
    if (isCanvasEmpty) {
      return;
    }

    clearCanvas();
    onNotify?.('Canvas cleared');
  };

  const handleSubmitPipeline = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes,
          edges,
        }),
      });

      if (!response.ok) {
        throw new Error('Pipeline validation request failed');
      }

      const result = await response.json();

      alert(
        `Pipeline validation complete\n\n` +
          `Nodes: ${result.num_nodes}\n` +
          `Edges: ${result.num_edges}\n` +
          `Directed Acyclic Graph: ${result.is_dag ? 'Yes' : 'No'}`
      );

      onNotify?.(
        `Validated ${pluralize(result.num_nodes, 'node', 'nodes')} and ${pluralize(
          result.num_edges,
          'connection',
          'connections'
        )}`
      );
    } catch (error) {
      console.error('Pipeline submit error:', error);
      alert(
        'Pipeline validation failed. Please make sure the backend is running on http://localhost:8000.'
      );
      onNotify?.('Pipeline validation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submit-panel">
      <div>
        <div className="submit-panel__title">Ready to validate?</div>
        <div className="submit-panel__description">
          {pluralize(nodes.length, 'node', 'nodes')} and{' '}
          {pluralize(edges.length, 'connection', 'connections')} in this
          workflow.
        </div>
      </div>

      <div className="submit-panel__actions">
        <button
          className="submit-panel__button submit-panel__button--ghost"
          type="button"
          onClick={handleClearCanvas}
          disabled={isCanvasEmpty || isSubmitting}
        >
          Clear Canvas
        </button>

        <button
          className="submit-panel__button"
          type="button"
          onClick={handleSubmitPipeline}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Validating...' : 'Submit Pipeline'}
        </button>
      </div>
    </div>
  );
};
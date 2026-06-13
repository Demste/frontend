// submit.js

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
  const isCanvasEmpty = nodes.length === 0 && edges.length === 0;

  const handleClearCanvas = () => {
    if (isCanvasEmpty) {
      return;
    }

    clearCanvas();
    onNotify?.('Canvas cleared');
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
          disabled={isCanvasEmpty}
        >
          Clear Canvas
        </button>

        <button className="submit-panel__button" type="button">
          Submit Pipeline
        </button>
      </div>
    </div>
  );
};

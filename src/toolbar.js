import { DraggableNode } from './draggableNode';
import { toolbarNodes } from './nodes/nodeTypes';

export const PipelineToolbar = () => {
  return (
    <aside className="pipeline-toolbar">
      <div className="pipeline-toolbar__header">
        <div className="pipeline-toolbar__eyebrow">VectorShift</div>
        <h1 className="pipeline-toolbar__title">AI Pipeline Builder</h1>
        <p className="pipeline-toolbar__description">
          Drag nodes onto the canvas to compose an AI workflow.
        </p>
      </div>

      <div className="pipeline-toolbar__nodes">
        {toolbarNodes.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
    </aside>
  );
};
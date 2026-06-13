import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { NodeField } from './NodeField';

const getHandleTop = (index, total) => {
  if (total <= 1) {
    return '50%';
  }

  return `${((index + 1) * 100) / (total + 1)}%`;
};

export const BaseNode = ({ id, data, config }) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const inputs = config.inputs || [];
  const outputs = config.outputs || [];
  const fields = config.fields || [];

  return (
    <div className={`base-node base-node--${config.variant || 'default'}`}>
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="node-handle node-handle--target"
          style={{ top: getHandleTop(index, inputs.length) }}
        />
      ))}

      <div className="base-node__header">
        <div className="base-node__icon">{config.icon}</div>

        <div className="base-node__title-group">
          <div className="base-node__title">{config.title}</div>
          {config.subtitle && (
            <div className="base-node__subtitle">{config.subtitle}</div>
          )}
        </div>

        <button
          type="button"
          className="base-node__delete nodrag nopan"
          aria-label={`Delete ${config.title} node`}
          onMouseDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation();
            deleteNode(id);
          }}
        >
          ×
        </button>
      </div>

      {config.description && (
        <div className="base-node__description">{config.description}</div>
      )}

      {fields.length > 0 && (
        <div className="base-node__fields">
          {fields.map((field) => (
            <NodeField
              key={field.name}
              nodeId={id}
              data={data}
              field={field}
            />
          ))}
        </div>
      )}

      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className="node-handle node-handle--source"
          style={{ top: getHandleTop(index, outputs.length) }}
        />
      ))}
    </div>
  );
};
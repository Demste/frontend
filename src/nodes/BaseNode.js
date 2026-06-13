import { Fragment, useEffect, useMemo } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { useStore } from '../store';
import { NodeField } from './NodeField';

const VARIABLE_REGEX = /{{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*}}/g;

const getHandleTop = (index, total) => {
  if (total <= 1) {
    return '50%';
  }

  return `${((index + 1) * 100) / (total + 1)}%`;
};

const clamp = (min, max, value) => {
  return Math.min(Math.max(value, min), max);
};

const extractVariables = (value) => {
  const text = String(value || '');
  const variables = [];
  const seen = new Set();

  for (const match of text.matchAll(VARIABLE_REGEX)) {
    const variableName = match[1];

    if (!seen.has(variableName)) {
      seen.add(variableName);
      variables.push(variableName);
    }
  }

  return variables;
};

const getFieldValue = (data, fields, fieldName) => {
  if (!fieldName) {
    return '';
  }

  const fieldConfig = fields.find((field) => field.name === fieldName);

  return data?.[fieldName] ?? fieldConfig?.defaultValue ?? '';
};

const getAutoNodeSize = (value, autoSizeConfig) => {
  const text = String(value || '');
  const lines = text.split('\n');
  const longestLineLength = Math.max(0, ...lines.map((line) => line.length));

  const minWidth = autoSizeConfig?.minWidth || 248;
  const maxWidth = autoSizeConfig?.maxWidth || 560;
  const minHeight = autoSizeConfig?.minHeight || 112;
  const maxHeight = autoSizeConfig?.maxHeight || 440;

  const calculatedWidth = longestLineLength * 7.5 + 110;
  const calculatedHeight = lines.length * 22 + 150;

  return {
    width: clamp(minWidth, maxWidth, calculatedWidth),
    minHeight: clamp(minHeight, maxHeight, calculatedHeight),
  };
};

export const BaseNode = ({ id, data, config }) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const updateNodeInternals = useUpdateNodeInternals();

  const staticInputs = config.inputs || [];
  const outputs = config.outputs || [];
  const fields = config.fields || [];

  const dynamicInputValue = getFieldValue(
    data,
    fields,
    config.dynamicInputs?.field
  );

  const dynamicInputs = useMemo(() => {
    if (!config.dynamicInputs?.field) {
      return [];
    }

    return extractVariables(dynamicInputValue).map((variable) => ({
      id: `var-${variable}`,
      label: variable,
      dynamic: true,
    }));
  }, [config.dynamicInputs?.field, dynamicInputValue]);

  const inputs = [...staticInputs, ...dynamicInputs];
  const dynamicInputKey = dynamicInputs.map((input) => input.id).join('|');

  const autoSizeValue = getFieldValue(data, fields, config.autoSize?.field);
  const nodeStyle = config.autoSize
    ? getAutoNodeSize(autoSizeValue, config.autoSize)
    : undefined;

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, updateNodeInternals, dynamicInputKey, autoSizeValue]);

  return (
    <div
      className={`base-node base-node--${config.variant || 'default'} ${
        config.type === 'text' ? 'base-node--text' : ''
      }`}
      style={nodeStyle}
    >
      {inputs.map((input, index) => {
        const top = getHandleTop(index, inputs.length);

        return (
          <Fragment key={input.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              className={`node-handle node-handle--target ${
                input.dynamic ? 'node-handle--dynamic' : ''
              }`}
              style={{ top }}
            />

            {input.dynamic && (
              <span
                className="node-handle-label node-handle-label--target"
                style={{ top }}
              >
                {input.label}
              </span>
            )}
          </Fragment>
        );
      })}

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

      {config.description && (
        <div className="base-node__tooltip">{config.description}</div>
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
import { useEffect, useRef } from 'react';
import { useStore } from '../store';

export const NodeField = ({ nodeId, data, field }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textareaRef = useRef(null);

  const value = data?.[field.name] ?? field.defaultValue ?? '';

  const handleChange = (event) => {
    updateNodeField(nodeId, field.name, event.target.value);
  };

  useEffect(() => {
    if (!field.autoResize || !textareaRef.current) {
      return;
    }

    const textarea = textareaRef.current;
    const maxHeight = field.maxTextareaHeight || 260;

    textarea.style.height = 'auto';

    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [field.autoResize, field.maxTextareaHeight, value]);

  if (field.type === 'select') {
    return (
      <label className="node-field">
        <span className="node-field__label">{field.label}</span>
        <select
          className="node-field__control nodrag nopan"
          value={value}
          onChange={handleChange}
        >
          {(field.options || []).map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'textarea') {
    return (
      <label className="node-field">
        <span className="node-field__label">{field.label}</span>
        <textarea
          ref={textareaRef}
          className={`node-field__control node-field__textarea nodrag nopan ${
            field.autoResize ? 'node-field__textarea--auto' : ''
          }`}
          value={value}
          placeholder={field.placeholder}
          onChange={handleChange}
          rows={field.rows || 3}
        />
      </label>
    );
  }

  return (
    <label className="node-field">
      <span className="node-field__label">{field.label}</span>
      <input
        className="node-field__control nodrag nopan"
        type={field.type || 'text'}
        value={value}
        placeholder={field.placeholder}
        onChange={handleChange}
      />
    </label>
  );
};
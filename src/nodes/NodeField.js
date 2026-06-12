import { useStore } from '../store';

export const NodeField = ({ nodeId, data, field }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const value = data?.[field.name] ?? field.defaultValue ?? '';

  const handleChange = (event) => {
    updateNodeField(nodeId, field.name, event.target.value);
  };

  if (field.type === 'select') {
    return (
      <label className="node-field">
        <span className="node-field__label">{field.label}</span>
        <select
          className="node-field__control"
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
          className="node-field__control node-field__textarea"
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
        className="node-field__control"
        type={field.type || 'text'}
        value={value}
        placeholder={field.placeholder}
        onChange={handleChange}
      />
    </label>
  );
};
export const DraggableNode = ({
  type,
  label,
  category,
  description,
  onTooltipShow,
  onTooltipHide,
}) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    onTooltipHide?.();
    event.currentTarget.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onMouseEnter={(event) => {
        onTooltipShow?.(
          { label, category, description },
          event.currentTarget.getBoundingClientRect()
        );
      }}
      onMouseLeave={onTooltipHide}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => {
        event.currentTarget.style.cursor = 'grab';
      }}
      draggable
    >
      <span className="draggable-node__meta">
        <span className="draggable-node__label">{label}</span>
        <span className="draggable-node__badge">{category}</span>
      </span>
      <span className="draggable-node__type">{type}</span>
    </div>
  );
};

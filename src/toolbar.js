import { useCallback, useEffect, useRef, useState } from 'react';
import { DraggableNode } from './draggableNode';
import { toolbarNodeGroups } from './nodes/nodeTypes';

const accentOptions = [
  { id: 'indigo', label: 'Indigo' },
  { id: 'emerald', label: 'Emerald' },
  { id: 'rose', label: 'Rose' },
  { id: 'amber', label: 'Amber' },
];

export const PipelineToolbar = ({
  accent,
  appearance,
  onAccentChange,
  onAppearanceChange,
}) => {
  const tooltipTimeout = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  const hideTooltip = useCallback(() => {
    window.clearTimeout(tooltipTimeout.current);
    setTooltip(null);
  }, []);

  const showTooltip = useCallback((node, rect) => {
    if (!node.description) {
      return;
    }

    window.clearTimeout(tooltipTimeout.current);

    tooltipTimeout.current = window.setTimeout(() => {
      const width = 240;
      const estimatedHeight = 112;
      const gap = 12;
      const viewportPadding = 12;
      let left = rect.right + gap;

      if (left + width > window.innerWidth - viewportPadding) {
        left = rect.left - width - gap;
      }

      const maxLeft = Math.max(
        viewportPadding,
        window.innerWidth - width - viewportPadding
      );
      const maxTop = Math.max(
        viewportPadding,
        window.innerHeight - estimatedHeight - viewportPadding
      );

      left = Math.min(
        Math.max(viewportPadding, left),
        maxLeft
      );

      const top = Math.min(
        Math.max(viewportPadding, rect.top),
        maxTop
      );

      setTooltip({
        ...node,
        style: {
          left,
          top,
          width,
        },
      });
    }, 800);
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(tooltipTimeout.current);
  }, []);

  return (
    <>
      <aside className="pipeline-toolbar">
        <div className="pipeline-toolbar__header">
          <div className="pipeline-toolbar__eyebrow">VectorShift</div>
          <h1 className="pipeline-toolbar__title">AI Pipeline Builder</h1>
          <p className="pipeline-toolbar__description">
            Drag nodes onto the canvas to compose an AI workflow.
          </p>
        </div>

        <section className="customization-panel">
          <div className="customization-panel__header">
            <div>
              <div className="customization-panel__title">Workspace Style</div>
              <div className="customization-panel__description">
                Personalize the canvas appearance and accent color.
              </div>
            </div>
          </div>

          <div className="appearance-toggle" aria-label="Appearance mode">
            <button
              type="button"
              className={`appearance-toggle__button ${
                appearance === 'light'
                  ? 'appearance-toggle__button--active'
                  : ''
              }`}
              onClick={() => onAppearanceChange('light')}
            >
              Light
            </button>

            <button
              type="button"
              className={`appearance-toggle__button ${
                appearance === 'dark'
                  ? 'appearance-toggle__button--active'
                  : ''
              }`}
              onClick={() => onAppearanceChange('dark')}
            >
              Dark
            </button>
          </div>

          <div className="accent-picker">
            <div className="accent-picker__label">Accent Color</div>

            <div className="accent-picker__options">
              {accentOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  title={item.label}
                  className={`theme-swatch theme-swatch--${item.id} ${
                    accent === item.id ? 'theme-swatch--active' : ''
                  }`}
                  aria-label={`Switch to ${item.label} accent`}
                  onClick={() => onAccentChange(item.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <div
          className="pipeline-toolbar__nodes"
          aria-label="Node library"
          onScroll={hideTooltip}
        >
          {toolbarNodeGroups.map((group) => (
            <section className="node-group" key={group.name}>
              <div className="node-group__title">{group.name}</div>

              <div className="node-group__items">
                {group.nodes.map((node) => (
                  <DraggableNode
                    key={node.type}
                    type={node.type}
                    label={node.label}
                    category={node.category}
                    description={node.description}
                    onTooltipShow={showTooltip}
                    onTooltipHide={hideTooltip}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="tips-card" aria-label="Tips">
          <div className="tips-card__title">Tips</div>
          <ul className="tips-card__list">
            <li>Drag nodes to canvas.</li>
            <li>Press Delete to remove selected nodes.</li>
            <li>Use controls to zoom and fit view.</li>
          </ul>
        </section>
      </aside>

      {tooltip && (
        <div className="sidebar-node-tooltip" style={tooltip.style}>
          <div className="sidebar-node-tooltip__header">
            <span>{tooltip.label}</span>
            <span>{tooltip.category}</span>
          </div>
          <div className="sidebar-node-tooltip__description">
            {tooltip.description}
          </div>
        </div>
      )}
    </>
  );
};

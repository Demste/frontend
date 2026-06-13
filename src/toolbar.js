import { DraggableNode } from './draggableNode';
import { toolbarNodes } from './nodes/nodeTypes';

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
  return (
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
              appearance === 'light' ? 'appearance-toggle__button--active' : ''
            }`}
            onClick={() => onAppearanceChange('light')}
          >
            Light
          </button>

          <button
            type="button"
            className={`appearance-toggle__button ${
              appearance === 'dark' ? 'appearance-toggle__button--active' : ''
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

      <div className="pipeline-toolbar__nodes">
        {toolbarNodes.map((node) => (
          <DraggableNode key={node.type} type={node.type} label={node.label} />
        ))}
      </div>
    </aside>
  );
};
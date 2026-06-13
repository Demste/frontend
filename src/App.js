import { useCallback, useEffect, useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('pipeline-accent') || 'indigo';
  });

  const [appearance, setAppearance] = useState(() => {
    return localStorage.getItem('pipeline-appearance') || 'light';
  });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('pipeline-accent', accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem('pipeline-appearance', appearance);
  }, [appearance]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  const showToast = useCallback((message) => {
    setToast(message);
  }, []);

  return (
    <div
      className="app-shell"
      data-accent={accent}
      data-appearance={appearance}
    >
      <PipelineToolbar
        accent={accent}
        appearance={appearance}
        onAccentChange={setAccent}
        onAppearanceChange={setAppearance}
      />

      <main className="pipeline-workspace">
        <PipelineUI />
        <SubmitButton onNotify={showToast} />
      </main>

      <div
        className={`toast-region ${toast ? 'toast-region--visible' : ''}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {toast && <div className="toast-message">{toast}</div>}
      </div>
    </div>
  );
}

export default App;

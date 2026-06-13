import { useEffect, useState } from 'react';
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

  useEffect(() => {
    localStorage.setItem('pipeline-accent', accent);
  }, [accent]);

  useEffect(() => {
    localStorage.setItem('pipeline-appearance', appearance);
  }, [appearance]);

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
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
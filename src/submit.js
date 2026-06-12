// submit.js

export const SubmitButton = () => {
  return (
    <div className="submit-panel">
      <div>
        <div className="submit-panel__title">Ready to validate?</div>
        <div className="submit-panel__description">
          Submit the current pipeline to analyze its structure.
        </div>
      </div>

      <button className="submit-panel__button" type="button">
        Submit Pipeline
      </button>
    </div>
  );
};
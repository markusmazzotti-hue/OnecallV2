import Panel from './Panel.jsx';

export default function DescriptionPanel({ description, onDescriptionChange, constraints, onConstraintsChange }) {
  return (
    <Panel step={5} title="Descrivi la richiesta" accent="orange">
      <div className="oc-textarea-grid">
        <label className="oc-textarea-field">
          <span>Cosa vuoi ottenere?</span>
          <textarea
            maxLength={2000}
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Descrivi brevemente l'intervento, l'obiettivo e le criticita principali."
          />
          <small>{description.length} / 2000</small>
        </label>

        <label className="oc-textarea-field">
          <span>Condizioni particolari</span>
          <textarea
            maxLength={1000}
            value={constraints}
            onChange={(event) => onConstraintsChange(event.target.value)}
            placeholder="Descrivi eventuali vincoli, esigenze, accessi o limiti operativi."
          />
          <small>{constraints.length} / 1000</small>
        </label>
      </div>
    </Panel>
  );
}

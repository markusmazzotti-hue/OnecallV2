import { timingOptions } from '../../config/oneCallConfig.js';
import Icon from './Icon.jsx';
import Panel from './Panel.jsx';

export default function MapPanel({ timing, onTimingChange, location, onLocationChange, site, onSiteChange, survey, onSurveyChange }) {
  return (
    <Panel step={3} title="Dove si trova l'intervento e quando e previsto?" accent="cyan" className="oc-panel--map">
      <div className="oc-map-grid">
        <div className="oc-fieldset">
          <label className="oc-field">
            <span>Localita</span>
            <span className="oc-input-shell">
              <input value={location} onChange={(event) => onLocationChange(event.target.value)} placeholder="Es. Taranto, Genova, BCC" />
              <Icon name="pin" />
            </span>
          </label>

          <label className="oc-field">
            <span>Indirizzo facoltativo</span>
            <span className="oc-input-shell">
              <input value={site} onChange={(event) => onSiteChange(event.target.value)} placeholder="Via, n., stabilimento" />
              <Icon name="search" />
            </span>
          </label>

          <div className="oc-timing" role="radiogroup" aria-label="Tempistica indicativa">
            <span className="oc-field-label">Tempistica indicativa</span>
            <div className="oc-timing__buttons">
              {timingOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`oc-status oc-status--${option.tone} ${timing === option.id ? 'is-selected' : ''}`.trim()}
                  aria-pressed={timing === option.id}
                  onClick={() => onTimingChange(option.id)}
                >
                  <Icon name={option.icon} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <label className="oc-switch">
            <input type="checkbox" checked={survey} onChange={(event) => onSurveyChange(event.target.checked)} />
            <span aria-hidden="true" />
            <strong>Richiedo sopralluogo operativo</strong>
          </label>
        </div>

        <div className="oc-italy-card" aria-label="Mappa Italia">
          <div className="oc-italy-card__grid" aria-hidden="true" />
          <svg className="oc-italy" viewBox="0 0 240 300" role="img" aria-label="Italia stilizzata">
            <path d="M90 14l26 6 22 18-12 22 18 18-4 22 19 20 4 26 25 21 2 23-16 13-25-15-20-28-20-9-18-32-24-8-8-26 12-30-20-16 4-24z" />
            <path d="M70 210l-20 14-21-9 5-25 24-4z" />
            <path d="M155 238l31 10 13 25-14 16-28-3-14-23z" />
          </svg>
          <span className="oc-map-pulse" aria-hidden="true" />
        </div>
      </div>
    </Panel>
  );
}

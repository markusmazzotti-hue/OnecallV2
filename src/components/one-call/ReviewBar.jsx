import { steps } from '../../config/oneCallConfig.js';
import Icon from './Icon.jsx';
import Panel from './Panel.jsx';

export default function ReviewBar({ completed }) {
  return (
    <Panel step={7} title="Riepilogo richiesta" accent="orange" className="oc-review">
      <div className="oc-review__intro">
        <strong>Verifica i dati inseriti</strong>
        <span>Completa gli step e invia la richiesta tecnica.</span>
      </div>

      <div className="oc-review__items">
        {steps.slice(0, 6).map((step) => {
          const done = completed.includes(step.id);

          return (
            <div key={step.id} className={`oc-review-item ${done ? 'is-done' : ''}`.trim()}>
              <Icon name={step.icon} />
              <span>{step.label}</span>
              <small>{done ? 'Completato' : 'Da definire'}</small>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

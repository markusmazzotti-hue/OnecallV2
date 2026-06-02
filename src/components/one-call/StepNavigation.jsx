import { steps } from '../../config/oneCallConfig.js';
import Icon from './Icon.jsx';

export default function StepNavigation({ currentStep = 1, completed = [] }) {
  return (
    <nav className="oc-steps" aria-label="Stato richiesta">
      {steps.map((step) => {
        const isActive = step.number === currentStep;
        const isDone = completed.includes(step.id);

        return (
          <button
            key={step.id}
            type="button"
            className={`oc-step ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`.trim()}
            aria-current={isActive ? 'step' : undefined}
          >
            <span className="oc-step__number">{step.number}</span>
            <Icon name={step.icon} />
            <span className="oc-step__label">{step.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

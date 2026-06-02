import Icon from './Icon.jsx';

export default function CtaButton({ disabled = false, onClick }) {
  return (
    <button className="oc-cta" type="button" disabled={disabled} onClick={onClick}>
      <span className="oc-cta__copy">
        <strong>ATTIVA ONE CALL</strong>
        <span>Invia richiesta tecnica a Palmisano Demolizioni &amp; Taglio Termico</span>
      </span>
      <span className="oc-cta__arrow" aria-hidden="true">
        <Icon name="arrow-right" />
      </span>
    </button>
  );
}

export default function Panel({ step, title, kicker, accent = 'orange', className = '', children }) {
  return (
    <section className={`oc-panel oc-panel--${accent} ${className}`.trim()} aria-labelledby={`panel-${step}`}>
      <div className="oc-panel__corners" aria-hidden="true" />
      <header className="oc-panel__header">
        {step ? <span className="oc-panel__step">STEP {step}</span> : null}
        <div>
          <h2 id={`panel-${step}`}>{title}</h2>
          {kicker ? <p>{kicker}</p> : null}
        </div>
      </header>
      <div className="oc-panel__body">{children}</div>
    </section>
  );
}

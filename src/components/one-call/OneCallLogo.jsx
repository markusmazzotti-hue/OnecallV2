import Icon from './Icon.jsx';

export default function OneCallLogo() {
  return (
    <a className="oc-logo" href="#top" aria-label="Palmisano One Call">
      <span className="oc-logo__mark" aria-hidden="true">
        <Icon name="torch" />
      </span>
      <span className="oc-logo__copy">
        <span className="oc-logo__line">
          <span>PALMISANO</span>
          <span className="oc-logo__one">ONE CALL</span>
          <sup>TM</sup>
        </span>
        <span className="oc-logo__sub">DEMOLIZIONI &amp; TAGLIO TERMICO</span>
      </span>
    </a>
  );
}

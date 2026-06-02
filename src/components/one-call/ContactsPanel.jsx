import Icon from './Icon.jsx';
import Panel from './Panel.jsx';

export default function ContactsPanel({ values, onChange }) {
  const update = (field) => (event) => onChange({ ...values, [field]: event.target.value });

  return (
    <Panel step={6} title="I tuoi contatti" accent="purple">
      <div className="oc-contact-grid">
        <label className="oc-field">
          <span>Nome e cognome</span>
          <span className="oc-input-shell">
            <input value={values.name} onChange={update('name')} placeholder="Es. Mario Rossi" />
            <Icon name="user" />
          </span>
        </label>

        <label className="oc-field">
          <span>Azienda</span>
          <span className="oc-input-shell">
            <input value={values.company} onChange={update('company')} placeholder="Nome azienda" />
            <Icon name="factory" />
          </span>
        </label>

        <label className="oc-field">
          <span>Telefono</span>
          <span className="oc-input-shell">
            <input value={values.phone} onChange={update('phone')} placeholder="Es. +39 333 1234567" inputMode="tel" />
            <Icon name="phone" />
          </span>
        </label>

        <label className="oc-field">
          <span>Email</span>
          <span className="oc-input-shell">
            <input value={values.email} onChange={update('email')} placeholder="Es. nome@azienda.it" inputMode="email" />
            <Icon name="mail" />
          </span>
        </label>
      </div>
    </Panel>
  );
}

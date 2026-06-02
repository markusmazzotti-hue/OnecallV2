import { uploadActions } from '../../config/oneCallConfig.js';
import Icon from './Icon.jsx';
import Panel from './Panel.jsx';

export default function UploadPanel({ completed = [], onAction }) {
  return (
    <Panel step={4} title="Carica foto, video e descrizione audio" accent="cyan">
      <div className="oc-upload-actions">
        {uploadActions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={`oc-icon-button ${completed.includes(action.id) ? 'is-done' : ''}`.trim()}
            onClick={() => onAction(action.id)}
          >
            <Icon name={action.icon} />
            <span>{action.label}</span>
          </button>
        ))}
      </div>
      <p className="oc-help">Puoi caricare piu file alla volta. Formati supportati: JPG, PNG, MP4, MP3.</p>
    </Panel>
  );
}

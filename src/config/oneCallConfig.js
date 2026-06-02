export const steps = [
  { id: 'intervention', number: 1, label: 'Tipo intervento', icon: 'excavator' },
  { id: 'sector', number: 2, label: 'Settore', icon: 'factory' },
  { id: 'place', number: 3, label: 'Dove e quando', icon: 'pin' },
  { id: 'media', number: 4, label: 'Foto, video e audio', icon: 'camera' },
  { id: 'description', number: 5, label: 'Descrizione', icon: 'clipboard' },
  { id: 'contacts', number: 6, label: 'Contatti', icon: 'user' },
  { id: 'summary', number: 7, label: 'Riepilogo', icon: 'check' },
];

export const interventionOptions = [
  { id: 'taglio-termico', label: 'Taglio termico rottami', icon: 'torch' },
  { id: 'smantellamento', label: 'Smantellamento impianti', icon: 'plant' },
  { id: 'ambiente-produttivo', label: 'Intervento in ambiente produttivo', icon: 'gear' },
  { id: 'strip-out', label: 'Strip-out', icon: 'layers' },
  { id: 'caso-complesso', label: 'Caso complesso da valutare', icon: 'clipboard' },
  { id: 'demolizione-industriale', label: 'Demolizione industriale', icon: 'excavator' },
];

export const sectorOptions = [
  { id: 'industria', label: 'Industria', icon: 'factory' },
  { id: 'trader-acciaierie', label: 'Trader e mandatari acciaierie', icon: 'crane' },
  { id: 'acciaieria-fonderia', label: 'Acciaieria e fonderia', icon: 'forge' },
  { id: 'altro', label: 'Altro settore', icon: 'plus' },
  { id: 'commerciale', label: 'Settore commerciale', icon: 'store' },
  { id: 'impianto', label: 'Impianto industriale e sito produttivo', icon: 'plant' },
  { id: 'centro-riciclo', label: 'Centro riciclo rottami', icon: 'recycle' },
];

export const timingOptions = [
  { id: 'urgente', label: 'Urgente', tone: 'red', icon: 'alert' },
  { id: 'breve-termine', label: 'Breve termine', tone: 'orange', icon: 'clock' },
  { id: 'programmabile', label: 'Programmabile', tone: 'lime', icon: 'calendar' },
];

export const uploadActions = [
  { id: 'take-photo', label: 'Scatta foto', icon: 'camera' },
  { id: 'upload-photo', label: 'Carica foto', icon: 'image' },
  { id: 'upload-video', label: 'Carica video', icon: 'video' },
  { id: 'audio', label: 'Audio', icon: 'mic' },
  { id: 'attachments', label: 'Allegati', icon: 'paperclip' },
];

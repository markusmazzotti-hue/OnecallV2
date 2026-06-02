export default function Icon({ name = 'check', className = '', title }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `oc-icon ${className}`.trim(),
    'aria-hidden': title ? undefined : true,
    role: title ? 'img' : undefined,
  };

  const shapes = {
    excavator: <><path d="M4 17h12"/><path d="M7 17l2-6h4l3 6"/><path d="M10 11l4-5 4 5"/><path d="M18 11l3 5"/><circle cx="7" cy="19" r="1.7"/><circle cx="15" cy="19" r="1.7"/></>,
    factory: <><path d="M3 21V9l5 3V9l5 3V6h8v15"/><path d="M7 21v-4h3v4"/><path d="M14 21v-4h3v4"/><path d="M16 6V3h3v3"/></>,
    pin: <><path d="M12 21s7-5.4 7-12a7 7 0 0 0-14 0c0 6.6 7 12 7 12z"/><circle cx="12" cy="9" r="2.4"/></>,
    camera: <><path d="M4 8h4l1.4-2h5.2L16 8h4v11H4z"/><circle cx="12" cy="13.5" r="3.2"/></>,
    clipboard: <><path d="M8 5h8l1 2h3v14H4V7h3z"/><path d="M9 5a3 3 0 0 1 6 0"/><path d="M8 12h8"/><path d="M8 16h6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    check: <><path d="M20 6L9 17l-5-5"/></>,
    torch: <><path d="M10 4h4v6h-4z"/><path d="M12 10v8"/><path d="M8 18h8"/><path d="M15 5l5-2"/><path d="M16 8l4 2"/></>,
    plant: <><path d="M12 21V9"/><path d="M12 11c-4 0-6-2-7-6 4 0 6 2 7 6z"/><path d="M12 13c4 0 6-2 7-6-4 0-6 2-7 6z"/><path d="M5 21h14"/></>,
    gear: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="M4.9 4.9l2.1 2.1"/><path d="M17 17l2.1 2.1"/><path d="M19.1 4.9L17 7"/><path d="M7 17l-2.1 2.1"/></>,
    layers: <><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/></>,
    crane: <><path d="M4 20h16"/><path d="M8 20V5h8v15"/><path d="M8 7h12"/><path d="M20 7v5"/><path d="M18 12h4"/></>,
    forge: <><path d="M4 20h16"/><path d="M7 20V9l5-5 5 5v11"/><path d="M10 20v-6h4v6"/><path d="M6 12h12"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    store: <><path d="M4 10h16l-2-5H6z"/><path d="M5 10v11h14V10"/><path d="M9 21v-6h6v6"/></>,
    recycle: <><path d="M7 7l2-3 3 5H8"/><path d="M17 9l4 1-3 5-2-3"/><path d="M10 18l-3 2-3-5h4"/></>,
    alert: <><path d="M12 3l10 18H2z"/><path d="M12 9v5"/><path d="M12 18h.01"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
    calendar: <><path d="M4 5h16v16H4z"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M4 10h16"/><path d="M8 14h3"/><path d="M13 14h3"/></>,
    image: <><path d="M4 5h16v14H4z"/><circle cx="9" cy="10" r="2"/><path d="M4 17l5-5 4 4 3-3 4 4"/></>,
    video: <><path d="M4 7h11v10H4z"/><path d="M15 11l5-3v8l-5-3z"/></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/><path d="M9 21h6"/></>,
    paperclip: <><path d="M21 11l-8.5 8.5a5 5 0 0 1-7-7L14 4a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4L16 6.6"/></>,
    shield: <><path d="M12 3l8 3v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-5"/></>,
    chevronLeft: <><path d="M15 18l-6-6 6-6"/></>,
    chevronRight: <><path d="M9 6l6 6-6 6"/></>,
    arrowRight: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></>,
    mail: <><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2z"/></>,
  };

  const key = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  return (
    <svg {...common}>
      {title ? <title>{title}</title> : null}
      {shapes[key] || shapes.check}
    </svg>
  );
}

// Small inline animated visuals — one per pack. Pure CSS/SVG, no images.

function Phone() {
  return (
    <div className="pv pv-phone">
      <div className="pv-phone-body">
        <div className="pv-phone-notch" />
        <div className="pv-site">
          <div className="pv-site-nav">
            <i />
            <span />
            <span />
            <span />
          </div>
          <div className="pv-site-hero">
            <b />
            <b className="short" />
            <span className="pv-open">● We're open now</span>
          </div>
          <div className="pv-form">
            <span className="pv-field">Name</span>
            <span className="pv-field">Phone</span>
            <span className="pv-submit">Get a quote</span>
          </div>
          <div className="pv-stars">★★★★★ <small>Google reviews</small></div>
        </div>
        <div className="pv-toast">
          <span className="pv-toast-app">WhatsApp · now</span>
          <strong>New lead from your website</strong>
          <span>Rahul M. — "Need a quote for 500 units"</span>
        </div>
        <div className="pv-toast pv-toast-2">
          <span className="pv-toast-app">Lead sheet · auto</span>
          <strong>Row added + follow-up set for tomorrow</strong>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const bars = [42, 64, 38, 76, 58, 88, 70];
  return (
    <div className="pv pv-dash">
      <div className="pv-dash-head">
        <span>Business at a glance</span>
        <em>Updated 9:00 AM</em>
      </div>
      <div className="pv-kpis">
        <div>
          <small>Revenue (wk)</small>
          <b>$48k</b>
          <i className="up">▲ 12%</i>
        </div>
        <div>
          <small>New leads</small>
          <b>37</b>
          <i className="up">▲ 8</i>
        </div>
        <div>
          <small>Overdue</small>
          <b>$6.2k</b>
          <i className="down">3 clients</i>
        </div>
      </div>
      <div className="pv-bars">
        {bars.map((h, i) => (
          <span key={i} style={{ '--h': `${h}%`, '--d': `${i * 0.08}s` }} />
        ))}
      </div>
      <div className="pv-rows">
        <span className="r">● Low stock — 2 items</span>
        <span className="y">● Follow-ups today — 5</span>
        <span className="g">● Payments received — 9</span>
      </div>
    </div>
  );
}

function Flow() {
  const nodes = [
    { x: 40, y: 50, l: 'Gmail' },
    { x: 170, y: 50, l: 'AI sort' },
    { x: 300, y: 20, l: 'Sheets' },
    { x: 300, y: 82, l: 'WhatsApp' },
  ];
  return (
    <div className="pv pv-flow">
      <svg viewBox="0 0 360 110" className="pv-flow-svg" aria-hidden="true">
        <path d="M70 50 H140" className="pv-wire" />
        <path d="M200 50 C240 50, 240 20, 270 20" className="pv-wire" />
        <path d="M200 50 C240 50, 240 82, 270 82" className="pv-wire" />
        {nodes.map((n) => (
          <g key={n.l} transform={`translate(${n.x},${n.y})`}>
            <rect x="-30" y="-14" width="60" height="28" rx="8" className="pv-node" />
            <text textAnchor="middle" y="4" className="pv-node-t">
              {n.l}
            </text>
          </g>
        ))}
        <circle r="3.5" className="pv-pulse">
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M70 50 H140 M200 50 C240 50, 240 20, 270 20" />
        </circle>
        <circle r="3.5" className="pv-pulse">
          <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path="M70 50 H140 M200 50 C240 50, 240 82, 270 82" />
        </circle>
      </svg>
      <div className="pv-log">
        <span>
          <b>09:14</b> Inquiry tagged <em>Quotation</em> → routed to Sales
        </span>
        <span>
          <b>09:14</b> Draft reply prepared for review
        </span>
        <span>
          <b>09:15</b> Owner notified on WhatsApp
        </span>
      </div>
    </div>
  );
}

function Window() {
  return (
    <div className="pv pv-window">
      <div className="pv-win-bar">
        <i />
        <i />
        <i />
        <span>nuvō · operations</span>
      </div>
      <div className="pv-win-body">
        <aside>
          <span className="on">Inventory</span>
          <span>Billing</span>
          <span>Dealers</span>
          <span>Attendance</span>
          <span>Reports</span>
        </aside>
        <div className="pv-table">
          {['Plywood 18mm', 'Laminate 1mm', 'Edge band', 'MDF 12mm', 'Veneer'].map((r, i) => (
            <div key={r} className="pv-tr" style={{ '--d': `${i * 0.12}s` }}>
              <span>{r}</span>
              <span className="q">{[340, 120, 18, 260, 44][i]}</span>
              <span className={`st ${i === 2 ? 'low' : 'ok'}`}>{i === 2 ? 'Reorder' : 'In stock'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PackVisual({ kind }) {
  if (kind === 'phone') return <Phone />;
  if (kind === 'dashboard') return <Dashboard />;
  if (kind === 'flow') return <Flow />;
  return <Window />;
}

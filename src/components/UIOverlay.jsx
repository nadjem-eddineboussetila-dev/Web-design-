const UIOverlay = () => (
  <div className="overlay">
    <nav className="glass-nav">
      <div className="brand">
        <span className="brand-mark">Aurum</span>
        <span className="brand-sub">Atelier</span>
      </div>
      <div className="nav-links">
        <span>Collection</span>
        <span>Craft</span>
        <span>Heritage</span>
        <span>Concierge</span>
      </div>
    </nav>

    <section className="scroll-section hero">
      <div className="glass-card hero-card">
        <p className="eyebrow">Celestial Chronometry</p>
        <h1>Aurora Éclipse</h1>
        <p className="lead">
          A cinematic mechanical experience. Pure gold, sapphire crystal, and a
          movement engineered for a lifetime of precision.
        </p>
        <div className="hero-meta">
          <div>
            <span className="meta-label">Limited Edition</span>
            <strong>88 pieces</strong>
          </div>
          <div>
            <span className="meta-label">Power Reserve</span>
            <strong>96 hours</strong>
          </div>
          <div>
            <span className="meta-label">Caliber</span>
            <strong>AX-9</strong>
          </div>
        </div>
      </div>
    </section>

    <section className="scroll-section explosion">
      <div className="glass-card feature-card">
        <p className="eyebrow">Exploded View</p>
        <h2>Every component, suspended in light.</h2>
        <p className="lead">
          Scroll to unveil the architecture of the movement. Each component is
          separated to reveal micro-finishing and hand-polished bevels.
        </p>
      </div>
    </section>

    <section className="scroll-section focus">
      <div className="glass-card focus-card">
        <p className="eyebrow">Technical Focus</p>
        <h2>Precision from the inside out.</h2>
        <p className="lead">
          The escapement, mainspring, and balance wheel are tuned to cinematic
          accuracy, with floating labels guiding every mechanism.
        </p>
        <div className="spec-grid">
          <div className="spec-card">
            <span className="meta-label">Case</span>
            <strong>18k Moon Gold</strong>
            <p>High-polish bevels with brushed flanks.</p>
          </div>
          <div className="spec-card">
            <span className="meta-label">Crystal</span>
            <strong>Sapphire Dome</strong>
            <p>Anti-reflective multi-layer coating.</p>
          </div>
          <div className="spec-card">
            <span className="meta-label">Movement</span>
            <strong>Manual Wind</strong>
            <p>Dual-barrel, 28,800 vph performance.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default UIOverlay

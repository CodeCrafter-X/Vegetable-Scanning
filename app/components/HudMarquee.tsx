function TrackContent() {
  return (
    <>
      <span className="hud-item"><span className="hud-dot"></span>AI STATUS: ONLINE</span>
      <span className="hud-sep">/</span>
      <span className="hud-item">MODEL: GEMINI 3.6 FLASH</span>
      <span className="hud-sep">/</span>
      <span className="hud-item">FRESHNESS ENGINE: <span className="hud-live">ACTIVE</span></span>
      <span className="hud-sep">/</span>
      <span className="hud-item">SYNC: <span className="hud-live">REALTIME</span></span>
    </>
  );
}

export default function HudMarquee() {
  return (
    <div className="hud-strip-bar" aria-hidden="true">
      <div className="hud-marquee">
        <div className="hud-track">
          <TrackContent />
        </div>
        <div className="hud-track" aria-hidden="true">
          <TrackContent />
        </div>
      </div>
    </div>
  );
}

import Nav from "./components/Nav";
import HudMarquee from "./components/HudMarquee";
import HeroScanCard from "./components/HeroScanCard";
import ScanUploader from "./components/ScanUploader";
import VoiceSection from "./components/VoiceSection";
import { ScanProvider } from "./components/ScanContext";

export default function Home() {
  return (
    <ScanProvider>
      <Nav />
      <HudMarquee />

      <header className="hero" id="main-content">
        <div className="holo-food-layer" aria-hidden="true">
          <div className="holo-item i1">
            <svg viewBox="0 0 100 100" width="100%" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M28 78C22 60 26 34 46 18c3 10-2 16-2 16s14-4 20 6c-8 22-30 34-36 38Z" />
              <path d="M46 18c-6 8-10 20-8 34" />
            </svg>
            <div className="holo-scan"></div>
          </div>
          <div className="holo-item i2 gold">
            <svg viewBox="0 0 100 100" width="100%" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="50" cy="56" rx="30" ry="26" />
              <path d="M50 30c-2-8 4-14 12-14" />
              <path d="M38 20c4 4 6 8 6 12" />
              <path d="M28 48c14-8 30-8 44 0" />
            </svg>
            <div className="holo-scan"></div>
          </div>
          <div className="holo-item i3">
            <svg viewBox="0 0 100 100" width="100%" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M50 12C34 12 22 26 22 44c0 22 16 34 28 44 12-10 28-22 28-44 0-18-12-32-28-32Z" />
              <path d="M50 12V70" />
            </svg>
            <div className="holo-scan"></div>
          </div>
          <div className="holo-item i4 gold">
            <svg viewBox="0 0 100 100" width="100%" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 30c14-10 30-10 42 2 14 14 14 34 4 44-10 10-30 8-42-6C12 56 10 38 20 30Z" />
              <path d="M20 30c6 2 10 6 12 12" />
            </svg>
            <div className="holo-scan"></div>
          </div>
          <div className="holo-item i5">
            <svg viewBox="0 0 100 100" width="100%" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="54" r="30" />
              <path d="M28 40 72 68M28 68 72 40M50 24v10" />
              <path d="M42 14c2 6 8 8 14 6" />
            </svg>
            <div className="holo-scan"></div>
          </div>
        </div>

        <div className="wrap hero-grid">
          <div>
            <div className="hud-strip">
              <span className="hud-dot"></span>AI ENGINE ONLINE <span className="hud-sep">·</span> GEMINI 3.6 FLASH
            </div>
            <div className="eyebrow">
              <span className="dot"></span> Built for real kitchens
            </div>
            <h1 className="headline">
              Know before it <em>spoils.</em>
            </h1>
            <p className="sub">
              Scan your produce and get an instant AI-predicted freshness and disease read. Less waste, more meals.
            </p>
            <div className="cta-row">
              <a href="#scan" className="action-btn action-primary">
                <span className="action-icon">📷</span>
                <span className="action-label">Scan Food</span>
              </a>
              <a href="#voice" className="action-btn">
                <span className="action-icon">🎤</span>
                <span className="action-label">Ask AI</span>
              </a>
            </div>
          </div>

          <HeroScanCard />
        </div>
      </header>

      <ScanUploader />

      <VoiceSection />

      <section className="section" id="how">
        <div className="wrap">
          <div className="section-head">
            <div className="section-tag">How it works</div>
            <h2>Three steps, no guesswork.</h2>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <span className="feature-num">01</span>
              <h3>Upload a photo</h3>
              <p>Drop in a clear, well-lit photo of a single vegetable or fruit.</p>
            </div>
            <div className="feature-card">
              <span className="feature-num">02</span>
              <h3>AI reads it</h3>
              <p>Confirms it&apos;s produce, scores freshness, and checks for disease symptoms.</p>
            </div>
            <div className="feature-card">
              <span className="feature-num">03</span>
              <h3>Get a verdict</h3>
              <p>A freshness score, disease flag if any, and one clear recommendation.</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <p className="mono">Smart Kitchen AI — built to waste less, eat safer.</p>
        </div>
      </footer>
    </ScanProvider>
  );
}

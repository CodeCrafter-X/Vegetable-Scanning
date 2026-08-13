"use client";

import { useRef, useState } from "react";
import { useScan } from "./ScanContext";

export default function ScanUploader() {
  const { result, setResult, scanning, setScanning } = useScan();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    setError(null);
    setResult(null);
    setPreview(URL.createObjectURL(file));
    setScanning(true);
    try {
      const imageBase64 = await fileToBase64(file);
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64, mimeType: file.type }),
      });
      if (res.status === 429) {
        setError("Scanner is busy right now — please try again in a few seconds.");
        return;
      }
      if (!res.ok) throw new Error("Scan failed");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Something went wrong analyzing that photo. Try again.");
    } finally {
      setScanning(false);
    }
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section className="section" id="scan">
      <div className="wrap">
        <div className="scanner-shell">
          <div className="section-tag">AI Food Scanner</div>
          <h2>Know what&apos;s safe to eat, before you eat it.</h2>
          <p className="sub">
            Upload a photo — the AI confirms it&apos;s produce, scores freshness, and checks for disease.
          </p>

          <div className="scan-flow" aria-hidden="true">
            <div className="scan-flow-step"><span className="sf-icon">📷</span>Scan</div>
            <div className="scan-flow-arrow">→</div>
            <div className="scan-flow-step"><span className="sf-icon">🤖</span>AI Analysis</div>
            <div className="scan-flow-arrow">→</div>
            <div className="scan-flow-step"><span className="sf-icon">🩺</span>Disease Check</div>
            <div className="scan-flow-arrow">→</div>
            <div className="scan-flow-step"><span className="sf-icon">✅</span>Result</div>
          </div>

          <div className="scanner-grid">
            <div>
              <label
                className={`dropzone ${dragging ? "dragover" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFile(file);
                }}
              >
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={preview} alt="Uploaded produce" />
                ) : (
                  <>
                    <svg className="dz-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 16.5V19a2 2 0 002 2h12a2 2 0 002-2v-2.5M7.5 9L12 4.5 16.5 9M12 4.5V16" />
                    </svg>
                    <div className="dz-text">Click to upload a photo</div>
                    <div className="dz-sub">JPG or PNG · any vegetable or fruit</div>
                  </>
                )}
                <input
                  id="scanInput"
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>

              {preview && (
                <div className="scan-mode-row">
                  <button type="button" className="camera-toggle-btn" onClick={() => inputRef.current?.click()}>
                    🔄 Upload another
                  </button>
                  <button type="button" className="camera-toggle-btn" onClick={reset}>
                    ✕ Clear
                  </button>
                </div>
              )}
            </div>

            <div className="result-panel" aria-live="polite">
              {!error && !result && !scanning && (
                <div className="result-empty">
                  <div>
                    <div className="result-panel-tag">AI Food Scanner</div>
                    <div className="result-panel-tagline">Scan it → know what&apos;s safe to eat.</div>
                    <div style={{ opacity: 0.7 }}>Upload a photo to see the freshness read here.</div>
                  </div>
                </div>
              )}

              {scanning && (
                <div className="result-empty">Reading the image…</div>
              )}

              {error && (
                <div className="result-empty" style={{ color: "var(--ripe)" }}>{error}</div>
              )}

              {!scanning && !error && result && !result.isVegetableOrFruit && (
                <div className="not-produce">
                  <div className="icon">🚫</div>
                  <div className="result-item-name">Not a vegetable or fruit</div>
                  <p className="result-condition">{result.detectedItem}</p>
                </div>
              )}

              {!scanning && !error && result && result.isVegetableOrFruit && (
                <>
                  <div className="result-header">
                    <div>
                      <div className="result-item-name">{result.detectedItem}</div>
                      <div className="result-condition">{result.condition} · {result.freshnessScore}% fresh</div>
                      {result.diseaseDetected ? (
                        <span className="badge bad">⚠ {result.diseaseName}</span>
                      ) : (
                        <span className="badge ok">✓ No disease detected</span>
                      )}
                    </div>
                  </div>
                  {result.diseaseSymptoms && (
                    <p className="result-condition" style={{ marginTop: 4, marginBottom: 10 }}>
                      {result.diseaseSymptoms}
                    </p>
                  )}
                  <div className="result-recommendation">{result.recommendation}</div>
                </>
              )}
            </div>
          </div>

          <div className="scanner-note">
            Works best on a clear, well-lit photo of a single item. The AI will tell you if what you uploaded
            isn&apos;t a vegetable or fruit at all.
          </div>
        </div>
      </div>
    </section>
  );
}

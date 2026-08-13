"use client";

import { useScan } from "./ScanContext";

const CIRCUMFERENCE = 326; // matches original CSS stroke-dasharray:326

export default function HeroScanCard() {
  const { result, scanning } = useScan();

  const score = result?.isVegetableOrFruit ? result.freshnessScore : 0;
  const dashoffset = CIRCUMFERENCE - (Math.max(0, Math.min(100, score)) / 100) * CIRCUMFERENCE;

  const label = !result
    ? "Upload a photo to begin"
    : !result.isVegetableOrFruit
    ? `Not produce · ${result.detectedItem}`
    : result.diseaseDetected
    ? `Disease flagged · ${result.diseaseName}`
    : `Fresh · good for consumption`;

  const topRight = scanning ? "Analyzing…" : result ? result.detectedItem : "Awaiting scan";

  return (
    <div className="scan-card">
      <span className="hud-corner hud-corner-tl" aria-hidden="true"></span>
      <span className="hud-corner hud-corner-tr" aria-hidden="true"></span>
      <span className="hud-corner hud-corner-bl" aria-hidden="true"></span>
      <span className="hud-corner hud-corner-br" aria-hidden="true"></span>

      <div className="scan-top">
        <span>SCAN RESULT</span>
        <span className="mono" style={{ textTransform: "capitalize" }}>{topRight}</span>
      </div>

      <div className="produce-visual">
        <svg className="freshness-ring" width="120" height="120" viewBox="0 0 120 120">
          <circle className="ring-track" cx="60" cy="60" r="52"></circle>
          <circle
            className="ring-fill"
            cx="60"
            cy="60"
            r="52"
            style={{ strokeDashoffset: dashoffset }}
          ></circle>
        </svg>
        <div className="ring-center">
          <span className="freshness-num">{result?.isVegetableOrFruit ? `${score}%` : "0%"}</span>
        </div>
      </div>

      <div className="freshness-bar">
        <div className="freshness-fill" style={{ width: `${score}%` }}></div>
      </div>

      <div className="scan-label">
        <b>{label}</b>
      </div>
    </div>
  );
}

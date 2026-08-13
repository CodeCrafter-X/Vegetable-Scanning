"use client";

import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div className="brand">
          <svg className="brand-mark" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <circle cx="13" cy="13" r="12" stroke="var(--leaf)" strokeWidth="1.6" />
            <path
              d="M13 6C13 6 8 9.5 8 14C8 16.76 10.24 19 13 19C15.76 19 18 16.76 18 14C18 9.5 13 6 13 6Z"
              fill="var(--leaf)"
            />
          </svg>
          <span className="brand-text">Smart Kitchen AI</span>
        </div>

        <div className={`nav-links ${open ? "open" : ""}`} id="navLinks">
          <a href="#scan" onClick={() => setOpen(false)}>AI Food Scanner</a>
          <a href="#voice" onClick={() => setOpen(false)}>Voice</a>
          <a href="#how" onClick={() => setOpen(false)}>Features</a>
        </div>

        <button
          className={`nav-burger ${open ? "open" : ""}`}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="lang-toggle" role="group" aria-label="Choose language">
          <button className="active" aria-pressed="true">EN</button>
        </div>
      </div>
    </nav>
  );
}

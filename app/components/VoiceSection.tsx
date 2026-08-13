"use client";

import { useState } from "react";

const SAMPLE_COMMANDS = [
  "Add 2 kg of tomatoes",
  "What expires today?",
  "How long can cooked rice stay outside?",
  "How should I store strawberries?",
  "Is my last scan safe to eat?",
];

const RESPONSES: Record<string, string> = {
  "Add 2 kg of tomatoes": "Got it — added 2 kg of tomatoes to your pantry, estimated shelf life 6 days.",
  "What expires today?": "Nothing logged is expiring today. Scan an item to start tracking it.",
  "How long can cooked rice stay outside?": "Cooked rice shouldn't sit at room temperature for more than 2 hours — refrigerate it promptly to avoid bacterial growth.",
  "How should I store strawberries?": "Keep strawberries unwashed in the fridge, and only rinse right before eating — moisture speeds up spoilage.",
  "Is my last scan safe to eat?": "Scan a photo above first and I'll tell you whether it's safe based on the freshness read.",
};

export default function VoiceSection() {
  const [messages, setMessages] = useState<{ who: "you" | "ai"; text: string }[]>([]);
  const [supported] = useState(
    () => typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
  );

  const ask = (cmd: string) => {
    setMessages((m) => [
      ...m,
      { who: "you", text: cmd },
      { who: "ai", text: RESPONSES[cmd] ?? "I heard you — that feature is still being wired up." },
    ]);
  };

  return (
    <section className="section" id="voice">
      <div className="wrap">
        <div className="voice-shell">
          <div className="section-tag">Voice Assistant</div>
          <h2>Ask it, don&apos;t type it.</h2>
          <p className="sub">
            Tap the mic or try one of the sample commands below to see how the assistant responds.
          </p>

          <div className="mic-wrap">
            <div className="mic-radar">
              <button className="mic-btn" aria-label="Start voice command" onClick={() => ask(SAMPLE_COMMANDS[4])}>
                🎤
              </button>
            </div>
            <div className="mic-hint">Tap to speak</div>
          </div>

          <div className="voice-panel">
            {messages.map((m, i) => (
              <div key={i} className={`voice-bubble ${m.who}`}>
                <div className="who">{m.who === "you" ? "You" : "Assistant"}</div>
                <span>{m.text}</span>
              </div>
            ))}
          </div>

          <div className="voice-suggestions">
            {SAMPLE_COMMANDS.map((cmd) => (
              <button key={cmd} className="voice-chip" onClick={() => ask(cmd)}>
                &ldquo;{cmd}&rdquo;
              </button>
            ))}
          </div>

          {!supported && (
            <div className="voice-unsupported">
              Voice recognition isn&apos;t supported in this browser — try Chrome or Edge. You can still tap the
              sample commands above to see how the assistant responds.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

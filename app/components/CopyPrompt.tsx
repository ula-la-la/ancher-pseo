"use client";

import { useState } from "react";

export function CopyPrompt({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="primary-button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {
          // Clipboard unavailable — the prompt is visible on the page anyway.
        }
      }}
    >
      {done ? "Copied" : "Copy prompt"} <span>⧉</span>
    </button>
  );
}

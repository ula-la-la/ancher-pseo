"use client";

import { useState } from "react";
import { copyText } from "../lib/copyText";

export function CopyPrompt({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="primary-button"
      onClick={async () => {
        if (await copyText(text)) {
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        }
      }}
    >
      {done ? "Copied" : "Copy prompt"} <span>⧉</span>
    </button>
  );
}

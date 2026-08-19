type ClipboardLike = { writeText(text: string): Promise<void> };

type CopyTextOptions = {
  clipboard?: ClipboardLike | null;
  fallback?: (text: string) => boolean;
};

function copyWithSelection(text: string) {
  if (typeof document === "undefined") return false;
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  return copied;
}

export async function copyText(text: string, options: CopyTextOptions = {}) {
  const clipboard = options.clipboard ?? (typeof navigator === "undefined" ? null : navigator.clipboard);
  if (clipboard) {
    try {
      await clipboard.writeText(text);
      return true;
    } catch {
      // Some embedded browsers expose the API but deny writes.
    }
  }
  return (options.fallback ?? copyWithSelection)(text);
}

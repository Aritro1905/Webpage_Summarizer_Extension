export function preprocessText(text) {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 5000); // safety limit
}

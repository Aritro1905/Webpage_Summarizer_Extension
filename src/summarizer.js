export function summarizeText(text) {
  if (!text) return "No content found.";

  const sentences = text.split(". ");
  return sentences.slice(0, 5).join(". ") + ".";
}

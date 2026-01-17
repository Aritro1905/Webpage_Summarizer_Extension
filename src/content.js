console.log("Content script is running");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);
  if (request.action === "SUMMARIZE") {
    try {
      const stopWords = new Set([
        "a",
        "an",
        "and",
        "are",
        "as",
        "at",
        "be",
        "but",
        "by",
        "for",
        "if",
        "in",
        "into",
        "is",
        "it",
        "no",
        "not",
        "of",
        "on",
        "or",
        "such",
        "that",
        "the",
        "to",
        "was",
        "will",
        "with",
        "this",
        "these",
        "those",
        "what",
        "which",
        "who",
        "why",
        "when",
        "where",
        "how",
      ]);

      const text = document.body.innerText;

      // Extract sentences while preserving punctuation
      const sentences = (text.match(/[^.!?]*[.!?]/g) || [])
        .map((s) => {
          const cleaned = s.trim();
          if (!cleaned || cleaned.length < 20) return null;
          return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
        })
        .filter((s) => s !== null);

      if (sentences.length === 0) {
        sendResponse({ summary: "No content found." });
        return true;
      }

      // Calculate word frequency
      const wordFreq = {};
      sentences.forEach((sentence) => {
        const words = sentence.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
        words.forEach((word) => {
          if (!stopWords.has(word)) {
            wordFreq[word] = (wordFreq[word] || 0) + 1;
          }
        });
      });

      // Score sentences
      const scored = sentences.map((sentence, index) => {
        const words = sentence.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
        let score = 0;
        words.forEach((word) => {
          if (wordFreq[word]) score += wordFreq[word];
        });
        return { sentence, score, index };
      });

      // Get top 5 by score, then sort back to original order
      const summary = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .sort((a, b) => a.index - b.index)
        .map((s) => s.sentence)
        .join(" ");

      console.log("Sending summary:", summary);
      sendResponse({ summary: summary || "No content found." });
    } catch (e) {
      console.error("Error in summarize:", e);
      sendResponse({ summary: "Error: " + e.message });
    }
    return true;
  }
});

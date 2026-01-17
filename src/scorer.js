// src/scorer.js
import { STOP_WORDS } from "./stopwords.js";

/**
 * Scores sentences using word-frequency based NLP
 * @param {string[]} sentences
 * @returns {{ sentence: string, score: number }[]}
 */
export function scoreSentences(sentences) {
  const wordFreq = {};

  sentences.forEach(sentence => {
    const words = sentence
      .toLowerCase()
      .match(/\b[a-z]{2,}\b/g);

    if (!words) return;

    words.forEach(word => {
      if (!STOP_WORDS.has(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });
  });

  return sentences.map(sentence => {
    let score = 0;

    const words = sentence
      .toLowerCase()
      .match(/\b[a-z]{2,}\b/g);

    if (words) {
      words.forEach(word => {
        if (wordFreq[word]) score += wordFreq[word];
      });
    }

    return { sentence, score };
  });
}

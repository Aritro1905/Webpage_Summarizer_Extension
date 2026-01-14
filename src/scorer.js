/**
 * Scores sentences based on word frequency
 * @param {string[]} sentences
 * @returns {Object[]} [{ sentence, score }]
 */
import { STOP_WORDS } from "./stopwords";
function sentenceScorer {
    const freq = {}
        sentences.forEach(sentence => {
        sentence
            .toLowerCase()
            .replace(/[^a-z\s]/g, '')
            .split(' ')
            .forEach(word => {
                if (word && !stopWords.has(word)) {
                    freq[word] = (freq[word] || 0) + 1;
                }
            });
    });

    return sentences.map(sentence => {
        let score = 0;
        sentence
            .toLowerCase()
            .replace(/[^a-z\s]/g, '')
            .split(' ')
            .forEach(word => {
                if (freq[word]) score += freq[word];
            });
            const words = sentence.split(' ').length;
            if (words > 0) score = score / words;
            const positionWeight = 1 / (index + 1);
            score = score * (1 + positionWeight);
            return { sentence, score };
    });
}

export { scoreSentences };

import { extractPageText } from './extractor.js';
import { splitIntoSentences } from './preprocessor.js';

function getProcessedSentences() {
    const rawText = extractPageText();
    return splitIntoSentences(rawText);
}

export { getProcessedSentences };
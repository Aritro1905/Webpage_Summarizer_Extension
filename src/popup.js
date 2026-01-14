import { generateSummary } from './src/summarizer.js';

document.getElementById('summarizeBtn').addEventListener('click', () => {
    const summary = generateSummary(5);

    const output = document.getElementById('output');
    output.textContent = summary;
    output.classList.remove('hidden');
});
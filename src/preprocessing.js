function splitIntoSentences(text) {
    return text
        .replace(/\s+/g, ' ')
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 40);
}

export { splitIntoSentences };
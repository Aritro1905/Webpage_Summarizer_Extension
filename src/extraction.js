function extractPageText()
{
    const unwanted_tags = ['NAV', 'FOOTER', 'ASIDE', 'SCRIPT', 'STYLE'];
    unwanted_tags.forEach(tag => {
        document.querySelectorAll(tag).forEach(el => el.remove());
    });
    const paragraphs = document.querySelectorAll('p');
    const text = paragraphs
        .map(p => p.innerText.trim())
        .filter(t => t.length > 50)
        .join('\n\n');
    return text;
}

export { extractPageText };
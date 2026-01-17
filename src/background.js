import { summarizeText } from "./summarizer.js";

console.log("Background service worker running");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "SUMMARIZE_PAGE") {
    const summary = summarizeText(request.text, 5);
    sendResponse({ summary });
  }
  return true;
}); 
document.getElementById("btn").addEventListener("click", () => {
  const result = document.getElementById("result");
  result.textContent = "Loading...";
  result.classList.add("show");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) {
      result.textContent = "Error: No active tab";
      return;
    }

    chrome.tabs.sendMessage(tabs[0].id, { action: "SUMMARIZE" }, (res) => {
      // Check for errors FIRST
      if (chrome.runtime.lastError) {
        console.error("Error:", chrome.runtime.lastError);
        result.textContent =
          "Error: Content script not loaded. Try refreshing the page.";
        return;
      }

      // Then check response
      if (res && res.summary) {
        result.textContent = res.summary;
      } else {
        result.textContent = "Error: No response from page.";
      }
    });
  });
});

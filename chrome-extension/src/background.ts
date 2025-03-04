// In background.ts
console.log("running background.ts");
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === "complete" && tab.url?.endsWith("/user")) {
//     // This is the final redirect after successful authentication
//     // Close the auth tab

//     // Notify the popup to update its state
//     chrome.runtime.sendMessage({ type: "AUTH_SUCCESS" });
//     console.log(tabId);

//     // chrome.tabs.remove(tabId);
//   }
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // TODO: change tab.url? === "https://spotify.parthkansara.com/user"
  // TODO: update manifest.json > "host_permissions": ["https://frontend_url/*", "https://server_url/*"]
  if (changeInfo.status === "complete" && tab.url?.endsWith("/user")) {
    chrome.storage.local.set({ isLoggedIn: true }, () => {
      console.log("Authentication state saved");
    });
    chrome.tabs.remove(tabId);
  }
});

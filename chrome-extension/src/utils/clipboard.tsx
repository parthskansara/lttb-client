export const getSongUriFromClipboard = async (): Promise<string> => {
  try {
    if (!navigator.clipboard) {
      throw new Error("Clipboard not found in this browser");
    }
    const clipboardText = await navigator.clipboard.readText();
    if (!clipboardText.startsWith("https://open.spotify.com/track/")) {
      throw new Error("Incorrect link copied.");
    }
    let trackId = clipboardText.replace("https://open.spotify.com/track/", "");
    if (trackId.includes("?")) {
      trackId = trackId.split("?")[0];
    }
    return `spotify:track:${trackId}`;
  } catch (error) {
    console.error("Failed to read the copied content: ", error);
    throw new Error("Unable to read clipboard data.");
  }
};

export const writeToClipboard = async () => {
  try {
    if (!navigator.clipboard) {
      throw new Error("Clipboard not found in this browser");
    }
    const clipboardText = "Chrome extension link: here";
    await navigator.clipboard.writeText(clipboardText);
  } catch (error) {
    console.error("Failed to copy content: ", error);
    throw new Error("Unable to copy.");
  }
};

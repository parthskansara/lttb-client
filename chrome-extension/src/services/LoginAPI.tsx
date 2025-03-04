interface AuthorizationCodeParams {
  code: string;
}

const apiUrl = import.meta.env.VITE_SERVER_URL || "";

const getLoginUrl = async () => {
  try {
    console.log(`Fetching ${apiUrl}/api/login`);
    const response = await fetch(`${apiUrl}/api/login`);
    if (!response.ok) {
      throw new Error("Network error");
    }
    const data = await response.json();
    return data.url;
  } catch (err) {
    console.error("Error: ");
    throw err;
  }
};

const getAccessToken = async (code: AuthorizationCodeParams) => {
  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
    if (!response.ok) {
      throw new Error("Network error");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error: ");
    throw err;
  }
};

const logOut = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/logout`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Error logging out");
    }
    await response.json();
    // Update local storage
    chrome.storage.local.set({ isLoggedIn: false });
  } catch (err) {
    console.error("Error: ", err);
    throw err;
  }
};

export default { getLoginUrl, getAccessToken, logOut };

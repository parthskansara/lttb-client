interface AuthorizationCodeParams {
  code: string;
}

const getLoginUrl = async () => {
  try {
    const response = await fetch("/api/login");
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
    const response = await fetch("/api/login", {
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
    const response = await fetch("/api/logout", { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Error logging out");
    }
    await response.json();

    window.location.href = "/";
  } catch (err) {
    console.error("Error: ");
    throw err;
  }
};

export default { getLoginUrl, getAccessToken, logOut };

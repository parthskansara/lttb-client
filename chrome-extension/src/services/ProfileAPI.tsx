const apiUrl = import.meta.env.VITE_SERVER_URL || "";
const getUserProfile = async () => {
  console.log("Fetching User Profile");
  try {
    const response = await fetch(`${apiUrl}/api/profile`);
    if (response.status === 401) {
      return response.json().then(() => {
        window.location.href = "/";
      });
    }
    if (!response.ok) {
      throw new Error("Network error");
    }
    const data = await response.json();
    console.log("Logging in ProfileAPI: ", data);
    return data;
  } catch (err) {
    console.error("Error: ", err);
    throw err;
  }
};

const getTopArtists = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/profile/artists`);
    if (response.status === 401) {
      return response.json().then(() => {
        window.location.href = "/";
      });
    }

    if (!response.ok) {
      throw new Error("Network Error");
    }

    const data = await response.json();
    console.log("Logging artists in ProfileAPI: ", data.items);
    return data.items;
  } catch (err) {
    console.error("Error in ProfileAPI: ", err);
    throw err;
  }
};

const getFollowers = async (refreshFollowers: boolean) => {
  try {
    const response = await fetch(
      `${apiUrl}/api/follower?refresh=${refreshFollowers}`
    );
    if (response.status === 401) {
      return response.json().then(() => {
        window.location.href = "/";
      });
    }

    if (!response.ok) {
      throw new Error("Network Error");
    }

    const data = await response.json();
    console.log("Logging followers in ProfileAPI: ", data);
    return data;
  } catch (err) {
    console.error("Error in ProfileAPI: ", err);
    throw err;
  }
};

export default { getUserProfile, getTopArtists, getFollowers };

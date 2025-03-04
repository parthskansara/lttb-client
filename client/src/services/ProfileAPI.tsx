const getUserProfile = async () => {
  try {
    const response = await fetch("/api/profile");
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
    console.error("Error: ");
    throw err;
  }
};

const getTopArtists = async () => {
  try {
    const response = await fetch("/api/profile/artists");
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

const getFollowers = async () => {
  try {
    const response = await fetch("/api/follower");
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

const apiUrl = import.meta.env.VITE_SERVER_URL || "";

interface PlaylistData {
  followerUserId: string;
  songUri: string;
}

export const createPlaylistForFollower = async (data: PlaylistData) => {
  try {
    const response = await fetch(`${apiUrl}/api/playlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Network Error");
    }

    return result;
  } catch (err) {
    console.error("Error in UserAPI: ", err);
    throw err;
  }
};

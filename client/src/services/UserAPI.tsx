interface PlaylistData {
  followerUserId: string;
  songUri: string;
}

export const createPlaylistForFollower = async (data: PlaylistData) => {
  try {
    const response = await fetch("/api/playlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network error");
    }
    const result: string = await response.json();
    return result;
  } catch (err) {
    console.error("Error in UserAPI: ", err);
    throw err;
  }
};

import { useEffect, useState } from "react";
import ProfileAPI from "../services/ProfileAPI.tsx";
import { createPlaylistForFollower } from "../services/UserAPI.tsx";
import { getSongUriFromClipboard } from "../utils/clipboard";

interface Followers {
  followerName: string;
  followerId: string;
}

const FollowersPanel = () => {
  const [followers, setFollowers] = useState<Followers[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState("");
  useEffect(() => {
    const getFollowers = async () => {
      try {
        setIsLoading(true);
        const data = await ProfileAPI.getFollowers();
        setFollowers(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching top artists");
      }
    };
    getFollowers();
  }, []);

  const handleShare = async (followerUserId: string) => {
    setIsCreatingPlaylist(followerUserId);
    try {
      const songUri = await getSongUriFromClipboard();
      console.log(`Sharing ${songUri} with ${followerUserId}`);
      const data = { followerUserId: followerUserId, songUri: songUri };
      const response = await createPlaylistForFollower(data);
      console.log("Playlist created successfully: ", response);
    } catch (err) {
      console.error("Error creating playlist: ", err);
    } finally {
      setIsCreatingPlaylist("");
    }
  };

  return (
    <>
      {isLoading ? (
        <h3>Loading followers.. </h3>
      ) : (
        <>
          <h2 className="mt-8">Start sharing music with your followers: </h2>
          <div className="overflow-auto w-[500px] mx-auto grid grid-cols-2 gap-1">
            {followers.map((follower) => (
              <div
                key={follower.followerId}
                onClick={() => handleShare(follower.followerId)}
                className="mx-auto my-2 p-2 rounded-xl"
              >
                <button
                  className={`${
                    isCreatingPlaylist === follower.followerId
                      ? `bg-black`
                      : `bg-spotify-green`
                  } px-4 text-xs w-[200px]`}
                >
                  {isCreatingPlaylist === follower.followerId
                    ? "Sharing song..."
                    : follower.followerName.length > 20
                    ? follower.followerName.substring(0, 20) + "..."
                    : follower.followerName}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default FollowersPanel;

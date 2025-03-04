import { useEffect, useState } from "react";
import ProfileAPI from "../services/ProfileAPI.tsx";
import { createPlaylistForFollower } from "../services/UserAPI.tsx";
import { getSongUriFromClipboard } from "../utils/clipboard";
import Toast from "./Toast.tsx";
import { Circles } from "react-loader-spinner";
import { IoMdRefresh } from "react-icons/io";

interface Followers {
  followerName: string;
  followerId: string;
}

const FollowersPanel = () => {
  const [followers, setFollowers] = useState<Followers[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareCompleted, setShareCompleted] = useState("");
  const [toastMessage, setToastMessage] = useState({
    category: "",
    message: "",
    submessage: "",
  });
  const [showToast, setShowToast] = useState(false);

  const closeToast = () => {
    setShowToast(false);
  };

  const getFollowers = async (refreshFollowers: boolean) => {
    try {
      setIsLoading(true);
      const data = await ProfileAPI.getFollowers(refreshFollowers);
      setFollowers(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching top artists");
    }
  };

  useEffect(() => {
    getFollowers(false);
  }, []);

  const handleShare = async (followerUserId: string) => {
    // setIsCreatingPlaylist(followerUserId);
    let songUri;

    songUri = await getSongUriFromClipboard().catch(() => {
      setToastMessage({
        category: "clipboard",
        message:
          "It seems the text that you've copied isn't a valid song link from Spotify.",
        submessage:
          "Go to the song you want to share > Click on ... > Share > Copy Song Link. Then come back to this extension and click on the name of your follower you want to share the song to.",
      });
      setShowToast(true);
      console.error("Invalid song link copied!");
    });

    if (songUri) {
      console.log(`Sharing ${songUri} with ${followerUserId}`);
      const data = { followerUserId: followerUserId, songUri: songUri };
      const response = await createPlaylistForFollower(data)
        .then(() => {
          setShareCompleted(followerUserId);
          setTimeout(() => {
            setShareCompleted("");
          }, 2500);
        })
        .catch((err) => {
          setToastMessage({
            category: "user",
            message: "Couldn't create playlist, try again!",
            submessage: String(err),
          });
          setShowToast(true);
          console.error("THIS IS THE ERROR: ", err);
        });
      console.log("Playlist created successfully: ", response);
    }
  };

  const truncateString = (displayString: string) => {
    return displayString.substring(0, 20) + "...";
  };

  const handleRefresh = async () => {
    await getFollowers(true);
  };

  return (
    <>
      {isLoading || !followers ? (
        <div className="flex flex-col items-center my-4">
          <Circles height={20} />
          <h2>Loading followers</h2>
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-between mt-4">
            <div className="flex-grow"></div>
            <h2 className="flex-grow text-center">
              Start sharing music with your followers:{" "}
            </h2>
            <div className="flex-grow flex justify-end" onClick={handleRefresh}>
              <IoMdRefresh size="18px" className="text-spotify-green" />
            </div>
          </div>
          {showToast && (
            <Toast
              category={toastMessage.category}
              message={toastMessage.message}
              submessage={toastMessage.submessage}
              closeToast={closeToast}
            />
          )}
          <div className="overflow-auto w-[500px] mx-auto grid grid-cols-2 gap-1">
            {followers.map((follower) => (
              <div
                key={follower?.followerId}
                onClick={() => handleShare(follower?.followerId)}
                className="mx-auto my-2 p-2 rounded-xl"
              >
                {/* <button
                  className={`${
                    isCreatingPlaylist === follower?.followerId
                      ? `bg-black`
                      : playlistCreationError === follower?.followerId
                      ? `bg-red-700`
                      : `bg-spotify-green`
                  } px-4 text-xs w-[200px]`}
                > */}
                <button
                  className={`${
                    shareCompleted === follower.followerId
                      ? `bg-green-950`
                      : `bg-spotify-green`
                  }  px-4 text-xs w-[200px]`}
                >
                  {shareCompleted === follower.followerId
                    ? "Shared! ❤️"
                    : follower?.followerName?.length > 20
                    ? truncateString(follower.followerName)
                    : follower?.followerName}
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

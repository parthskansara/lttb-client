import { useEffect, useState } from "react";
import ProfileAPI from "../services/ProfileAPI";
import LoginAPI from "../services/LoginAPI";
import FollowersPanel from "../components/FollowersPanel";
import { Circles } from "react-loader-spinner";
import Toast from "../components/Toast";

const UserPage = () => {
  interface ProfileData {
    images: { url: string }[];
    display_name: string;
  }

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    category: "",
    message: "",
    submessage: "",
  });
  const [showToast, setShowToast] = useState(false);
  const closeToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    console.log("Here2");
    const getProfileData = async () => {
      try {
        const data = await ProfileAPI.getUserProfile();
        setProfileData(data);
      } catch (err) {
        console.error("Error fetching token");
      }
    };
    getProfileData();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await LoginAPI.logOut();
    } catch (err) {
      setToastMessage({
        category: "logout",
        message: "Unable to log out :(",
        submessage: "Please try again!",
      });
      setShowToast(true);
      console.error("Error logging out, please try again!");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {showToast && (
        <Toast
          category={toastMessage.category}
          message={toastMessage.message}
          submessage={toastMessage.submessage}
          closeToast={closeToast}
        />
      )}
      {profileData && (
        <>
          <div className="image-container w-[100px] h-[100px] overflow-hidden rounded-full inline-block align-middle">
            <img
              src={profileData?.images?.[0].url}
              className="w-[100%] h-[100%] object-cover object-center"
            />
          </div>
          <h1 className="inline-block mx-4 align-middle">
            Hey {profileData?.display_name?.split(" ")[0]}!
          </h1>
          {/* <ArtistsPanel /> */}
          {/* {isProfileLoaded ? <FollowersPanel/> : <p>Loading Followers...</p>} */}
          <p className="text-md mx-8 mt-8">
            Right click on the song you want to share &gt; Share &gt; Copy Song
            Link &gt; <br></br> Click on the follower you want to share with!
          </p>
          <p className="text-md mx-4 mt-2">
            This will create a playlist called
            <strong>{` Recommended by ${profileData?.display_name}`}</strong>
            &nbsp;for your friend.
          </p>
          <FollowersPanel />
          <button onClick={handleLogout}>
            {isLoggingOut ? <Circles height={20} /> : "Logout"}
          </button>
        </>
      )}
    </>
  );
};

export default UserPage;

import { useEffect, useState } from "react";
import ProfileAPI from "../services/ProfileAPI";
import LoginAPI from "../services/LoginAPI";
// import ArtistsPanel from "../components/ArtistsPanel";
import FollowersPanel from "../components/FollowersPanel";

const UserPage = () => {
  interface ProfileData {
    images: { url: string }[];
    display_name: string;
  }

  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
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
    await LoginAPI.logOut();
  };

  return (
    <>
      {profileData && (
        <>
          <div className="image-container w-[100px] h-[100px] overflow-hidden rounded-full inline-block align-middle">
            <img
              src={profileData.images[0].url}
              className="w-[100%] h-[100%] object-cover object-center"
            />
          </div>
          <h1 className="inline-block mx-4 align-middle">
            Hey {profileData.display_name.split(" ")[0]}!
          </h1>
          {/* <ArtistsPanel /> */}
          {/* {isProfileLoaded ? <FollowersPanel/> : <p>Loading Followers...</p>} */}
          <FollowersPanel />
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </>
  );
};

export default UserPage;

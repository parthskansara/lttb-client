import LoginAPI from "../services/LoginAPI";
import { FaSpotify } from "react-icons/fa";

const LoginPage = () => {
  const handleClick = async () => {
    try {
      const loginUrl = await LoginAPI.getLoginUrl();
      chrome.tabs.create({ url: loginUrl });
    } catch (err) {
      console.error("Error fetching token");
    }
  };

  return (
    <>
      <p className="text-md">
        Login with Spotify to start sharing songs with your Spotify followers!
      </p>
      <button
        className="bg-spotify-green rounded-lg mt-4"
        onClick={handleClick}
      >
        <span className="flex justify-center align-center">
          <FaSpotify size="18px" /> &nbsp;&nbsp; Login with Spotify
        </span>
      </button>
    </>
  );
};

export default LoginPage;

import { useState } from "react";
import { writeToClipboard } from "../utils/clipboard";

const ShareComponent = () => {
  const [copyStatus, setCopyStatus] = useState("");
  const copyLink = async () => {
    await writeToClipboard()
      .then(() => setCopyStatus("Link copied!"))
      .catch((error) => {
        console.error("Error copying: ", error);
        setCopyStatus("Unable to copy, try again!");
      });
    setTimeout(() => {
      setCopyStatus("");
    }, 5000);
  };

  return (
    <>
      <p className="mt-4">
        This might be happening because your friend isn't logged in. <br></br>
        <br></br>
        Share this extension with your friend and have them log in to start
        sending them your recommendations.
      </p>
      <button onClick={copyLink} className="text-white mt-4">
        {copyStatus === "" ? "Copy Link" : copyStatus}
      </button>
    </>
  );
};

export default ShareComponent;

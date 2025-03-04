import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const handleAuthMessage = (message: any) => {
  //     console.log("Received message: ", message);

  //     if (message.type === "AUTH_SUCCESS") {
  //       setIsLoggedIn(true);
  //     }
  //   };

  //   chrome.runtime.onMessage.addListener(handleAuthMessage);

  //   return () => {
  //     chrome.runtime.onMessage.removeListener(handleAuthMessage);
  //   };
  // }, []);

  useEffect(() => {
    interface StorageChange {
      [key: string]: chrome.storage.StorageChange;
    }

    const handleStorageChange = (changes: StorageChange, area: string) => {
      if (area === "local" && "isLoggedIn" in changes) {
        setIsLoggedIn(changes.isLoggedIn.newValue);
      }
    };

    chrome.storage.local.get("isLoggedIn", (result) => {
      if (result.isLoggedIn) {
        setIsLoggedIn(true);
      }
    });

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return (
    <>
      {console.log("Here")}
      <div className="App">
        {isLoggedIn ? (
          <>
            <UserPage />
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    </>
  );
}

export default App;

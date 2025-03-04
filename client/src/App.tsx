import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>

    // <>
    //   <div className="App">
    //     {
    //       isLoggedIn ?
    //       <UserPage /> :
    //       <LoginPage onLogin={() =.}
    //     }
    //   </div>
    // </>
  );
}

export default App;

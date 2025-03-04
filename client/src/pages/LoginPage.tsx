import LoginAPI from "../services/LoginAPI";

const LoginPage = () => {
  const handleClick = async () => {
    try {
      const loginUrl = await LoginAPI.getLoginUrl();
      window.location.href = loginUrl;
    } catch (err) {
      console.error("Error fetching token");
    }
  };

  return (
    <>
      <button onClick={handleClick}>Login</button>
    </>
  );
};

export default LoginPage;

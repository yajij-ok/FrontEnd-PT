export const config = () => {
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return {
    headers: {
      Authorization: `PlayTech ${
        storedUser?.token ? storedUser.token : ""
      }`
    }
  };
};

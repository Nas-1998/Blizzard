async function checkAuth() {
  const options = {
    method: "GET",
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };
  const response = await fetch(
    "https://blizzard-5jur.onrender.com/users/validate-token",
    options
  );

  if (response.status !== 200) {
    window.location.href = "login.html";
  }
}

module.exports = checkAuth;

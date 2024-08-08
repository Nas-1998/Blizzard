// const API_URL = "http://127.0.0.1:3000";
const API_URL = "https://blizzard-5jur.onrender.com";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    };
    const response = await fetch(`${API_URL}/users/login`, options);

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "characters.html";
    } else {
      console.log(`Login failed: ${data.error}`);
    }
  } catch (err) {
    console.log("An error occurred while trying to log in.");
  } finally {
    form.reset();
  }
});

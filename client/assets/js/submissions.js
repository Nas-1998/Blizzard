const API_URL = "https://blizzard-5jur.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetching data from the backend
    const response = await fetch(`${API_URL}/submissions`, {
      headers: {
        method: "GET",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (response.status !== 200) {
      window.location.href = "index.html";
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const stats = data.stats;
      const container = document.getElementById("card-container");

      const uniqueNames = stats.reduce((acc, value) => {
        const alreadyInArray = acc.includes(value.character_name);
        if (!alreadyInArray) {
          acc.push(value.character_name);
        }
        return acc;
      }, []);

      uniqueNames.forEach((characterName) => {
        const questions = stats.filter(
          (stat) => stat.character_name === characterName
        );

        const containerDiv = document.createElement("div");

        containerDiv.className = "px-4 py-4";
        containerDiv.innerHTML = `
                <div class="card mb-4 shadow-md">
                <h2 class="character_name">${characterName}</h2>
                ${questions
                  .map((stat) => {
                    return `
                      <div class="row-md-4">
                          <div class="card mb-4 shadow-sm">
                              <div class="card-body">
                                  <p class="card-title question_description">${
                                    stat.question_description
                                  }</p>
                                  <p class="card-text percentage_text">Percentage Correct: ${Number(
                                    stat.percentage_correct
                                  ).toFixed(2)}%</p>
                              </div>
                          </div>
                      </div>
                      `;
                  })
                  .join("")}
             </div>
        
        `;

        container.appendChild(containerDiv);
      });
    } else {
      console.error("Failed to fetch stats:", response.status);
    }
  } catch (err) {
    console.error("Error fetching stats:", err);
  }
});

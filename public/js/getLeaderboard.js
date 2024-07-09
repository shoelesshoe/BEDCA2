document.addEventListener("DOMContentLoaded", function () {
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  function getLeaderboard(value) {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      
      const leaderboard = document.getElementById("leaderboardContent");
      leaderboard.innerHTML = "";  // clear leaderboard content

      if (responseStatus == 200) {
        if (responseData.length == 0) {  // check if responseData is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No leaderboard contents to display!</h1>
          `;
          leaderboard.appendChild(displayItem);
        } else {
          for (let i = 0; i < responseData.length; i++) {
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 p-3";
            displayItem.innerHTML = `
              <div class="card h-100">
                <div class="d-none align-items-center justify-content-center d-flex border-bottom border-grey my-3 trophy-image"></div>
                <div class="card-body text-center">
                  <h5 class="card-title">#${i+1}: <a href="singleUserInfo.html?user_id=${responseData[i].user_id}">${responseData[i].username}</a></h5>
                  <p class="card-text leaderboard-stats"></p>
                </div>
              </div>
            `;
            
            if (i == 1 || i == 2) {  // put side by side if 2nd and 3rd place
              displayItem.className = "col-lg-6 col-md-12 p-3"
            }

            const leaderboardStats = displayItem.querySelector('.leaderboard-stats');

            if (responseData[i].streak != undefined) {  // check if responseData[i].streak is not null
              leaderboardStats.innerHTML = `Streak Count: <i class="fa-solid fa-fire"></i> ${responseData[i].streak}`;
            } else if (responseData[i].total_completed_tasks != undefined) {  // check if responseData[i].total_completed_tasks is not null
              leaderboardStats.innerHTML = `Total Completed Tasks: <i class="fa-solid fa-check"></i> ${responseData[i].total_completed_tasks}`;
            } else if (responseData[i].total_points_earned != undefined) {  // check if responseData[i].points is not null
              leaderboardStats.innerHTML = `Total Points Earned: <i class="fa-solid fa-gem"></i> ${responseData[i].total_points_earned} pts`;
            } else if (responseData[i].plant_level != undefined) {  // check if responseData[i].plant_level is not null
              leaderboardStats.innerHTML = `
                Highest Plant Level: <i class="fa-solid fa-seedling"></i> ${responseData[i].plant_level} <br>
                Plant Name: ${responseData[i].plant_name} <br>
                Plant Rarity: ${responseData[i].plant_rarity} <br>
                <img class="img-fluid" height="100px" width="100px" src="../images/plants/${responseData[i].plant_type_id}.webp" alt="Plant Image"></img>
              `;
            }
            
            if (i <= 2) {  // display trophy image for 1st, 2nd, and 3rd place
              displayItem.querySelector(`.trophy-image`).innerHTML = `<img class="img-fluid pb-3" width="100px" height="100px" src="/images/trophy${i+1}.jpg" alt="Trophy Image"></img>`
              displayItem.querySelector(`.trophy-image`).classList.remove("d-none");
            }

            leaderboard.appendChild(displayItem);
          }
        }
      } else if (responseStatus == 500) {  // internal server error
        warningCard.classList.remove("d-none");
        warningText.innerText = 'Internal Server Error';
      } else {  // error
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.error;
      }
    };
    
    fetchMethod(currentUrl + `/api/leaderboard/${value}`, callback);
  }

  const button = document.querySelectorAll(".btn");
  button.forEach((btn) => {  // listens to all buttons
    btn.addEventListener("click", function () {
      const value = btn.value;
      getLeaderboard(value);
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  function getAllUsers() {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      
      const allUsersList = document.getElementById("allUsers");
      if (responseStatus == 200) {
        if (responseData.length == 0) {  // check if responseData is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No users yet!</h1>
          `;
          allUsersList.appendChild(displayItem);
        } else {
          responseData.forEach((user) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
            displayItem.innerHTML = `
              <div class="card h-100">
                <div class="card-body">
                  <h5 class="card-title">Username: ${user.username}</h5>
                  <p class="card-text">
                    Email: ${user.email} <br>
                    Created On: ${user.created_on} <br>
                    Last Login: ${user.last_login}
                  </p>
                  <a href="singleUserInfo.html?user_id=${user.user_id}" class="btn btn-dark">View Details</a>
                </div>
              </div>
            `;
            allUsersList.appendChild(displayItem);
          });
        }
      } else if (responseStatus == 500) {  // internal server error
        warningCard.classList.remove("d-none");
        warningText.innerText = 'Internal Server Error';
      } else {  // error
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.error;
      }
    };
      
    fetchMethod(currentUrl + "/api/users", callback);
  }

  getAllUsers();
});
document.addEventListener("DOMContentLoaded", function () {
  const taskId = new URL(document.URL).searchParams.get("task_id");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  function getTaskDetails() {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const singleTaskInfo = document.getElementById("singleTaskInfo");
      if (responseStatus == 200) {
        if (responseData.total_stars == undefined) {  // check if total_stars is empty
          responseData.total_stars = 0;
        }

        if (responseData.total_completions == undefined) {  // check if total_completions is empty
          responseData.total_completions = 0;
        }

        if (responseData.tasks == undefined) {  // check if tasks is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No task details to display!</h1>
          `;
          singleTaskInfo.appendChild(displayItem);
        } else {
          const taskHeading = document.getElementById("taskHeading");
          taskHeading.classList.remove("d-none");  // show taskHeading

          const singleTaskList = document.getElementById("task");
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 p-3";
          displayItem.innerHTML = `
            <div class="card">
              <div class="card-body">
                <div class="text-center">
                <h5 class="card-title">Title: ${responseData.tasks.title}</h5>
                <p class="card-text">
                  Description: ${responseData.tasks.description} <br>
                  Points: <i class="fa-solid fa-gem"></i> ${responseData.tasks.points} pts <br>
                  Total Stars: ${responseData.total_stars.total_stars} <br>
                  Total Completions: ${responseData.total_completions.total_completions} <br>
                  Created By: <a href="singleUserInfo.html?user_id=${responseData.tasks.owner_id}">${responseData.tasks.username}</a>
                </p>
                </div>
              </div>
            </div>
          `;
          singleTaskList.appendChild(displayItem);
        }
      } else if (responseStatus == 500) {  // internal server error
        warningCard.classList.remove("d-none");
        warningText.innerText = 'Internal Server Error';
      } else {  // error
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.error;
      }
    }

    fetchMethod(currentUrl + `/api/tasks/${taskId}`, callback, "GET");
  }

  getTaskDetails();
});
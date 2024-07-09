document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  function getAllStarredTasks() {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      
      const allStarredTasksList = document.getElementById("starredTasks");
      if (responseStatus == 401) {
        window.location.href = "login.html";  // redirect to login page
      } else if (responseStatus == 200) {  // logged in and token has not expired
        if (responseData.length == 0) {  // check if responseData is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No starred tasks yet!</h1>
          `;
          allStarredTasksList.appendChild(displayItem);
        } else {
          responseData.forEach((task) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 p-1";
            displayItem.innerHTML = `
              <div class="card border border-warning border-3">
                <div class="card-body">
                  <div class="float-start">
                    <h5 class="card-title">Title: ${task.title}</h5>
                    <p class="card-text">
                      Description: ${task.description} <br>
                      Points: <i class="fa-solid fa-gem"></i> ${task.points} pts
                    </p>
                  </div>
                  <div class="float-end mt-4">
                    <button value="${task.starred_id}" id="unstarButton${task.starred_id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#unstarModal">
                      <i class="fa-regular fa-star"></i> Unstar Task
                    </button>
                    <button value="${task.task_id}" id="completeButton${task.task_id}" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#completeModal">
                      <i class="fa-solid fa-check"></i> Complete Task
                    </button>
                    <a href="singleTaskInfo.html?task_id=${task.task_id}" class="btn btn-dark">View Details</a>
                  </div>
                </div>
              </div>
            `;
            allStarredTasksList.appendChild(displayItem);
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
      
    fetchMethod(currentUrl + "/api/starred_tasks/current_user", callback, 'GET', null, token);
  }

  function unstarStarredTask() {
    const unstarModal = document.getElementById('unstarModal');
    const unstarTaskError = document.getElementById("unstarTaskError");
    const unstarTaskErrorText = document.getElementById("unstarTaskErrorText");
    unstarModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const taskId = event.relatedTarget.value;  // get the taskId from the button that triggered the modal

      const submitUnstar = document.getElementById("submitUnstar");
      submitUnstar.addEventListener("click", function (event) {  // event where user submits delete starred task
        event.preventDefault();
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 204) {  // refresh the page to get the newly updated starred tasks
            window.location.reload();
          } else if (responseStatus == 500) {  // internal server error
            unstarTaskError.classList.remove("d-none");
            unstarTaskErrorText.innerText = 'Internal Server Error';
          } else {  // error
            unstarTaskError.classList.remove("d-none");
            unstarTaskErrorText.innerText = responseData.error;
          }
        };
  
        fetchMethod(currentUrl + `/api/starred_tasks/current_user/${taskId}`, callback, "DELETE", null, token);
      });
    });
  }

  function getAllCompletedTasks() {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const completedTasksList = document.getElementById("completedTasks");
      if (responseStatus == 401) {
        window.location.href = "login.html";
      } else if (responseStatus == 200) {
        if (responseData.length == 0) {  // check if responseData is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No completed tasks yet!</h1>
          `;
          completedTasksList.appendChild(displayItem);
        } else {
          responseData.forEach((task) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 p-1";
            displayItem.innerHTML = `
              <div class="card border border-success border-3">
                <div class="card-body">
                  <div class="float-start">
                    <h5 class="card-title">&#x2705; Title: ${task.title}</h5>
                    <p class="card-text">
                      Description: ${task.description} <br>
                      Points: <i class="fa-solid fa-gem"></i> ${task.points} pts <br>
                      Completion Date: ${task.completion_date} <br>
                      Notes: ${task.notes}
                    </p>
                  </div>
                  <div class="mt-4 pt-3 float-end">
                    <button value="${task.progress_id}" id="editButton${task.progress_id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-notes="${task.notes}">
                      <i class="fa-solid fa-pencil"></i> Edit Task Notes
                    </button>
                    <button value="${task.progress_id}" id="deleteButton${task.progress_id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                      <i class="fa-solid fa-trash"></i> Delete Task Completion
                    </button>
                    <a href="singleTaskInfo.html?task_id=${task.task_id}" class="btn btn-dark">View Details</a>
                  </div>
                </div>
              </div>
            `;
            completedTasksList.appendChild(displayItem);
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

    fetchMethod(currentUrl + "/api/task_progress/current_user", callback, "GET", null, token);
  }

  function completeTask() {
    const completeModal = document.getElementById('completeModal');
    const completeTaskError = document.getElementById("completeTaskError");
    const completeTaskErrorText = document.getElementById("completeTaskErrorText");

    completeModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const taskId = event.relatedTarget.value;
      const submitCreate = document.getElementById("submitComplete");
      submitCreate.addEventListener("click", function (event) {  // event where user submits complete task
        event.preventDefault();

        const notes = document.getElementById("complete-task-notes").value;

        if (notes == "" || notes == undefined) {
          completeTaskError.classList.remove("d-none");
          completeTaskErrorText.innerText = "Notes cannot be empty";
          return;
        }

        const data = {
          notes: notes
        };

        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";
          } else if (responseStatus == 201) {  // logged in and token has not expired
            window.location.reload();  // refresh the page to get the newly updated task
          } else if (responseStatus == 500) {  // internal server error
            completeTaskError.classList.remove("d-none");
            completeTaskErrorText.innerText = 'Internal Server Error';
          } else {  // error
            completeTaskError.classList.remove("d-none");
            completeTaskErrorText.innerText = responseData.error;
          }
        };
    
        fetchMethod(currentUrl + `/api/task_progress/current_user/${taskId}`, callback, "POST", data, token);
      });
    });
  }

  function updateTaskProgress() {
    const editModal = document.getElementById('editModal')
    const editTaskError = document.getElementById('editTaskError');
    const editTaskErrorText = document.getElementById('editTaskErrorText');

    editModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      // Button that triggered the modal
      const button = event.relatedTarget;

      document.getElementById('edit-task-notes').value = button.getAttribute('data-bs-notes');
    
      const submitEdit = document.getElementById("submitEdit");
      submitEdit.addEventListener("click", function (event) {  // event where user submits edit notes
        event.preventDefault();
    
        const progressId = button.value;
        const notes = document.getElementById("edit-task-notes").value;

        if (notes == "" || notes == undefined) {
          editTaskError.classList.remove("d-none");
          editTaskErrorText.innerText = "Notes cannot be empty";
          return;
        }

        const data = {
          notes: notes
        };
    
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 200) {  // logged in and token has not expired
              window.location.reload();  // refresh the page to get the newly updated task
          } else if (responseStatus == 500) {  // internal server error
            editTaskError.classList.remove("d-none");
            editTaskErrorText.innerText = 'Internal Server Error';
          } else {  // error
            editTaskError.classList.remove("d-none");
            editTaskErrorText.innerText = responseData.error;
          }
        };
    
        fetchMethod(currentUrl + `/api/task_progress/${progressId}`, callback, "PUT", data, token);
      });
    });
  }

  function deleteTaskProgress() {
    const deleteModal = document.getElementById('deleteModal');
    const deleteTaskError = document.getElementById("deleteTaskError");
    const deleteTaskErrorText = document.getElementById("deleteTaskErrorText");
    deleteModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const progressId = event.relatedTarget.value;  // get the progressId from the button that triggered the modal

      const submitDelete = document.getElementById("submitDelete");
      submitDelete.addEventListener("click", function (event) {  // event where user submits delete task
        event.preventDefault();
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 204) {  // refresh the page to get the newly updated tasks
            window.location.reload();
          } else if (responseStatus == 500) {  // internal server error
            deleteTaskError.classList.remove("d-none");
            deleteTaskErrorText.innerText = 'Internal Server Error';
          } else {  // error
            deleteTaskError.classList.remove("d-none");
            deleteTaskErrorText.innerText = responseData.error;
          }
        };
  
        fetchMethod(currentUrl + `/api/task_progress/${progressId}`, callback, "DELETE", null, token);
      });
    });
  }

  getAllStarredTasks();
  unstarStarredTask();
  getAllCompletedTasks();
  completeTask();
  updateTaskProgress();
  deleteTaskProgress();
});
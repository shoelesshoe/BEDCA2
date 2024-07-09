document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  const allTasksList = document.getElementById("allTasks");

  function getAllTasks() {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 401) {
        fetchMethod(currentUrl + "/api/tasks", callback);  // fetch endpoint without auth
      } else if (responseStatus == 200) {
        if (responseData.results.length == 0) {  // check if responseData is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No tasks yet!</h1>
          `;
          allTasksList.appendChild(displayItem);
        } else {
          responseData.results.forEach((task) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 p-1 px-4 hover text-dark";
            displayItem.innerHTML = `
              <div class="card">
                <div class="card-body">
                  <div class="float-start">
                    <h5 class="card-title">Title: ${task.title}</h5>
                    <p class="card-text">
                      Description: ${task.description} <br>
                      Points: <i class="fa-solid fa-gem"></i> ${task.points} pts
                    </p>
                  </div>
                  <div class="float-end mt-4 ms-1">
                    <button value="${task.task_id}" id="starButton${task.task_id}" type="button" class="btn btn-warning text-white" data-bs-toggle="modal" data-bs-target="#starModal">
                      <i class="fa-solid fa-star"></i> Star Task
                    </button>
                    <a href="singleTaskInfo.html?task_id=${task.task_id}" class="btn btn-dark">View Details</a>
                  </div>
                  <div class="float-end mt-4 d-none show-button" id="button${task.task_id}">
                    <button value="${task.task_id}" id="editButton${task.task_id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-title="${task.title}" data-bs-description="${task.description}" data-bs-points="${task.points}">
                      <i class="fa-solid fa-pencil"></i> Edit Task
                    </button>
                    <button value="${task.task_id}" id="deleteButton${task.task_id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                      <i class="fa-solid fa-trash"></i> Delete Task
                    </button>
                  </div>
                </div>
              </div>
            `;
            allTasksList.appendChild(displayItem);
            if (responseData.logged_in_user_id == task.owner_id) {  // if the task belongs to the logged in user, show the edit, delete and view details buttons
              const buttons = document.getElementById(`button${task.task_id}`);
              buttons.classList.remove("d-none");  // show button
            }
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

    if (token) {  // logged in
      fetchMethod(currentUrl + "/api/tasks/current_user", callback, "GET", null, token);
    } else {  // not logged in
      fetchMethod(currentUrl + "/api/tasks", callback);
    }
  }

  function checkIfEmpty(modalError, modalErrorText, ...args) {
    let valid = true;

    args.forEach((arg) => {
      if (arg == "" || arg == undefined) {
        valid = false;
      }
    });

    if (valid) {
      modalError.classList.add("d-none");  // hide error message
    } else {
      modalError.classList.remove("d-none");  // show error message
      modalErrorText.innerText = 'Please fill in all fields';
    }

    return valid;
  }

  function checkPoints(points, modalError, modalErrorText) {
    let valid = true;

    if (Number.isInteger(Number(points)) && Number(points) >= 0 && Number(points) <= 2000) {  // check if input is an integer and at least 0 but less than or equal to 2000
      modalError.classList.add("d-none");  // hide error message
    } else {
      modalError.classList.remove("d-none");  // show error message
      modalErrorText.innerText = 'Points must be an integer more than 0 and less than 2000!';
      valid = false;
      return valid;
    }

    return valid;
  }

  function postTask() {
    const createModal = document.getElementById('createModal');
    const createModalError = document.getElementById('createModalError');
    const createModalErrorText = document.getElementById('createModalErrorText');

    createModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal    
      const submitCreate = document.getElementById("submitCreate");
      submitCreate.addEventListener("click", function (event) {  // event where user submits create task
        event.preventDefault();

        const title = document.getElementById("create-task-title").value;
        const description = document.getElementById("create-task-description").value;
        const points = document.getElementById("create-task-points").value;

        var cont = checkIfEmpty(createModalError, createModalErrorText, title, description, points);

        if (cont) {
          cont = checkPoints(points, createModalError, createModalErrorText);
        }

        const data = {
          title: title,
          description: description,
          points: points
        };

        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 201) {  // logged in and token has not expired
            window.location.reload();  // refresh the page to get the newly updated task
          } else if (responseStatus == 500) {  // internal server error
            warningCard.classList.remove("d-none");
            warningText.innerText = 'Internal Server Error';
          } else {  // error
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.error;
          }
        };
    
        if (cont) {
          fetchMethod(currentUrl + `/api/tasks`, callback, "POST", data, token);
        }
      });
    });
  }

  function editTask() {
    const editModal = document.getElementById('editModal')
    const editModalError = document.getElementById('editModalError');
    const editModalErrorText = document.getElementById('editModalErrorText');

    editModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      // Button that triggered the modal
      const button = event.relatedTarget;

      document.getElementById('edit-task-title').value = button.getAttribute('data-bs-title');
      document.getElementById('edit-task-description').value = button.getAttribute('data-bs-description');
      document.getElementById('edit-task-points').value = button.getAttribute('data-bs-points');
    
      const submitEdit = document.getElementById("submitEdit");
      submitEdit.addEventListener("click", function (event) {  // event where user submits edit task
        event.preventDefault();
    
        const taskId = button.value;
        const title = document.getElementById("edit-task-title").value;
        const description = document.getElementById("edit-task-description").value;
        const points = document.getElementById("edit-task-points").value;

        var cont = checkIfEmpty(editModalError, editModalErrorText, title, description, points);

        if (cont) {
          cont = checkPoints(points, editModalError, editModalErrorText);
        }

        const data = {
          title: title,
          description: description,
          points: points
        };
    
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 200) {  // logged in and token has not expired
            window.location.reload();  // refresh the page to get the newly updated task
          } else if (responseStatus == 500) {  // internal server error
            warningCard.classList.remove("d-none");
            warningText.innerText = 'Internal Server Error';
          } else {  // error
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.error;
          }
        };
    
        if (cont) {
          fetchMethod(currentUrl + `/api/tasks/${taskId}`, callback, "PUT", data, token); 
        }
      });
    });
  }

  function deleteTask() {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const taskId = event.relatedTarget.value;  // get the taskId from the button that triggered the modal

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
            warningCard.classList.remove("d-none");
            warningText.innerText = 'Internal Server Error';
          } else {  // error
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.error;
          }
        };
  
        fetchMethod(currentUrl + `/api/tasks/${taskId}`, callback, "DELETE", null, token);
      });
    });
  }

  function addStarTask() {
    const starModal = document.getElementById('starModal');
    const starModalError = document.getElementById('starModalError');
    const starModalErrorText = document.getElementById('starModalErrorText');
    starModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const button = event.relatedTarget;
      const taskId = button.value;  // get the taskId from the button that triggered the modal

      const submitStar = document.getElementById("submitStar");
      submitStar.addEventListener("click", function (event) {  // event where user submits delete task
        event.preventDefault();
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 201) {  // refresh the page
            window.location.reload();
          } else if (responseStatus == 409) {  // task is already starred
            starModalError.classList.remove("d-none");
            starModalErrorText.innerText = 'You have already starred this task!';
          } else if (responseStatus == 500) {  // internal server error
            starModalError.classList.remove("d-none");
            starModalErrorText.innerText = 'Internal Server Error';
          } else {  // error
            starModalError.classList.remove("d-none");
            starModalErrorText.innerText = responseData.error;
          }
        };
  
        fetchMethod(currentUrl + `/api/starred_tasks/current_user/${taskId}`, callback, "POST", null, token);
      });
    });
  }

  getAllTasks();
  postTask();
  editTask();
  deleteTask();
  addStarTask();
});
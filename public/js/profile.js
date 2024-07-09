document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  function getUserDetails() {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      
      const profile = document.getElementById("profile");
      if (responseStatus == 401) {
        window.location.href = "login.html";  // redirect to login page
      } else if (responseStatus == 200) {  // logged in and token has not expired
        if (responseData.length == 0) {  // check if responseData is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No user details to display!</h1>
          `;
          profile.appendChild(displayItem);
        } else {
          const displayItem = document.createElement("div");
          displayItem.className = "col-md-12 col-xl-4 p-1";
          displayItem.innerHTML = `
            <div class="card">
              <div class="card-body text-center">
                <div class="mt-3 mb-4">
                  <img src="../images/defaultpfp.jpg" alt="defaultpfp" class="rounded-circle img-fluid" width="300px">
                </div>
                <h4 class="mb-2">${responseData.username}</h4>
                <p class="text-muted mb-4">
                  Email: ${responseData.email} <br>
                  Created On: ${responseData.created_on} <br>
                  Last Login: ${responseData.last_login}
                </p>
                <button value="${responseData.user_id}" id="editButton${responseData.user_id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-username="${responseData.username}" data-bs-email="${responseData.email}">
                  <i class="fa-solid fa-pencil"></i> Edit Details
                </button>
                <button value="${responseData.user_id}" id="deleteButton${responseData.user_id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                  <i class="fa-solid fa-trash"></i> Delete Account
                </button>
                <div class="container text-center mt-4 mb-2">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-6">
                      <p class="mb-2 h5">Streak</p>
                      <p class="text-muted mb-0"><i class="fa-solid fa-fire"></i> ${responseData.streak} Days</p>
                    </div>
                    <div class="col-6">
                      <p class="mb-2 h5">Total Points</p>
                      <p class="text-muted mb-0"><i class="fa-solid fa-gem"></i> ${responseData.net_points} pts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
          profile.appendChild(displayItem);
        }
      } else if (responseStatus == 500) {  // internal server error
        warningCard.classList.remove("d-none");
        warningText.innerText = 'Internal Server Error';
      } else {  // error
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.error;
      }
    };

    fetchMethod(currentUrl + "/api/users/current_user", callback, 'GET', null, token);
  }

  function editUserDetails() {
    const editModal = document.getElementById('editModal')
    const editModalError = document.getElementById('editModalError');
    const editModalErrorText = document.getElementById('editModalErrorText');

    editModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      // Button that triggered the modal
      const button = event.relatedTarget;

      document.getElementById('edit-username').value = button.getAttribute('data-bs-username');
      document.getElementById('edit-email').value = button.getAttribute('data-bs-email');
    
      const submitEdit = document.getElementById("submitEdit");
      submitEdit.addEventListener("click", function (event) {  // event where user submits edit user
        event.preventDefault();
        
        const userId = button.value;
        const username = document.getElementById("edit-username").value;
        const email = document.getElementById("edit-email").value;

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  // regex for email format
        const ok = re.exec(email);

        if (username == "" || email == "") {
          editModalError.classList.remove("d-none");
          editModalErrorText.innerText = 'Please fill in all fields';
          return;
        } else if (!ok) {
          editModalError.classList.remove("d-none");
          editModalErrorText.innerText = 'Please enter a valid email';
          return;
        }

        const data = {
          username: username,
          email: email
        };
    
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 200) {  // logged in and token has not expired
            window.location.reload();  // refresh the page to get the newly updated user
          } else if (responseStatus == 500) {  // internal server error
            editModalError.classList.remove("d-none");
            editModalErrorText.innerText = 'Internal Server Error';
          } else {  // error
            editModalError.classList.remove("d-none");
            editModalErrorText.innerText = responseData.error;
          }
        };
    
        fetchMethod(currentUrl + `/api/users/${userId}`, callback, "PUT", data, token);
      });
    });
  }

  function deleteUser() {
    const deleteModal = document.getElementById('deleteModal');
    deleteModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const userId = event.relatedTarget.value;  // get the userId from the button that triggered the modal

      const submitDelete = document.getElementById("submitDelete");
      submitDelete.addEventListener("click", function (event) {  // event where user submits delete user
        event.preventDefault();
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 204) {  // refresh the page to get the newly updated tasks
            localStorage.removeItem("token");  // remove token from localStorage
            window.location.href = "register.html";
          } else if (responseStatus == 500) {  // internal server error
            warningCard.classList.remove("d-none");
            warningText.innerText = 'Internal Server Error';
          } else {  // error
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.error;
          }
        };
  
        fetchMethod(currentUrl + `/api/users/${userId}`, callback, "DELETE", null, token);
      });
    });
  }

  getUserDetails();
  editUserDetails();
  deleteUser();
});
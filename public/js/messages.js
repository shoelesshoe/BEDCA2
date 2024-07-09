document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  const allMessagesList = document.getElementById("allMessages");
  
  function getAllMessages() {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 401) {
        fetchMethod(currentUrl + "/api/messages", callback, "GET");  // fetch endpoint without auth
      } else if (responseStatus == 200) {
        if (responseData.results.length == 0) {  // check if messages is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No messages yet!</h1>
          `;
          allMessagesList.appendChild(displayItem);
        } else {
          responseData.results.forEach((msg) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 p-1 px-4 hover text-dark";
            displayItem.innerHTML = `
              <p>[${msg.created_at}] ${msg.username}: ${msg.message_text}</p>
              <div class="float-end d-none show-button" id="button${msg.id}">
                <button value="${msg.id}" id="editButton${msg.id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="${msg.message_text}">
                  <i class="fa-solid fa-pencil"></i> Edit Message
                </button>
                <button value="${msg.id}" id="deleteButton${msg.id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="Delete">
                  <i class="fa-solid fa-trash"></i> Delete Message
                </button>
              </div>
            `;
            allMessagesList.appendChild(displayItem);
            if (responseData.logged_in_user_id == msg.user_id) {  // if the message belongs to the logged in user, show the edit and delete buttons
              const buttons = document.getElementById(`button${msg.id}`);
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
      fetchMethod(currentUrl + "/api/messages/current_user", callback, "GET", null, token);
    } else {  // not logged in
      fetchMethod(currentUrl + "/api/messages", callback, "GET");
    }
  }

  function postMessage() {
    const messageForm = document.getElementById("messageForm");
    messageForm.addEventListener("submit", function (event) {  // event where user submits message
      event.preventDefault();
  
      const text = document.getElementById("text").value;  // get the message text
  
      const data = {
        message_text: text
      };
  
      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 401) {
          window.location.href = "login.html";  // redirect to login page
        } else if (responseStatus == 201) {
          window.location.reload();  // refresh the page to get the newly updated messages
        } else if (responseStatus == 500) {  // internal server error
          warningCard.classList.remove("d-none");
          warningText.innerText = 'Internal Server Error';
        } else {  // error
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.error;
        }
      };
  
      fetchMethod(currentUrl + "/api/messages", callback, "POST", data, token);  
      messageForm.reset();
    });
  }
  
  function updateMessage() {
    const editModal = document.getElementById('editModal');
    const editMessageError = document.getElementById('editMessageError');
    const editMessageErrorText = document.getElementById('editMessageErrorText');
    editModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      // Button that triggered the modal
      const button = event.relatedTarget;
      const text = button.getAttribute('data-bs-whatever')
      var modalBodyInput = editModal.querySelector('.modal-body textarea');
      modalBodyInput.value = text;  // set the value of the textarea to the message text
    
      const submitEdit = document.getElementById("submitEdit");
      submitEdit.addEventListener("click", function (event) {  // event where user submits edit message
        event.preventDefault();
    
        const messageId = button.value;  // button that triggered the modal
        const text = document.getElementById("message-text").value;
    
        const data = {
          message_text: text
        };
    
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 200) {  // logged in and token has not expired
              window.location.reload();  // refresh the page to get the newly updated messages
          } else if (responseStatus == 500) {  // internal server error
            editMessageError.classList.remove("d-none");
            editMessageErrorText.innerText = 'Internal Server Error';
          } else {  // error
            editMessageError.classList.remove("d-none");
            editMessageErrorText.innerText = responseData.error;
          }
        };
    
        fetchMethod(currentUrl + `/api/messages/${messageId}`, callback, "PUT", data, token); 
      });
    });
  }
  
  function deleteMessage() {
    const deleteModal = document.getElementById('deleteModal');
    const deleteMessageError = document.getElementById('deleteMessageError');
    const deleteMessageErrorText = document.getElementById('deleteMessageErrorText');
    deleteModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const messageId = event.relatedTarget.value;  // get the messageId from the button that triggered the modal

      const submitDelete = document.getElementById("submitDelete");
      submitDelete.addEventListener("click", function (event) {  // event where user submits delete message
        event.preventDefault();
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 204) {  // refresh the page to get the newly updated messages
            window.location.reload();
          } else if (responseStatus == 500) {  // internal server error
            deleteMessageError.classList.remove("d-none");
            deleteMessageErrorText.innerText = 'Internal Server Error';
          } else {  // error
            deleteMessageError.classList.remove("d-none");
            deleteMessageErrorText.innerText = responseData.error;
          }
        };
  
        fetchMethod(currentUrl + `/api/messages/${messageId}`, callback, "DELETE", null, token);
      });
    });
  }

  getAllMessages();
  postMessage();
  updateMessage();
  deleteMessage();
});
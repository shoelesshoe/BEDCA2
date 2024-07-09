document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  
  function getStore() {
    const storeList = document.getElementById("store");
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      
      if (responseStatus == 200) {
        if (responseData.length == 0) {  // check if responseData is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No items in the store yet!</h1>
          `;
          storeList.appendChild(displayItem);
        } else {
          responseData.forEach((item) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 col-lg-6 p-1";
            displayItem.innerHTML = `
              <div class="card h-100">
                <div class="card-body">
                  <div class="align-items-center justify-content-center d-flex border-bottom border-grey my-3">
                    <img width="200px" height="200px" class="img-fluid pb-3" src="/images/store/${item.storeitem_id}.webp" alt="Store Image">
                  </div>
                  <div class="float-start">
                    <h5 class="card-title">Name: ${item.name}</h5>
                    <p class="card-text">
                      Details: ${item.details} <br>
                      Cost: <i class="fa-solid fa-gem"></i> ${item.cost} pts
                    </p>
                  </div>
                  <div class="float-end mt-4">
                    <button value="${item.storeitem_id}" id="purchaseButton${item.storeitem_id}" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#purchaseModal">
                      <i class="fa-solid fa-cart-shopping"></i> Purchase Item
                    </button>
                  </div>
                </div>
              </div>
            `;
            storeList.appendChild(displayItem);
          });
        }
      } else if (responseStatus == 500) {  // internal server error
        warningCard.classList.remove("d-none");
        warningText.innerText = 'Internal Server Error';
      } else {  // error
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.error;
      }
    }

    fetchMethod(currentUrl + "/api/store", callback);
  }

  function purchaseItem() {
    const purchaseModal = document.getElementById('purchaseModal');
    const purchaseItemError = document.getElementById('purchaseItemError');
    const purchaseItemErrorText = document.getElementById('purchaseItemErrorText');
    const obtainedModalBody = document.getElementById("obtainedPlant");

    obtainedModalBody.innerHTML = "";  // clear obtainedModalBody
    
    purchaseModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      purchaseItemError.classList.add("d-none");  // hide error message
      const storeItemId = event.relatedTarget.value;
      const submitPurchase = document.getElementById("submitPurchase");
      submitPurchase.addEventListener("click", function (event) {  // event where user submits complete task
        event.preventDefault();

        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 201) {  // logged in and token has not expired
            if (storeItemId == 2) {  // if user bought a seedpacket
              document.getElementById('close-modal').click();  // close purchaseModal and open obtainedModal
              const plantTypeId = responseData.plant_type_id;
              obtainedModalBody.innerHTML = `
                <img class="img-fluid pb-3" src="/images/plants/${plantTypeId}.webp" alt="Plant Image">
                <p>
                  Name: ${responseData.name} <br>
                  Level: ${responseData.level} <br>
                  Rarity: ${responseData.rarity}
                </p>
              `;

              const obtainedModal = document.getElementById('obtainedModal');
              obtainedModal.addEventListener('hide.bs.modal', function (event) {
                window.location.reload();  // refresh page
              });
            } else if (storeItemId == 1) {  // if user bought a streakfreeze
              window.location.reload();  // refresh page
            }
          } else if (responseStatus == 500) {  // internal server error
            purchaseItemError.classList.remove("d-none");
            purchaseItemErrorText.innerText = 'Internal Server Error';
          } else {  // error
            purchaseItemError.classList.remove("d-none");
            purchaseItemErrorText.innerText = responseData.error;
          }
        };

        fetchMethod(currentUrl + `/api/store/current_user/${storeItemId}`, callback, "POST", null, token);
      });
    });
  }

  getStore();
  purchaseItem();
});
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  function getInventory() {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const inventoryList = document.getElementById("inventory");
      const keys = Object.keys(responseData);
      if (responseStatus == 401) {
        window.location.href = "login.html";  // redirect to login page
      } else if (responseStatus == 200) {
        if (responseData[keys[0]].length == 0 && responseData[keys[1]].length == 0) {  // check if responseData's contents is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No items or plants owned yet!</h1>
          `;
          inventoryList.appendChild(displayItem);
        } else {
          const plantHeading = document.getElementById("plantHeading");
          plantHeading.classList.remove("d-none");  // show plant heading
          const itemHeading = document.getElementById("itemHeading");
          itemHeading.classList.remove("d-none");  // show item heading

          /// PLANTS /// 
          const plantList = document.getElementById("plants");
          if (responseData.owned_plants.length != 0) {  // owned_plants is not empty
            responseData.owned_plants.forEach((plant) => {
              const displayItem = document.createElement("div");
              displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
              displayItem.innerHTML = `
                <div class="card h-100">
                  <div class="card-body">
                    <div class="align-items-center justify-content-center d-flex border-bottom border-grey my-3">
                      <img class="img-fluid pb-3" src="/images/plants/${plant.plant_type_id}.webp" alt="Plant Image">
                    </div>
                    <div>
                      <h5 class="card-title">Name: ${plant.name}</h5>
                      <p class="card-text">
                        Level: ${plant.level} <br>
                        Planted On: ${plant.planted_on} <br>
                        Rarity: ${plant.rarity} <br>
                      </p>
                    </div>
                    <div class="mt-4">
                      <button value="${plant.plant_id}" id="deleteButton${plant.plant_id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deletePlantModal">
                        <i class="fa-solid fa-trash"></i> Remove Plant
                      </button>
                    </div>
                  </div>
                </div>
              `;

              const card = displayItem.querySelector(".card");
    
              if (plant.rarity == "Common") {
                card.className = "border border-3 border-grey card h-100";
              } else if (plant.rarity == "Rare") {
                card.className = "border border-3 border-primary card h-100";
              } else if (plant.rarity == "Legendary") {
                card.className = "border border-3 border-warning card h-100";
              }

              plantList.appendChild(displayItem);
            });
          } else {  // owned_plants is empty
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 pt-4 align-items-center justify-content-center d-flex";
            displayItem.innerHTML = `
              <h1>No plants owned yet!</h1>
            `;
            plantList.appendChild(displayItem);
          }

          /// ITEMS ///
          const itemList = document.getElementById("items");
          if (responseData.owned_items.length != 0) {  // owned_items is not empty
            responseData.owned_items.forEach((item) => {
              if (item.used_on == null) {
                item.used_on = "Not Used";
              }
              const displayItem = document.createElement("div");
              displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
              displayItem.innerHTML = `
                <div class="card h-100">
                  <div class="card-body">
                    <div class="align-items-center justify-content-center d-flex border-bottom border-grey my-3">
                      <img class="img-fluid pb-3" src="/images/items/${item.item_type_id}.webp" alt="Item Image">
                    </div>
                    <div>
                      <h5 class="card-title">Name: ${item.name}</h5>
                      <p class="card-text">
                        Ability: ${item.ability} <br>
                        Acquired On: ${item.acquired_on} <br>
                        Used On: ${item.used_on}
                      </p>
                    </div>
                    <div class="mt-4">
                      <button value="${item.item_id}" id="deleteButton${item.item_id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteItemModal">
                        <i class="fa-solid fa-trash"></i> Remove Item
                      </button>
                      <button value="${item.item_id}" id="useButton${item.item_id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#useItemModal">
                        Use Item
                      </button>
                    </div>
                  </div>
                </div>
              `;
              itemList.appendChild(displayItem);
            });
          } else {  // owned_items is empty
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 pt-4 align-items-center justify-content-center d-flex";
            displayItem.innerHTML = `
              <h1>No items owned yet!</h1>
            `;
            itemList.appendChild(displayItem);
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

    fetchMethod(currentUrl + "/api/inventory/current_user", callback, "GET", null, token);
  }

  function deletePlant() {
    const deletePlantModal = document.getElementById('deletePlantModal');
    const deletePlantError = document.getElementById('deletePlantError');
    const deletePlantErrorText = document.getElementById('deletePlantErrorText');
    deletePlantModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const plantId = event.relatedTarget.value;  // get the plantId from the button that triggered the modal

      const submitPlantDelete = document.getElementById("submitPlantDelete");
      submitPlantDelete.addEventListener("click", function (event) {  // event where user submits delete plant
        event.preventDefault();
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 204) {  // refresh the page to get the newly updated inventory
            window.location.reload();
          } else if (responseStatus == 500) {  // internal server error
            deletePlantError.classList.remove("d-none");
            deletePlantErrorText.innerText = 'Internal Server Error';
          } else {  // error
            deletePlantError.classList.remove("d-none");
            deletePlantErrorText.innerText = responseData.error;
          }
        };
  
        fetchMethod(currentUrl + `/api/inventory/plants/${plantId}`, callback, "DELETE", null, token);
      });
    });
  }

  function deleteItem() {
    const deleteItemModal = document.getElementById('deleteItemModal');
    const deleteItemError = document.getElementById('deleteItemError');
    const deleteItemErrorText = document.getElementById('deleteItemErrorText');
    deleteItemModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const itemId = event.relatedTarget.value;  // get the itemId from the button that triggered the modal

      const submitItemDelete = document.getElementById("submitItemDelete");
      submitItemDelete.addEventListener("click", function (event) {  // event where user submits delete item
        event.preventDefault();
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 204) {  // refresh the page to get the newly updated inventory
            window.location.reload();
          } else if (responseStatus == 500) {  // internal server error
            deleteItemError.classList.remove("d-none");
            deleteItemErrorText.innerText = 'Internal Server Error';
          } else {  // error
            deleteItemError.classList.remove("d-none");
            deleteItemErrorText.innerText = responseData.error;
          }
        };
  
        fetchMethod(currentUrl + `/api/inventory/items/${itemId}`, callback, "DELETE", null, token);
      });
    });
  }

  function useItem() {
    const useItemModal = document.getElementById('useItemModal');
    const useItemError = document.getElementById('useItemError');
    const useItemErrorText = document.getElementById('useItemErrorText');
    useItemModal.addEventListener('show.bs.modal', function (event) {  // event where user clicks on modal
      const itemId = event.relatedTarget.value;  // get the itemId from the button that triggered the modal

      const submitItemUse = document.getElementById("submitItemUse");
      submitItemUse.addEventListener("click", function (event) {  // event where user submits use item
        event.preventDefault();
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {
            window.location.href = "login.html";  // redirect to login page
          } else if (responseStatus == 200) {  // refresh the page to get the newly updated inventory
            window.location.reload();
          } else if (responseStatus == 500) {  // internal server error
            useItemError.classList.remove("d-none");
            useItemErrorText.innerText = 'Internal Server Error';
          } else {  // error
            useItemError.classList.remove("d-none");
            useItemErrorText.innerText = responseData.error;
          }
        };
  
        fetchMethod(currentUrl + `/api/inventory/items/${itemId}`, callback, "PUT", null, token);
      });
    });
  }

  getInventory();
  deletePlant();
  deleteItem();
  useItem();
});
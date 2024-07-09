document.addEventListener("DOMContentLoaded", function () {
  const userId = new URL(document.URL).searchParams.get("user_id");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  function getUserDetails() {
    const callbackForUserDetails = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const singleUserList = document.getElementById("singleUserInfo");
      if (responseStatus == 200) {
        if (responseData.length == 0) {  // check if responseData is empty
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
          displayItem.innerHTML = `
            <h1>No user details to display!</h1>
          `;
          singleUserList.appendChild(displayItem);
        } else {
          const userHeading = document.getElementById("userHeading");
          userHeading.classList.remove("d-none");  // show userHeading

          const singleUserList = document.getElementById("user");
          const displayItem = document.createElement("div");
          displayItem.className = "col-12 p-3";
          displayItem.innerHTML = `
            <div class="card">
              <div class="card-body">
                <div class="text-center">
                  <h5 class="card-title">Username: ${responseData.username}</h5>
                  <p class="card-text">
                    Email: ${responseData.email} <br>
                    Created On: ${responseData.created_on} <br>
                    Last Login: ${responseData.last_login} <br>
                    Streak: <i class="fa-solid fa-fire"></i> ${responseData.streak} Days <br>
                    Total Points Earned: <i class="fa-solid fa-gem"></i> ${responseData.total_points} pts <br>
                    Total Points Spent: <i class="fa-solid fa-gem"></i> ${responseData.net_points - responseData.total_points} pts
                  </p>
                </div>
              </div>
            </div>
          `;
          singleUserList.appendChild(displayItem);
        }
      } else if (responseStatus == 500) {  // internal server error
        warningCard.classList.remove("d-none");
        warningText.innerText = 'Internal Server Error';
      } else {  // error
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.error;
      }
    }

    fetchMethod(currentUrl + `/api/users/${userId}`, callbackForUserDetails, "GET");
  }
  
  function getUserInventory() {
    const callbackForUserInventory = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const inventoryList = document.getElementById("inventory");
      const keys = Object.keys(responseData);
      if (responseStatus == 200) {
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
                    <div class="align-items-center justify-content-center d-flex">
                      <img class="img-fluid pb-3" src="/images/plants/${plant.plant_type_id}.webp" alt="Plant Image">
                    </div>
                    <div class="float-start">
                      <h5 class="card-title">Name: ${plant.name}</h5>
                      <p class="card-text">
                        Level: ${plant.level} <br>
                        Planted On: ${plant.planted_on} <br>
                        Rarity: ${plant.rarity} <br>
                      </p>
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
                    <div class="float-start">
                      <h5 class="card-title">Name: ${item.name}</h5>
                      <p class="card-text">
                        Ability: ${item.ability} <br>
                        Acquired On: ${item.acquired_on} <br>
                        Used On: ${item.used_on}
                      </p>
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
    }

    fetchMethod(currentUrl + `/api/inventory/${userId}`, callbackForUserInventory, "GET");
  }

  getUserDetails();
  getUserInventory();
});
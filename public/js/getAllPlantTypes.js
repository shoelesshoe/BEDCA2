document.addEventListener("DOMContentLoaded", function () {
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    
    const allPlantsList = document.getElementById("allPlants");
    if (responseStatus == 200) {
      if (responseData.length == 0) {  // check if responseData is empty
        const displayItem = document.createElement("div");
        displayItem.className = "col-12 vh-100 align-items-center justify-content-center d-flex";
        displayItem.innerHTML = `
          <h1>No plants to display!</h1>
        `;
        allPlantsList.appendChild(displayItem);
      } else {
        responseData.forEach((plant) => {
          const displayItem = document.createElement("div");
          displayItem.className = "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
          displayItem.innerHTML = `
            <div class="card h-100">
              <div class="align-items-center justify-content-center d-flex border-bottom border-grey my-3">
                <img class="img-fluid pb-3" src="/images/plants/${plant.type_id}.webp" alt="Plant Image">
              </div>
              <div class="card-body">
                <h5 class="card-title">Title: ${plant.name}</h5>
                <p class="card-text">
                  Rarity: ${plant.rarity}
                </p>
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

          allPlantsList.appendChild(displayItem);
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
  
  fetchMethod(currentUrl + "/api/plant_types", callback);
});
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById('navbar');
  navbar.className = 'navbar navbar-expand-lg navbar-dark';
  navbar.innerHTML = `
    <div class="container">
      <a class="navbar-brand d-flex" href="/">
        <i class="fa-solid fa-tree"></i>
        <h3>EnvironToDo</h3>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link" href="users.html">Users</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="starredTasks.html">Starred Tasks</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="leaderboard.html">Leaderboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="plants.html">Plants</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="inventory.html">Inventory</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="store.html">Store</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="messages.html">Messages</a>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" id="points"></li>
          <li class="nav-item" id="streak"></li>
          <li class="nav-item" id="error"></li>
          <li class="nav-item">
            <a id="profileButton" href="profile.html" class="nav-link">Profile</a>
          </li>
          <li class="nav-item">
            <a id="logoutButton" class="nav-link" href="#">Logout</a>
          </li>
          <li class="nav-item">
            <a id="loginButton" class="nav-link" href="login.html">Login</a>
          </li>
          <li>
            <div class="btn-nav">
              <a id="registerButton" class="btn text-bg-dark btn-small navbar-btn" href="register.html">
                Register!
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `;

  const footer = document.getElementById('footer');
  footer.className = 'bg-dark pb-2 pt-3';
  footer.innerHTML = `
    <h3 class="text-secondary text-center">Contact Me / Socials</h3>
    <ul class="nav justify-content-center border-bottom border-secondary pb-3">
      <li class="nav-item px-5"><a target="_blank" href="https://github.com/shoelesshoe" class="nav-link px-2 text-primary"><i class="fa-brands fa-github"></i> Github</a></li>
      <li class="nav-item px-5"><a target="_blank" href="https://sg.linkedin.com/in/randal-hong-zheng-jie?trk=profile-badge" class="nav-link px-2 text-primary"><i class="fa-brands fa-linkedin"></i> LinkedIn</a></li>
      <li class="nav-item px-5"><a target="_blank" href="https://www.instagram.com/raandaal_/" class="nav-link px-2 text-primary"><i class="fa-brands fa-instagram"></i> Instagram</a></li>
      <li class="nav-item px-5"><a target="_blank" href="mailto:randalhzj@gmail.com" class="nav-link px-2 text-primary"><i class="fa-regular fa-envelope"></i> Email</a></li>
    </ul>
    <p class="pt-3 text-center text-secondary">&copy; Copyright 2024. Made By Randal Hong.</p>
  `;

  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const profileButton = document.getElementById("profileButton");
  const logoutButton = document.getElementById("logoutButton");
  const points = document.getElementById("points");
  const streak = document.getElementById("streak");
  const errorMessage = document.getElementById("error");

  function getPoints() {
    const callbackForPoints = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 401) {
        // hide points
        points.classList.add("d-none");
        if (!token) {  // no token -> not logged in
          // show error message
          errorMessage.classList.remove("d-none");
        } else {  // token exists -> session expired
          // show error message
          errorMessage.classList.remove("d-none");
          errorMessage.innerHTML = `
            <a href="login.html" class="nav-link text-danger">Your Session Has Expired. Please Log In Again!</a>
          `;
        }
      } else if (responseStatus == 200) {
        // remove error message
        errorMessage.classList.add("d-none");
        // show points
        const displayItem = document.createElement("a");
        displayItem.classList.add("nav-link");
        displayItem.classList.add("disabled");
        displayItem.innerHTML = `
          <i class="fa-solid fa-gem"></i> ${responseData.net_points} pts
        `;
        points.appendChild(displayItem);
      } else if (responseStatus == 500) {  // internal server error
        errorMessage.classList.remove("d-none");
        errorMessage.innerText = 'Internal Server Error';
      } else {  // error
        errorMessage.classList.remove("d-none");
        errorMessage.innerText = responseData.error;
      }
    }

    fetchMethod(currentUrl + "/api/users/points/current_user", callbackForPoints, "GET", null, token);
  }

  function getStreak() {
    const callbackForStreak = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 401) {
        // hide points
        points.classList.add("d-none");
        if (!token) {  // no token -> not logged in
          // show error message
          errorMessage.classList.remove("d-none");
        } else {  // token exists -> session expired
          // show error message
          errorMessage.classList.remove("d-none");
          errorMessage.innerHTML = `
            <a href="login.html" class="nav-link text-danger">Your Session Has Expired. Please Log In Again!</a>
          `;
        }
      } else if (responseStatus == 200) {
        // show points
        const displayItem = document.createElement("a");
        displayItem.classList.add("nav-link");
        displayItem.classList.add("disabled");
        displayItem.innerHTML = `
          <i class="fa-solid fa-fire"></i> ${responseData.streak} days
        `;
        streak.appendChild(displayItem);
      } else if (responseStatus == 500) {  // internal server error
        errorMessage.classList.remove("d-none");
        errorMessage.innerText = 'Internal Server Error';
      } else {  // error
        errorMessage.classList.remove("d-none");
        errorMessage.innerText = responseData.error;
      }
    }

    fetchMethod(currentUrl + "/api/streak/current_user", callbackForStreak, "GET", null, token);
  }
  
  // Check if token exists in local storage
  const token = localStorage.getItem("token");
  if (token) {
    // Token exists, show profile button and hide login and register buttons
    loginButton.classList.add("d-none");
    registerButton.classList.add("d-none");
    profileButton.classList.remove("d-none");
    logoutButton.classList.remove("d-none");
  } else {
    // Token does not exist, show login and register buttons and hide profile and logout buttons
    loginButton.classList.remove("d-none");
    registerButton.classList.remove("d-none");
    profileButton.classList.add("d-none");
    logoutButton.classList.add("d-none");
  }
  
  logoutButton.addEventListener("click", function () {
    // Remove the token from local storage and redirect to index.html
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });

  getPoints();
  getStreak();
});

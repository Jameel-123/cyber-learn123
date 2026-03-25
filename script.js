// ---------- LOGIN FORM HANDLING ----------

// Find the login form on the page
const loginForm = document.getElementById("loginForm");

// Only run this code if the login form exists on the current page
if (loginForm) {
  // Listen for the form being submitted
  loginForm.addEventListener("submit", function (event) {
    // Stop the page from refreshing automatically
    event.preventDefault();

    // Read and trim the username value
    const username = document.getElementById("username").value.trim();

    // Read and trim the password value
    const password = document.getElementById("password").value.trim();

    // Find the paragraph used for showing login messages
    const loginMessage = document.getElementById("loginMessage");

    // Prototype login check
    // This is NOT secure for a final system
    if (username === "student" && password === "pentest123") {
      // Save login state in browser storage
      localStorage.setItem("loggedIn", "true");

      // Save current username in browser storage
      localStorage.setItem("currentUser", username);

      // Send the user to the homepage
      window.location.href = "index.html";
    } else {
      // Show an error message if the credentials are wrong
      loginMessage.textContent = "Invalid username or password.";
    }
  });
}

// ---------- LOGOUT FUNCTION ----------

// This function is called by the Logout button
function logout() {
  // Remove the saved login state
  localStorage.removeItem("loggedIn");

  // Remove the saved username
  localStorage.removeItem("currentUser");

  // Send the user back to the login page
  window.location.href = "login.html";
}

// ---------- QUIZ HANDLING ----------

// Find the quiz form
const quizForm = document.getElementById("quizForm");

// Only run quiz code if the quiz form exists on this page
if (quizForm) {
  // Listen for quiz form submission
  quizForm.addEventListener("submit", function (event) {
    // Prevent page refresh
    event.preventDefault();

    // Start score at 0
    let score = 0;

    // Get the selected answer for each question
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');

    // Check if the chosen answers are correct
    if (q1 && q1.value === "a") score++;
    if (q2 && q2.value === "b") score++;
    if (q3 && q3.value === "b") score++;

    // Find where the result will be displayed
    const quizResult = document.getElementById("quizResult");

    // Show the final score
    quizResult.textContent = `You scored ${score} out of 3.`;
  });
}

// ---------- FORUM COMMENT HANDLING ----------

// Find the comment form
const commentForm = document.getElementById("commentForm");

// Only run this code if the forum form exists
if (commentForm) {
  // Listen for comment submission
  commentForm.addEventListener("submit", function (event) {
    // Prevent page refresh
    event.preventDefault();

    // Read the comment field
    const commentInput = document.getElementById("commentInput");

    // Find the container that holds all comments
    const commentsList = document.getElementById("commentsList");

    // Remove extra spaces from the typed comment
    const commentText = commentInput.value.trim();

    // Do nothing if the user submitted an empty comment
    if (commentText === "") {
      return;
    }

    // Get the currently logged in username, or use "User" as fallback
    const currentUser = localStorage.getItem("currentUser") || "User";

    // Create a new div element for the comment
    const commentItem = document.createElement("div");

    // Add the CSS class used for styling comment blocks
    commentItem.classList.add("comment-item");

    // Insert the username and comment text inside the new comment block
    commentItem.innerHTML = `
      <strong>${currentUser}:</strong>
      <p>${commentText}</p>
    `;

    // Add the new comment to the top of the comment list
    commentsList.prepend(commentItem);

    // Clear the text area after posting
    commentInput.value = "";
  });
}
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
      loginMessage.textContent = "Access Denied: Invalid username or password.";
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

// ---------- REUSABLE QUIZ MARKING FUNCTION ----------

// This function marks any quiz that has:
// 1. a form ID
// 2. a result paragraph ID
// 3. an answer key object
function markQuiz(formId, resultId, correctAnswers) {
  // Find the quiz form using its ID
  const quizForm = document.getElementById(formId);

  // Only run if this quiz form exists on the current page
  if (quizForm) {
    // Listen for the quiz being submitted
    quizForm.addEventListener("submit", function (event) {
      // Stop the page refreshing
      event.preventDefault();

      // Start score at 0
      let score = 0;

      // Loop through each question in the answer key
      for (let question in correctAnswers) {
        // Find the selected radio button for this question
        const selectedAnswer = document.querySelector(
          `input[name="${question}"]:checked`
        );

        // If selected answer matches correct answer, add 1 point
        if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
          score++;
        }
      }

      // Find the result display area
      const resultBox = document.getElementById(resultId);

      // Display final score
      resultBox.textContent = `You scored ${score} out of 10.`;
    });
  }
}

// ---------- EASY QUIZZES ----------

markQuiz("easyQuiz1Form", "easyQuiz1Result", {
  q1: "a",
  q2: "a",
  q3: "a",
  q4: "a",
  q5: "a",
  q6: "a",
  q7: "a",
  q8: "a",
  q9: "a",
  q10: "a"
});

markQuiz("easyQuiz2Form", "easyQuiz2Result", {
  q1: "b",
  q2: "a",
  q3: "a",
  q4: "b",
  q5: "a",
  q6: "a",
  q7: "a",
  q8: "a",
  q9: "a",
  q10: "a"
});

markQuiz("easyQuiz3Form", "easyQuiz3Result", {
  q1: "a",
  q2: "a",
  q3: "a",
  q4: "a",
  q5: "a",
  q6: "a",
  q7: "a",
  q8: "a",
  q9: "a",
  q10: "a"
});

// ---------- MEDIUM QUIZZES ----------

markQuiz("mediumQuiz1Form", "mediumQuiz1Result", {
  q1: "a",
  q2: "a",
  q3: "a",
  q4: "a",
  q5: "a",
  q6: "a",
  q7: "a",
  q8: "a",
  q9: "a",
  q10: "a"
});

markQuiz("mediumQuiz2Form", "mediumQuiz2Result", {
  q1: "a",
  q2: "a",
  q3: "a",
  q4: "a",
  q5: "a",
  q6: "a",
  q7: "a",
  q8: "a",
  q9: "a",
  q10: "a"
});

markQuiz("mediumQuiz3Form", "mediumQuiz3Result", {
  q1: "a",
  q2: "a",
  q3: "a",
  q4: "a",
  q5: "a",
  q6: "a",
  q7: "a",
  q8: "a",
  q9: "a",
  q10: "a"
});

// ---------- HARD QUIZZES ----------

markQuiz("hardQuiz1Form", "hardQuiz1Result", {
  q1: "a",
  q2: "a",
  q3: "a",
  q4: "a",
  q5: "a",
  q6: "a",
  q7: "a",
  q8: "a",
  q9: "a",
  q10: "a"
});

markQuiz("hardQuiz2Form", "hardQuiz2Result", {
  q1: "a",
  q2: "a",
  q3: "a",
  q4: "a",
  q5: "a",
  q6: "a",
  q7: "a",
  q8: "a",
  q9: "a",
  q10: "a"
});

markQuiz("hardQuiz3Form", "hardQuiz3Result", {
  q1: "a",
  q2: "a",
  q3: "a",
  q4: "a",
  q5: "a",
  q6: "a",
  q7: "a",
  q8: "a",
  q9: "a",
  q10: "a"
});
// ---------- CREATE YOUR OWN QUIZ ----------

const addQuestionBtn = document.getElementById("addQuestionBtn");
const questionsContainer = document.getElementById("questionsContainer");
const saveQuizBtn = document.getElementById("saveQuizBtn");
const quizSaveMessage = document.getElementById("quizSaveMessage");

let customQuestionCount = 0;
const minQuestions = 3;
const maxQuestions = 15;

if (addQuestionBtn) {
  addQuestionBtn.addEventListener("click", function () {
    if (customQuestionCount >= maxQuestions) {
      quizSaveMessage.textContent = "Maximum of 15 questions reached.";
      return;
    }

    customQuestionCount++;

    const questionBlock = document.createElement("div");
    questionBlock.classList.add("quiz-question");

    questionBlock.innerHTML = `
      <h3>Question ${customQuestionCount}</h3>

      <label>Question text</label>
      <input type="text" class="custom-question" placeholder="Enter your question" />

      <label>Answer A</label>
      <input type="text" class="custom-option-a" placeholder="Enter answer A" />

      <label>Answer B</label>
      <input type="text" class="custom-option-b" placeholder="Enter answer B" />

      <label>Answer C</label>
      <input type="text" class="custom-option-c" placeholder="Enter answer C" />

      <label>Correct answer</label>
      <select class="custom-correct-answer">
        <option value="">Select correct answer</option>
        <option value="a">Answer A</option>
        <option value="b">Answer B</option>
        <option value="c">Answer C</option>
      </select>
    `;

    questionsContainer.appendChild(questionBlock);
  });
}

if (saveQuizBtn) {
  saveQuizBtn.addEventListener("click", function () {
    const questionBlocks = document.querySelectorAll(".quiz-question");

    if (questionBlocks.length < minQuestions) {
      quizSaveMessage.textContent = "Please add at least 3 questions.";
      return;
    }

    const customQuiz = [];

    for (let block of questionBlocks) {
      const question = block.querySelector(".custom-question").value.trim();
      const optionA = block.querySelector(".custom-option-a").value.trim();
      const optionB = block.querySelector(".custom-option-b").value.trim();
      const optionC = block.querySelector(".custom-option-c").value.trim();
      const correct = block.querySelector(".custom-correct-answer").value;

      if (!question || !optionA || !optionB || !optionC || !correct) {
        quizSaveMessage.textContent = "Please complete every field before saving.";
        return;
      }

      customQuiz.push({
        question: question,
        options: {
          a: optionA,
          b: optionB,
          c: optionC
        },
        correct: correct
      });
    }

    localStorage.setItem("customQuiz", JSON.stringify(customQuiz));
    quizSaveMessage.textContent = "Custom quiz saved successfully!";
  });
}

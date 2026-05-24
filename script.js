// ---------- LOGIN FORM HANDLING ----------

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginMessage = document.getElementById("loginMessage");

    const savedAccount = JSON.parse(localStorage.getItem("createdAccount"));

    if (username === "student" && password === "pentest123") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", username);
      window.location.href = "index.html";

    } else if (
      savedAccount &&
      username === savedAccount.username &&
      password === savedAccount.password
    ) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", savedAccount.username);
      window.location.href = "index.html";

    } else {
      loginMessage.textContent = "Access Denied: Invalid username or password.";
    }
  });
}


// ---------- LOGOUT FUNCTION ----------

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}


// ---------- SAVED FORUM SYSTEM ----------

// Find the forum form on the page
const commentForm = document.getElementById("commentForm");

// Displays one saved forum message in the correct forum section
function displayForumMessage(message) {
  const sectionMap = {
    general: "generalMessages",
    recommendations: "recommendationsMessages",
    information: "informationMessages",
    topics: "topicsMessages"
  };

  const targetList = document.getElementById(sectionMap[message.section]);

  if (!targetList) return;

  const commentItem = document.createElement("div");
  commentItem.classList.add("comment-item");

  commentItem.innerHTML = `
    <strong>${message.user}</strong>
    <p>${message.text}</p>
    <small>${message.date}</small>
  `;

  targetList.prepend(commentItem);
}

// Loads saved messages from localStorage
function loadForumMessages() {
  const savedMessages =
    JSON.parse(localStorage.getItem("forumMessages")) || [];

  savedMessages.forEach(function (message) {
    displayForumMessage(message);
  });
}

// Only runs this code on forum.html
if (commentForm) {
  loadForumMessages();

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const forumSection = document.getElementById("forumSection").value;
    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value.trim();

    if (commentText === "") return;

    const currentUser = localStorage.getItem("currentUser") || "User";

    const newMessage = {
      section: forumSection,
      user: currentUser,
      text: commentText,
      date: new Date().toLocaleString()
    };

    const savedMessages =
      JSON.parse(localStorage.getItem("forumMessages")) || [];

    savedMessages.push(newMessage);

    localStorage.setItem("forumMessages", JSON.stringify(savedMessages));

    displayForumMessage(newMessage);

    commentInput.value = "";
  });
}

// ---------- REUSABLE QUIZ MARKING FUNCTION ----------

function markQuiz(formId, resultId, correctAnswers) {
  const quizForm = document.getElementById(formId);

  if (quizForm) {
    quizForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let score = 0;

      for (let question in correctAnswers) {
        const selectedAnswer = document.querySelector(
          `input[name="${question}"]:checked`
        );

        if (selectedAnswer && selectedAnswer.value === correctAnswers[question]) {
          score++;
        }
      }

      const resultBox = document.getElementById(resultId);
      resultBox.textContent = `You scored ${score} out of 10.`;
    });
  }
}


// ---------- EASY QUIZZES ----------

markQuiz("easyQuiz1Form", "easyQuiz1Result", {
  q1: "a", q2: "a", q3: "a", q4: "a", q5: "a",
  q6: "a", q7: "a", q8: "a", q9: "a", q10: "a"
});

markQuiz("easyQuiz2Form", "easyQuiz2Result", {
  q1: "b", q2: "a", q3: "a", q4: "b", q5: "a",
  q6: "a", q7: "a", q8: "a", q9: "a", q10: "a"
});

markQuiz("easyQuiz3Form", "easyQuiz3Result", {
  q1: "a", q2: "a", q3: "a", q4: "a", q5: "a",
  q6: "a", q7: "a", q8: "a", q9: "a", q10: "a"
});


// ---------- MEDIUM QUIZZES ----------

markQuiz("mediumQuiz1Form", "mediumQuiz1Result", {
  q1: "a", q2: "a", q3: "a", q4: "a", q5: "a",
  q6: "a", q7: "a", q8: "a", q9: "a", q10: "a"
});

markQuiz("mediumQuiz2Form", "mediumQuiz2Result", {
  q1: "a", q2: "a", q3: "a", q4: "a", q5: "a",
  q6: "a", q7: "a", q8: "a", q9: "a", q10: "a"
});

markQuiz("mediumQuiz3Form", "mediumQuiz3Result", {
  q1: "a", q2: "a", q3: "a", q4: "a", q5: "a",
  q6: "a", q7: "a", q8: "a", q9: "a", q10: "a"
});


// ---------- HARD QUIZZES ----------

markQuiz("hardQuiz1Form", "hardQuiz1Result", {
  q1: "a", q2: "a", q3: "a", q4: "a", q5: "a",
  q6: "a", q7: "a", q8: "a", q9: "a", q10: "a"
});

markQuiz("hardQuiz2Form", "hardQuiz2Result", {
  q1: "a", q2: "a", q3: "a", q4: "a", q5: "a",
  q6: "a", q7: "a", q8: "a", q9: "a", q10: "a"
});

markQuiz("hardQuiz3Form", "hardQuiz3Result", {
  q1: "a", q2: "a", q3: "a", q4: "a", q5: "a",
  q6: "a", q7: "a", q8: "a", q9: "a", q10: "a"
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
    const questionBlocks = document.querySelectorAll("#questionsContainer .quiz-question");

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


// ---------- TAKE CUSTOM QUIZ ----------

const takeCustomQuizForm = document.getElementById("takeCustomQuizForm");
const customQuizResult = document.getElementById("customQuizResult");

if (takeCustomQuizForm) {
  const savedQuiz = JSON.parse(localStorage.getItem("customQuiz"));

  if (!savedQuiz || savedQuiz.length === 0) {
    takeCustomQuizForm.innerHTML = `
      <p>No custom quiz found. Please create a quiz first.</p>
      <a class="card-btn" href="create-quiz.html">Create Quiz</a>
    `;
  } else {
    savedQuiz.forEach(function (item, index) {
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("quiz-question");

      questionBlock.innerHTML = `
        <h3>${index + 1}. ${item.question}</h3>

        <label>
          <input type="radio" name="customQ${index}" value="a">
          ${item.options.a}
        </label>

        <label>
          <input type="radio" name="customQ${index}" value="b">
          ${item.options.b}
        </label>

        <label>
          <input type="radio" name="customQ${index}" value="c">
          ${item.options.c}
        </label>
      `;

      takeCustomQuizForm.appendChild(questionBlock);
    });

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit Custom Quiz";
    takeCustomQuizForm.appendChild(submitButton);

    takeCustomQuizForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let score = 0;

      savedQuiz.forEach(function (item, index) {
        const selectedAnswer = document.querySelector(
          `input[name="customQ${index}"]:checked`
        );

        if (selectedAnswer && selectedAnswer.value === item.correct) {
          score++;
        }
      });

      customQuizResult.textContent =
        `You scored ${score} out of ${savedQuiz.length}.`;
    });
  }
}


// ---------- CREATE ACCOUNT SYSTEM ----------

const createAccountForm = document.getElementById("createAccountForm");

if (createAccountForm) {
  createAccountForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("accountName").value.trim();
    const age = document.getElementById("accountAge").value.trim();
    const email = document.getElementById("accountEmail").value.trim();
    const username = document.getElementById("accountUsername").value.trim();
    const password = document.getElementById("accountPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    const accountMessage = document.getElementById("accountMessage");

    if (!name || !age || !email || !username || !password || !confirmPassword) {
      accountMessage.textContent = "Please complete all fields.";
      return;
    }

    if (password !== confirmPassword) {
      accountMessage.textContent = "Passwords do not match.";
      return;
    }

    const account = {
      name: name,
      age: age,
      email: email,
      username: username,
      password: password
    };

    localStorage.setItem("createdAccount", JSON.stringify(account));

    accountMessage.textContent = "Account created successfully! You can now log in.";
  });
}
// ---------- INTERACTIVE LESSON SLIDES ----------

// Keeps track of the current lesson page
let currentLessonSlide = 0;

// Finds all lesson slide sections
const lessonSlides = document.querySelectorAll(".lesson-slide");

// Finds the lesson progress text
const lessonProgress = document.getElementById("lessonProgress");

// Shows the selected lesson slide
function showLessonSlide(index) {

  // Stop errors if no slides exist
  if (lessonSlides.length === 0) return;

  // Hide all lesson slides
  lessonSlides.forEach(function (slide) {
    slide.classList.remove("active");
  });

  // Show the selected slide
  lessonSlides[index].classList.add("active");

  // Update progress text
  if (lessonProgress) {
    lessonProgress.textContent =
      `Lesson page ${index + 1} of ${lessonSlides.length}`;
  }
}

// Moves to the next lesson page
function nextLessonSlide() {

  // Prevent going past the final page
  if (currentLessonSlide < lessonSlides.length - 1) {

    currentLessonSlide++;

    showLessonSlide(currentLessonSlide);
  }
}

// Moves to the previous lesson page
function previousLessonSlide() {

  // Prevent going below page 1
  if (currentLessonSlide > 0) {

    currentLessonSlide--;

    showLessonSlide(currentLessonSlide);
  }
}
// ---------- JOB VACANCY TOGGLE ----------

function toggleVacancies() {

  const vacancyBox =
    document.getElementById("vacancyBox");

  if (!vacancyBox) return;

  if (vacancyBox.style.display === "none") {

    vacancyBox.style.display = "block";

  } else {

    vacancyBox.style.display = "none";

  }
}
// Load the first lesson slide automatically
showLessonSlide(currentLessonSlide);
// ---------- REPORT UPLOAD PREVIEW ----------

function previewReport() {
  const reportFile = document.getElementById("reportFile");
  const reportMessage = document.getElementById("reportMessage");
  const reportPreviewBox = document.getElementById("reportPreviewBox");

  const reportName = document.getElementById("reportName");
  const reportType = document.getElementById("reportType");
  const reportSize = document.getElementById("reportSize");

  if (!reportFile || reportFile.files.length === 0) {
    reportMessage.textContent = "Please choose a report file first.";
    return;
  }

  const file = reportFile.files[0];

  reportName.textContent = file.name;
  reportType.textContent = file.type || "Unknown file type";
  reportSize.textContent = `${Math.round(file.size / 1024)} KB`;

  reportPreviewBox.style.display = "block";

  reportMessage.textContent =
    "Report uploaded temporarily for preview. It has not been permanently saved.";
}
// ---------- REPORT UPLOAD PREVIEW ----------

function previewReport() {
  const reportFile = document.getElementById("reportFile");
  const reportMessage = document.getElementById("reportMessage");
  const reportPreviewBox = document.getElementById("reportPreviewBox");

  const reportName = document.getElementById("reportName");
  const reportType = document.getElementById("reportType");
  const reportSize = document.getElementById("reportSize");

  if (!reportFile || reportFile.files.length === 0) {
    reportMessage.textContent = "Please choose a report file first.";
    return;
  }

  const file = reportFile.files[0];

  reportName.textContent = file.name;
  reportType.textContent = file.type || "Unknown file type";
  reportSize.textContent = `${Math.round(file.size / 1024)} KB`;

  reportPreviewBox.style.display = "block";

  reportMessage.textContent =
    "Report uploaded temporarily for preview. It has not been permanently saved.";
}

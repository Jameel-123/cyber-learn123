// ---------- LOGIN FORM HANDLING ----------

// Gets the login form
const loginForm = document.getElementById("loginForm");

// Only runs if the form exists
if (loginForm) {

  // Runs when the login form is submitted
  loginForm.addEventListener("submit", function (event) {

    // Stops page refresh
    event.preventDefault();

    // Gets username entered by the user
    const username =
      document.getElementById("username").value.trim();

    // Gets password entered by the user
    const password =
      document.getElementById("password").value.trim();

    // Area used to display login messages
    const loginMessage =
      document.getElementById("loginMessage");

    // Gets saved account information
    const savedAccount =
      JSON.parse(localStorage.getItem("createdAccount"));

    // Checks default login details
    if (username === "student" &&
        password === "pentest123") {

      // Stores login status
      localStorage.setItem("loggedIn", "true");

      // Stores username
      localStorage.setItem("currentUser", username);

      // Redirects user
      window.location.href = "index.html";

    } else if (

      // Checks custom account details
      savedAccount &&
      username === savedAccount.username &&
      password === savedAccount.password

    ) {

      // Stores login status
      localStorage.setItem("loggedIn", "true");

      // Stores username
      localStorage.setItem(
        "currentUser",
        savedAccount.username
      );

      // Redirects user
      window.location.href = "index.html";

    } else {

      // Shows login error
      loginMessage.textContent =
        "Access Denied: Invalid username or password.";
    }
  });
}


// ---------- LOGOUT FUNCTION ----------

// Logs user out
function logout() {

  // Removes login status
  localStorage.removeItem("loggedIn");

  // Removes username
  localStorage.removeItem("currentUser");

  // Returns user to login page
  window.location.href = "login.html";
}
// ---------- REUSABLE QUIZ MARKING FUNCTION ----------

// Marks quizzes automatically
function markQuiz(formId, resultId, correctAnswers) {

  // Finds quiz form
  const quizForm =
    document.getElementById(formId);

  // Only runs if form exists
  if (quizForm) {

    // Runs when quiz is submitted
    quizForm.addEventListener("submit", function (event) {

      // Stops page refresh
      event.preventDefault();

      // Stores user score
      let score = 0;

      // Checks every question
      for (let question in correctAnswers) {

        // Finds selected answer
        const selectedAnswer =
          document.querySelector(
            `input[name="${question}"]:checked`
          );

        // Adds a point if answer is correct
        if (
          selectedAnswer &&
          selectedAnswer.value === correctAnswers[question]
        ) {
          score++;
        }
      }

      // Displays result
      const resultBox =
        document.getElementById(resultId);

      resultBox.textContent =
        `You scored ${score} out of 10.`;
    });
  }
}

// Easy quiz answers
markQuiz("easyQuiz1Form", "easyQuiz1Result", {...});

// Easy quiz answers
markQuiz("easyQuiz2Form", "easyQuiz2Result", {...});

// Easy quiz answers
markQuiz("easyQuiz3Form", "easyQuiz3Result", {...});

// Medium quiz answers
markQuiz("mediumQuiz1Form", "mediumQuiz1Result", {...});

// Medium quiz answers
markQuiz("mediumQuiz2Form", "mediumQuiz2Result", {...});

// Medium quiz answers
markQuiz("mediumQuiz3Form", "mediumQuiz3Result", {...});

// Hard quiz answers
markQuiz("hardQuiz1Form", "hardQuiz1Result", {...});

// Hard quiz answers
markQuiz("hardQuiz2Form", "hardQuiz2Result", {...});

// Hard quiz answers
markQuiz("hardQuiz3Form", "hardQuiz3Result", {...});

// ---------- CREATE YOUR OWN QUIZ ----------

// Button used to add questions
const addQuestionBtn =
  document.getElementById("addQuestionBtn");

// Area where questions are displayed
const questionsContainer =
  document.getElementById("questionsContainer");

// Save quiz button
const saveQuizBtn =
  document.getElementById("saveQuizBtn");

// Displays save messages
const quizSaveMessage =
  document.getElementById("quizSaveMessage");

// Counts created questions
let customQuestionCount = 0;

// Minimum questions allowed
const minQuestions = 3;

// Maximum questions allowed
const maxQuestions = 15;

// Runs when Add Question is clicked
if (addQuestionBtn) {

  addQuestionBtn.addEventListener(
    "click",
    function () {

      // Prevents more than 15 questions
      if (
        customQuestionCount >= maxQuestions
      ) {

        quizSaveMessage.textContent =
          "Maximum of 15 questions reached.";

        return;
      }

      // Increases question count
      customQuestionCount++;

      // Creates a new question block
      const questionBlock =
        document.createElement("div");

      // Adds styling class
      questionBlock.classList.add(
        "quiz-question"
      );

      // Creates question inputs
      questionBlock.innerHTML = `...`;

      // Adds question to page
      questionsContainer.appendChild(
        questionBlock
      );
    }
  );
}

// Runs when Save Quiz is clicked
if (saveQuizBtn) {

  saveQuizBtn.addEventListener(
    "click",
    function () {

      // Gets all created questions
      const questionBlocks =
        document.querySelectorAll(
          "#questionsContainer .quiz-question"
        );

      // Checks minimum question requirement
      if (
        questionBlocks.length <
        minQuestions
      ) {

        quizSaveMessage.textContent =
          "Please add at least 3 questions.";

        return;
      }

      // Stores completed quiz
      const customQuiz = [];

      // Loops through every question
      for (let block of questionBlocks) {

        // Gets question text
        const question =
          block.querySelector(
            ".custom-question"
          ).value.trim();

        // Gets answer A
        const optionA =
          block.querySelector(
            ".custom-option-a"
          ).value.trim();

        // Gets answer B
        const optionB =
          block.querySelector(
            ".custom-option-b"
          ).value.trim();

        // Gets answer C
        const optionC =
          block.querySelector(
            ".custom-option-c"
          ).value.trim();

        // Gets correct answer
        const correct =
          block.querySelector(
            ".custom-correct-answer"
          ).value;

        // Makes sure all fields are completed
        if (
          !question ||
          !optionA ||
          !optionB ||
          !optionC ||
          !correct
        ) {

          quizSaveMessage.textContent =
            "Please complete every field before saving.";

          return;
        }

        // Adds question to quiz array
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

      // Saves quiz to localStorage
      localStorage.setItem(
        "customQuiz",
        JSON.stringify(customQuiz)
      );

      // Displays success message
      quizSaveMessage.textContent =
        "Custom quiz saved successfully!";
    }
  );
}

// ---------- TAKE CUSTOM QUIZ ----------

// Gets the custom quiz form
const takeCustomQuizForm = document.getElementById("takeCustomQuizForm");

// Gets the result area
const customQuizResult = document.getElementById("customQuizResult");

// Only runs if the custom quiz form exists
if (takeCustomQuizForm) {

  // Loads the saved custom quiz
  const savedQuiz = JSON.parse(localStorage.getItem("customQuiz"));

  // Checks if no quiz has been created
  if (!savedQuiz || savedQuiz.length === 0) {

    // Shows message and link to create a quiz
    takeCustomQuizForm.innerHTML = `
      <p>No custom quiz found. Please create a quiz first.</p>
      <a class="card-btn" href="create-quiz.html">Create Quiz</a>
    `;

  } else {

    // Creates each saved quiz question on the page
    savedQuiz.forEach(function (item, index) {

      // Creates a question block
      const questionBlock = document.createElement("div");

      // Adds styling class
      questionBlock.classList.add("quiz-question");

      // Adds the question and answer choices
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

      // Adds the question to the form
      takeCustomQuizForm.appendChild(questionBlock);
    });

    // Creates submit button
    const submitButton = document.createElement("button");

    // Makes the button submit the form
    submitButton.type = "submit";

    // Text shown on the button
    submitButton.textContent = "Submit Custom Quiz";

    // Adds the button to the form
    takeCustomQuizForm.appendChild(submitButton);

    // Runs when the custom quiz is submitted
    takeCustomQuizForm.addEventListener("submit", function (event) {

      // Stops page refresh
      event.preventDefault();

      // Stores the score
      let score = 0;

      // Checks each saved question
      savedQuiz.forEach(function (item, index) {

        // Gets the selected answer
        const selectedAnswer = document.querySelector(
          `input[name="customQ${index}"]:checked`
        );

        // Adds a point if correct
        if (selectedAnswer && selectedAnswer.value === item.correct) {
          score++;
        }
      });

      // Shows the final score
      customQuizResult.textContent =
        `You scored ${score} out of ${savedQuiz.length}.`;
    });
  }
}

// ---------- CREATE ACCOUNT SYSTEM ----------

// Gets the create account form
const createAccountForm = document.getElementById("createAccountForm");

// Only runs if the create account form exists
if (createAccountForm) {

  // Runs when the form is submitted
  createAccountForm.addEventListener("submit", function (event) {

    // Stops page refresh
    event.preventDefault();

    // Gets the user's name
    const name = document.getElementById("accountName").value.trim();

    // Gets the user's age
    const age = document.getElementById("accountAge").value.trim();

    // Gets the user's email
    const email = document.getElementById("accountEmail").value.trim();

    // Gets the username
    const username = document.getElementById("accountUsername").value.trim();

    // Gets the password
    const password = document.getElementById("accountPassword").value.trim();

    // Gets the confirmed password
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Area used to show account messages
    const accountMessage = document.getElementById("accountMessage");

    // Checks that all fields are filled in
    if (!name || !age || !email || !username || !password || !confirmPassword) {
      accountMessage.textContent = "Please complete all fields.";
      return;
    }

    // Checks both passwords match
    if (password !== confirmPassword) {
      accountMessage.textContent = "Passwords do not match.";
      return;
    }

    // Stores the account details
    const account = {
      name: name,
      age: age,
      email: email,
      username: username,
      password: password
    };

    // Saves the account in localStorage
    localStorage.setItem("createdAccount", JSON.stringify(account));

    // Shows success message
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

  // Stops errors if no slides exist
  if (lessonSlides.length === 0) return;

  // Hides all lesson slides
  lessonSlides.forEach(function (slide) {
    slide.classList.remove("active");
  });

  // Shows the selected slide
  lessonSlides[index].classList.add("active");

  // Updates the progress text
  if (lessonProgress) {
    lessonProgress.textContent =
      `Lesson page ${index + 1} of ${lessonSlides.length}`;
  }
}

// Moves to the next lesson page
function nextLessonSlide() {

  // Stops user going past the last page
  if (currentLessonSlide < lessonSlides.length - 1) {

    // Increases the slide number
    currentLessonSlide++;

    // Shows the new slide
    showLessonSlide(currentLessonSlide);
  }
}

// Moves to the previous lesson page
function previousLessonSlide() {

  // Stops user going before page 1
  if (currentLessonSlide > 0) {

    // Decreases the slide number
    currentLessonSlide--;

    // Shows the new slide
    showLessonSlide(currentLessonSlide);
  }
}


// ---------- JOB VACANCY TOGGLE ----------

// Shows or hides the job vacancies box
function toggleVacancies() {

  // Gets the vacancy box
  const vacancyBox =
    document.getElementById("vacancyBox");

  // Stops errors if the box does not exist
  if (!vacancyBox) return;

  // If hidden, show the box
  if (vacancyBox.style.display === "none") {

    vacancyBox.style.display = "block";

  } else {

    // If visible, hide the box
    vacancyBox.style.display = "none";

  }
}

// Loads the first lesson slide automatically
showLessonSlide(currentLessonSlide);


// ---------- REPORT UPLOAD PREVIEW ----------

// Shows report file information before upload
function previewReport() {

  // Gets the file input
  const reportFile = document.getElementById("reportFile");

  // Gets the message area
  const reportMessage = document.getElementById("reportMessage");

  // Gets the preview box
  const reportPreviewBox = document.getElementById("reportPreviewBox");

  // Gets the file name display area
  const reportName = document.getElementById("reportName");

  // Gets the file type display area
  const reportType = document.getElementById("reportType");

  // Gets the file size display area
  const reportSize = document.getElementById("reportSize");

  // Checks if a file has been chosen
  if (!reportFile || reportFile.files.length === 0) {
    reportMessage.textContent = "Please choose a report file first.";
    return;
  }

  // Gets the chosen file
  const file = reportFile.files[0];

  // Shows the file name
  reportName.textContent = file.name;

  // Shows the file type
  reportType.textContent = file.type || "Unknown file type";

  // Shows the file size in KB
  reportSize.textContent = `${Math.round(file.size / 1024)} KB`;

  // Displays the preview box
  reportPreviewBox.style.display = "block";

  // Shows upload preview message
  reportMessage.textContent =
    "Report uploaded temporarily for preview. It has not been permanently saved.";
}

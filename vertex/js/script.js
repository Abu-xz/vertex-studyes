const modal = document.getElementById("modal");
const closeButton = document.getElementById("closeModal");
const cardButton = document.querySelectorAll(".card-button");
const contactForm = document.getElementById("registerForm");
const studentName = document.getElementById("student-name").value;
const studentMobile = document.getElementById("student-mobile").value;
const parentMobile = document.getElementById("parent-mobile").value;
const submitButton = document.getElementById("submit-button").value;
const syllabusSelect = document.getElementById("syllabus-select");
const classSelect = document.getElementById("class-select");
const email = document.getElementById("email").value;

// Show modal when window load
// window.onload = function () {
//   modal.style.display = "flex";
// };

// Card button event listener
cardButton.forEach((button) => {
  button.addEventListener("click", () => {
    modal.style.display = "flex";
  });
});

// close modal
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Image hidden feature on index
document.addEventListener("DOMContentLoaded", function () {
  let showMoreBtn = document.getElementById("showMoreBtn");
  let hiddenCards = document.querySelectorAll(".achievements-card.hidden");

  showMoreBtn.addEventListener("click", function () {
      hiddenCards.forEach(card => {
          card.classList.remove("hidden"); // Remove the hidden class
      });

      showMoreBtn.style.display = "none"; // Hide the button
  });
});
  

// Form validation
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const studentName = document.getElementById("student-name").value.trim();
  const studentMobile = document.getElementById("student-mobile").value.trim();
  const parentMobile = document.getElementById("parent-mobile").value.trim();
  const email = document.getElementById("email").value.trim();
  const classElement = document.getElementById("class-select");
  const syllabusElement = document.getElementById("syllabus-select");

  // extract selected Value
  const classValue = classElement.options[classElement.selectedIndex].text;
  const syllabusValue =
    syllabusElement.options[syllabusElement.selectedIndex].text;

  // Clear all previous error messages
  const errorFields = document.querySelectorAll(".error-message");
  errorFields.forEach((field) => (field.textContent = ""));

  // Validation flags
  let isValid = true;

  // Validate student name (letters and spaces only)
  const namePattern = /^[a-zA-Z\s]+$/;
  if (!studentName || !namePattern.test(studentName)) {
    document.getElementById("student-name-error").textContent =
      "Please enter a valid student name (letters and spaces only).";
    isValid = false;
  }

  // Validate student mobile (10 digits)
  const mobilePattern = /^[0-9]{10}$/;
  if (!studentMobile || !mobilePattern.test(studentMobile)) {
    document.getElementById("student-mobile-error").textContent =
      "Please enter a valid 10-digit student mobile number.";
    isValid = false;
  }

  // Validate parent mobile (10 digits)
  if (!parentMobile || !mobilePattern.test(parentMobile)) {
    document.getElementById("parent-mobile-error").textContent =
      "Please enter a valid 10-digit parent mobile number.";
    isValid = false;
  }

  // Validate email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!email || !emailPattern.test(email)) {
    document.getElementById("email-error").textContent =
      "Please enter a valid email address.";
    isValid = false;
  }

  // Validate class selection
  if (!classValue || classValue === "Select Class") {
    document.getElementById("class-select-error").textContent =
      "Please select a class.";
    isValid = false;
  }

  // Validate syllabus selection
  if (!syllabusValue || syllabusValue === "Select Syllabus") {
    document.getElementById("syllabus-select-error").textContent =
      "Please select a syllabus.";
    isValid = false;
  }

  // If all validations pass
  if (isValid) {
    const data = {
      student_name: studentName,
      student_mobile: studentMobile,
      parent_mobile: parentMobile,
      email: email,
      class: classValue,
      syllabus: syllabusValue,
      access_key: "e7153df5-c0fa-4a0d-ad5f-b53302882c24",
      subject: `Name : ${studentName} | Class : ${classValue} |Syllabus : ${syllabusValue}`
    };
    const json = JSON.stringify(data);
    sendData(json);
  }
});

async function sendData(data) {
  try {
    // Disable submit button to prevent multiple clicks
    const submitButton = document.getElementById("submit-button");
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    });

    const json = await response.json();
    if (json.success) {
      await swal({
        title: "Form Submitted",
        icon: "success",
        button: "OK",
        dangerMode: true,
      });

      // Close modal on successful submission
      modal.style.display = "none";
      contactForm.reset();
    } else {
      await swal({
        title: "Submission Failed",
        icon: "error",
        button: "OK",
      });

      // Re-enable submit button if submission fails
      submitButton.disabled = false;
      submitButton.textContent = "Submit";
    }
  } catch (error) {
    console.log(error);

    // Re-enable submit button in case of error
    const submitButton = document.getElementById("submit-button");
    submitButton.disabled = false;
    submitButton.textContent = "Submit";
  }
}



function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  const computedLeft = window.getComputedStyle(menu).left;

  if (computedLeft === "0px") {
    menu.style.left = "-100%";
  } else {
    menu.style.left = "0";
  }
}

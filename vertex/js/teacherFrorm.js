document
  .getElementById("applicationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const errorFields = document.querySelectorAll(".error-message");
    errorFields.forEach((field) => (field.textContent = ""));

    // Collect form data
    const formData = {
      fullname: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      teacher_subject: document.getElementById("subject").value,
      experience: document.getElementById("experience").value,
      //   cv: document.getElementById("cv").files[0],
    };

    // Validation flags
    let isValid = true;

    // Validate student name (letters and spaces only)
    const fullnamePattern = /^[a-zA-Z\s]+$/;
    if (!formData.fullname || !fullnamePattern.test(formData.fullname)) {
      document.getElementById("fullname-error").textContent =
        "Please enter a valid full name (letters and spaces only).";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email address.";
      isValid = false;
    }

    const phonePattern = /^\d{10}$/;
    if (!formData.phone || !phonePattern.test(formData.phone)) {
      document.getElementById("phone-error").textContent =
        "Please enter a valid 10-digit parent mobile number.";
      isValid = false;
    }

    const subjectPattern = /^[a-zA-Z\s]/;

    if (!formData.teacher_subject || !subjectPattern.test(formData.teacher_subject)) {
      document.getElementById("subject-error").textContent =
        "Please enter a valid subject name (Letters only)";
      isValid = false;
    }

    const experiencePattern = /^(?:[1-9]|[1-4][0-9]|50)$/;
    if (!formData.experience || !experiencePattern.test(formData.experience)) {
      document.getElementById("experience-error").textContent =
        "Please enter a valid teaching experience (1-50 years).";
      isValid = false;
    }
    // File upload validation
    // if (formData?.cv?.type !== "application/pdf") {
    //   document.getElementById("cv-error").textContent =
    //     "Please upload a PDF file for your CV.";
    //   isValid = false;
    // }
    if (isValid) {
      sendDataToWeb3Form(formData);
    }
  });

function sendDataToWeb3Form(formData) {
  const apiKey = "e7153df5-c0fa-4a0d-ad5f-b53302882c24"; 
  formData.subject = `Name : ${formData.fullname} | Subejct :${formData.teacher_subject} |Has experience of : ${formData.experience}`

  //   Create a FormData object to send the file (PDF)
  //   const formDataObj = new FormData();
  //   formDataObj.append("access_key", apiKey);
  //   formDataObj.append("fullname", formData.fullname);
  //   formDataObj.append("email", formData.email);
  //   formDataObj.append("phone", formData.phone);
  //   formDataObj.append("subject", formData.subject);
  //   formDataObj.append("experience", formData.experience);
  //   formDataObj.append("cv", formData.cv.files[0]);

  formData.access_key = apiKey;
  const data = JSON.stringify(formData); // 

  // Send the data using fetch API
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        swal({
          title: "Form Submitted",
          icon: "success",
          button: "OK",
          dangerMode: true,
        });
      } else {
        swal({
          title: "Form submission failed",
          icon: "error",
          button: "OK",
        });
      }
    })
    .catch((error) => {
      swal({
        title: 'Error occurred...',
        text: error.message || 'Please try again later...',
        icon: "error",
        button: "OK",
      });
    });
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

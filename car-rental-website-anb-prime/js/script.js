window.onload = () => {
  // Input your js code here.
  // navbar button
  let btnToggle = document.querySelectorAll(".btn--for-navbar");
  let mobile_nav = document.querySelector(".mobile--navbar");
  for (let allBtn of btnToggle) {
    allBtn.addEventListener("click", () => {
      mobile_nav.classList.toggle("active");
    });
  }
  // FAQ js
  const faqItems = document.querySelectorAll(".faq-item");

  for (let eachFaq of faqItems) {
    const question = eachFaq.querySelector(".faq-question");
    const answer = eachFaq.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      closeAllFaq(eachFaq.id);
      question.classList.toggle("active-q");
      question.querySelector("i").classList.toggle("active-i");
      answer.classList.toggle("active-ans");
    });
  }

  function closeAllFaq(exceptID) {
    for (let eachFaq of faqItems) {
      const question = eachFaq.querySelector(".faq-question");
      const answer = eachFaq.querySelector(".faq-answer");

      if (eachFaq.id !== exceptID) {
        question.classList.remove("active-q");
        question.querySelector("i").classList.remove("active-i");
        answer.classList.remove("active-ans");
      }
    }
  }
};
var images = Array.from(
  document.getElementById("img-group").getElementsByTagName("img")
); // make img to array easy to count for use in function
function showImage(imageId) {
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    if (image.id === imageId) {
      image.style.display = "block";
    } else {
      image.style.display = "none";
    }
  }
}

function show(car) {
  // Hide all car models
  var carModels = document.getElementsByClassName("pick-description-car");
  for (var i = 0; i < carModels.length; i++) {
    carModels[i].style.display = "none";
  }

  // Show the selected car model
  var selectedCarModel = document.getElementById(car);
  if (selectedCarModel) {
    selectedCarModel.style.display = "block";
  }
}
class Button {
  constructor(buttons) {
    this.buttons = buttons;
    this.originalColors = this.buttons.map(
      (button) => button.style.backgroundColor
    );

    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        this.handleClick(button);
      });
    });
  }

  handleClick(clickedButton) {
    this.buttons.forEach((button) => {
      if (button === clickedButton) {
        button.style.backgroundColor = "red";
      } else {
        button.style.backgroundColor =
          this.originalColors[this.buttons.indexOf(button)];
      }
    });
  }
}

const buttons = Array.from(
  document.getElementsByClassName("pick-box")[0].getElementsByTagName("button")
);

function activateBtn(btnID) {
  buttons.forEach((eachBtn) => {
    if (eachBtn.id != btnID) eachBtn.classList.remove("active-btn");
    else eachBtn.classList.add("active-btn");
  });
}

// Create an instance of the Button class
const buttonGroup = new Button(buttons);

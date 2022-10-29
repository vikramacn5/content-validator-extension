"use strict";

let isPopupOpen = false;
let isEditMode = false;

const editClickHandler = function () {
  isEditMode = !isEditMode;
  goEditMode(); // comes from view.js
};

const checkClickHandler = function () {
  const content = document.querySelector(".extn-cv-textarea").value;
  console.log(content);
  mainFunctionalityInit(content);
  showInfo();
};

editBtn.addEventListener("click", editClickHandler);
checkBtn.addEventListener("click", checkClickHandler);
resultBtn.addEventListener("click", showResult);
backBtn.addEventListener("click", backToEdit);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  isPopupOpen = !isPopupOpen;
  switchPopup(isPopupOpen); // comes from view.js

  // const popupEditBtn = document.querySelector(".extn-cv-edit-btn");
  // popupEditBtn.addEventListener("click", editClickHandler);

  // const popupCheckBtn = document.querySelector(".extn-cv-check-btn");
  // popupCheckBtn.addEventListener("click", checkClickHandler);

  // resultBtn.addEventListener("click", showResult);
  // backBtn.addEventListener("click", backToEdit);

  console.log(message, sender);
  sendResponse("I got the message: from content-script");
});

"use strict";

let isPopupOpen = false;
let isEditMode = false;

const editClickHandler = function () {
  isEditMode = !isEditMode;
  goEditMode(this.closest(".extn-cv-popup"), isEditMode); // comes from view.js
};

const checkClickHandler = function () {
  const content = document.querySelector(".extn-cv-textarea").value;
  console.log(content);
  mainFunctionalityInit(content);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  isPopupOpen = !isPopupOpen;
  switchPopup(isPopupOpen); // comes from view.js

  const popupEditBtn = document.querySelector(".extn-cv-edit-btn");
  isPopupOpen && popupEditBtn.addEventListener("click", editClickHandler);

  const popupCheckBtn = document.querySelector(".extn-cv-check-btn");
  isPopupOpen && popupCheckBtn.addEventListener("click", checkClickHandler);

  console.log(message, sender);
  sendResponse("I got the message: from content-script");
});

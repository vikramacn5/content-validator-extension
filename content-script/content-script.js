"use strict";

let isPopupOpen = false;
let isEditMode = false;
let isInfoMode = false;
let isResultsMode = false;
let isResultWindowHalf = false;
let isCorrectionPopupOpen = false;

let resultsObject;

const editClickHandler = function () {
  isEditMode = !isEditMode;
  goEditMode(); // comes from view.js
};

const checkClickHandler = function () {
  const content = document.querySelector(".extn-cv-textarea").value;
  console.log(content);
  resultsObject = mainFunctionalityInit(content);
  showInfo();
};

textArea.addEventListener("input", checkIsLink);
editBtn.addEventListener("click", editClickHandler);
checkBtn.addEventListener("click", checkClickHandler);
fetchBtn.addEventListener("click", fetchWriterContent);
resultBtn.addEventListener("click", showResult);
backBtn.addEventListener("click", backToEdit);
infoBtn.addEventListener("click", showInfo);
minimizeBtn.addEventListener("click", minimizeResultWindow);
resizeResultWindowBtn.addEventListener("click", resizeResultWindow);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "action-click") {
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
  } else if (message.type === "writer-content") {
    console.log(message.textContent);
    // addWriterContentToTextarea(message.textContent);
    sendResponse("for content from content script");
  }
});

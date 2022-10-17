const popupDiv = document.createElement("div");
popupDiv.classList.add("extn-cv-popup");
popupDiv.style.cssText = `
  position: fixed;
  display:grid;
  grid-template-rows: 1fr max-content;
  right: 2%;
  top: 2%;
  height: 0px;
  width: 0px;
  background-color: #222;
  z-index: 1000;
  border-radius: 100px;
  overflow: hidden;
  transition: height 0.7s ease, width 0.7s ease, border-radius 0.7s ease;
`;

const textArea = document.createElement("textarea");
textArea.classList.add("extn-cv-textarea");
textArea.setAttribute("data-gramm", "false");
textArea.setAttribute("placeholder", "Paste your content here");
textArea.style.cssText = `
  width: 100%;
  height:100%;
  background-color: #222;
  border: none;
  color: #ccc;
  resize: none;
  padding-bottom:20px;
  padding-right: 8px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 2s ease;
`;

const textAreaWrapper = document.createElement("div");
textAreaWrapper.appendChild(textArea);
textAreaWrapper.style.padding = "40px 40px 0px";

popupDiv.insertAdjacentElement("afterbegin", textAreaWrapper);

const editBtn = document.createElement("button");
editBtn.classList.add("extn-cv-edit-btn", "extn-cv-btn");
editBtn.textContent = "Edit in full screen";

const checkBtn = document.createElement("button");
checkBtn.textContent = "Check";
checkBtn.classList.add("extn-cv-check-btn", "extn-cv-btn");

const btnsWrapper = document.createElement("div");
btnsWrapper.classList.add("extn-cv-btn-wrapper");
btnsWrapper.style.cssText = `
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 20px;
  gap: 10px;
  border-top: 1px solid #006401;
  visibility: hidden;
  opacity:0;
  transition: opacity 2s ease;
`;

btnsWrapper.appendChild(editBtn);
btnsWrapper.appendChild(checkBtn);

popupDiv.insertAdjacentElement("beforeend", btnsWrapper);

let closeTimeout;
const switchPopup = function (shouldOpen) {
  // editBtn.textContent = isEditMode ? "Exit full screen" : "Edit in full screen";

  const body = document.querySelector("body");
  if (shouldOpen) {
    !document.querySelector(".extn-cv-popup") &&
      shouldOpen &&
      body.appendChild(popupDiv);
    closeTimeout && clearTimeout(closeTimeout);
    setTimeout(() => {
      popupDiv.style.width = isEditMode ? "96%" : "350px";
      popupDiv.style.height = isEditMode ? "96%" : "300px";
      popupDiv.style.borderRadius = "10px";
      btnsWrapper.style.visibility = "visible";
      btnsWrapper.style.opacity = 1;
      textArea.style.visibility = "visible";
      textArea.style.opacity = 1;
    }, 100);
  } else {
    popupDiv.style.width = "0px";
    popupDiv.style.height = "0px";
    popupDiv.style.borderRadius = "100px";
    btnsWrapper.style.visibility = "hidden";
    btnsWrapper.style.opacity = "0";
    textArea.style.visibility = "hidden";
    textArea.style.opacity = 0;
    closeTimeout = setTimeout(() => {
      !shouldOpen && body.removeChild(popupDiv);
    }, 700);
  }
};

const goEditMode = function (popup, editModeState) {
  editBtn.textContent = isEditMode ? "Exit full screen" : "Edit in full screen";
  popup.style.width = editModeState ? "96%" : "350px";
  popup.style.height = editModeState ? "96%" : "300px";
};

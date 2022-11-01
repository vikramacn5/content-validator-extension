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
  transition: height 0.6s ease, width 0.6s ease, border-radius 0.6s ease;
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
  transition: opacity .2s ease;
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

const resultBtn = document.createElement("button");
resultBtn.textContent = "Show results";
resultBtn.classList.add("extn-cv-result-btn", "extn-cv-btn");

const backBtn = document.createElement("button");
backBtn.textContent = "Back to edit";
backBtn.classList.add("extn-cv-back-btn", "extn-cv-btn");

const infoBtn = document.createElement("button");
infoBtn.textContent = "Show info";
infoBtn.classList.add("extn-cv-info-btn", "extn-cv-btn");

const minimizeBtn = document.createElement("button");
minimizeBtn.textContent = "Minimize";
minimizeBtn.classList.add("extn-cv-minimize-btn", "extn-cv-btn");

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
  transition: opacity .2s ease;
`;

const iconDiv = document.createElement("div");
iconDiv.classList.add("extn-cv-icon-div");
const iconImg = document.createElement("img");
iconImg.src = chrome.runtime.getURL("img/cv-logo.png");
iconImg.style.height = "100%";
iconImg.style.width = "100%";
iconDiv.appendChild(iconImg);
iconDiv.style.cssText = `
  position: absolute;
  left:0;
  right:0;
  height: 100%;
  width: 100%;
  border-radius: 50px;
  visibility: hidden;
  opacity:0;
  cursor: pointer;
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

btnsWrapper.appendChild(editBtn);
btnsWrapper.appendChild(checkBtn);

popupDiv.insertAdjacentElement("beforeend", btnsWrapper);

const highlightInfo = document.createElement("div");
highlightInfo.classList.add("extn-cv-info", "extn-cv-highlight-info");
highlightInfo.style.padding = "20px";
highlightInfo.style.borderBottom = "1px solid #006401";
highlightInfo.style.transition = "opacity 0.2s ease, visibility 0.2s ease";
highlightInfo.innerHTML = `
  <p class = "entn-cv-highlight-green"><span>&nbsp;</span>Text highlighted in green has exact match with the writer content</p>
  <p class = "extn-cv-highlight-yellow"><span>&nbsp;</span>Text highlighted in yellow has 90% or more match with writer content</p>
  <p class = "extn-cv-highlight-red"><span>&nbsp;</span>Text highlighted in red has 70% or more match with writer content</p>
  <p class = "extn-cv-highlight-none"><span>&nbsp;</span>Text not highlighted in any colors has a match range of less than 70%</p>
`;

const popupInfo = document.createElement("div");
popupInfo.classList.add("extn-cv-info", "extn-cv-popup-info");
popupInfo.style.padding = "20px";
popupInfo.style.transition = "opacity 0.2s ease, visibility 0.2s ease";
popupInfo.innerHTML = `
  <p class = "extn-cv-popup-green">Text in green inside hover popup needs to be added</p>
  <p class = "extn-cv-popup-red">Text in red inside hover popup needs to be removed</p>
`;

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
      // btnsWrapper.style.visibility = "visible";
      // btnsWrapper.style.opacity = 1;
      // textArea.style.visibility = "visible";
      // textArea.style.opacity = 1;
    }, 100);

    setTimeout(() => {
      btnsWrapper.style.visibility = "visible";
      btnsWrapper.style.opacity = 1;
      textArea.style.visibility = "visible";
      textArea.style.opacity = 1;
    }, 500);
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
    }, 600);
  }
};

const showTextareaAndButtons = function () {
  btnsWrapper.style.visibility = "hidden";
  btnsWrapper.style.opacity = "0";
  textArea.style.visibility = "hidden";
  textArea.style.opacity = 0;
  editBtn.textContent = isEditMode ? "Exit full screen" : "Edit in full screen";
  popupDiv.style.width = isEditMode ? "96%" : "350px";
  popupDiv.style.height = isEditMode ? "96%" : "300px";
  setTimeout(() => {
    btnsWrapper.style.visibility = "visible";
    btnsWrapper.style.opacity = 1;
    textArea.style.visibility = "visible";
    textArea.style.opacity = 1;
  }, 500);
};

const goEditMode = function () {
  showTextareaAndButtons();
};

const showInfo = function () {
  popupDiv.contains(textAreaWrapper) && popupDiv.removeChild(textAreaWrapper);
  popupDiv.contains(resultDiv) && popupDiv.removeChild(resultDiv);
  // textArea.parentElement.removeChild(textArea);
  btnsWrapper.contains(checkBtn) && btnsWrapper.removeChild(checkBtn);
  btnsWrapper.contains(editBtn) && btnsWrapper.removeChild(editBtn);
  btnsWrapper.contains(infoBtn) && btnsWrapper.removeChild(infoBtn);
  !btnsWrapper.contains(resultBtn) && btnsWrapper.prepend(resultBtn);
  !btnsWrapper.contains(backBtn) && btnsWrapper.appendChild(backBtn);

  popupDiv.insertAdjacentElement("afterbegin", popupInfo);
  popupDiv.insertAdjacentElement("afterbegin", highlightInfo);

  btnsWrapper.style.opacity = 0;
  btnsWrapper.style.visibility = "hidden";
  popupInfo.style.opacity = 0;
  popupInfo.style.visibility = "hidden";
  highlightInfo.style.opacity = 0;
  highlightInfo.style.visibility = "hidden";

  popupDiv.style.height = "274px";
  popupDiv.style.width = "505px";
  setTimeout(function () {
    btnsWrapper.style.opacity = 1;
    btnsWrapper.style.visibility = "visible";
    popupInfo.style.opacity = 1;
    popupInfo.style.visibility = "visible";
    highlightInfo.style.opacity = 1;
    highlightInfo.style.visibility = "visible";
  }, 600);
};

const showResult = function () {
  console.log("results");
  popupDiv.style.width = "96%";
  popupDiv.style.height = "96%";
  popupDiv.removeChild(highlightInfo);
  popupDiv.removeChild(popupInfo);
  btnsWrapper.style.opacity = 0;
  btnsWrapper.style.visibility = "hidden";
  btnsWrapper.removeChild(resultBtn);
  btnsWrapper.insertAdjacentElement("afterbegin", infoBtn);
  btnsWrapper.insertAdjacentElement("afterbegin", minimizeBtn);
  setTimeout(() => {
    popupDiv.insertAdjacentElement("afterbegin", getResults());
    document.querySelectorAll(".extn-cv-sub-result-wrapper").forEach((node) => {
      node.style.height = node.clientHeight + "px";
      node.dataset.height = node.clientHeight;
    });

    btnsWrapper.style.opacity = 1;
    btnsWrapper.style.visibility = "visible";
  }, 700);
};

const backToEdit = function () {
  console.log("edit mode");
  popupDiv.contains(highlightInfo) && popupDiv.removeChild(highlightInfo);
  popupDiv.contains(popupInfo) && popupDiv.removeChild(popupInfo);
  popupDiv.contains(resultDiv) && popupDiv.removeChild(resultDiv);
  popupDiv.insertAdjacentElement("afterbegin", textAreaWrapper);
  btnsWrapper.contains(resultBtn) && btnsWrapper.removeChild(resultBtn);
  btnsWrapper.contains(backBtn) && btnsWrapper.removeChild(backBtn);
  btnsWrapper.contains(infoBtn) && btnsWrapper.removeChild(infoBtn);
  btnsWrapper.appendChild(editBtn);
  btnsWrapper.appendChild(checkBtn);
  showTextareaAndButtons();
};

const minimizeResultWindow = function (shouldClose) {
  console.log(shouldClose);
  const visibility = shouldClose ? "hidden" : "visible";
  const opacity = shouldClose ? 0 : 1;
  const popupWidth = shouldClose ? "60px" : "96%";
  const popupHeight = shouldClose ? "60px" : "96%";
  const popupBorderRadius = shouldClose ? "50px" : "10px";

  resultDiv.style.opacity = opacity;
  resultDiv.style.visibility = visibility;
  btnsWrapper.style.opacity = opacity;
  btnsWrapper.style.visibility = visibility;

  popupDiv.style.width = popupWidth;
  popupDiv.style.height = popupHeight;
  popupDiv.style.borderRadius = popupBorderRadius;

  if (!shouldClose) {
    iconDiv.style.opacity = 0;
    iconDiv.style.visibility = "hidden";
    iconDiv.removeEventListener("click", minimizeResultWindow);
  }

  shouldClose ? popupDiv.appendChild(iconDiv) : popupDiv.removeChild(iconDiv);

  if (shouldClose) {
    setTimeout(function () {
      iconDiv.style.visibility = "visible";
      iconDiv.style.opacity = 1;
      iconDiv.addEventListener("click", minimizeResultWindow.bind(this, false));
    }, 500);
  }
};

// document.querySelectorAll('.zw-paragraph')[10].textContent.trim()

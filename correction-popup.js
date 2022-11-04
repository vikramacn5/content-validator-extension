// import { diffCheck } from "./diff-checker.js";

// const headTag = document.querySelector("head");
// headTag.insertAdjacentHTML(
//   "beforeend",
//   `
//   <style>
//   .virtual-content::-webkit-scrollbar {
//     width: 8px;
//   }
//   .virtual-content::-webkit-scrollbar-track {
//     background: #333;
//     border-radius: 10px;
//   }

//   .virtual-content::-webkit-scrollbar-thumb {
//     background: #666;
//     border-radius: 10px;
//   }
//   .virtual-content::-webkit-scrollbar-thumb:hover {
//     background: #555;
//   }
// </style>
// `
// );

let currentCorrectText, currentPageText, currentElement;

// let isCorrectedTextShowing = false;

const removeContentTip = function () {
  const bodyEl = document.querySelector("body");
  const contentTip = document.querySelector(".content-tip");
  if (contentTip) bodyEl.removeChild(contentTip);
};

const hoverHandler = function (e) {
  console.log("from handler", { currentPageText }, { currentCorrectText });
  let isCorrectedTextShowing = false;
  const correctElement = diffCheck(currentPageText, currentCorrectText);
  removeContentTip();
  console.log(this.getBoundingClientRect(), this, correctElement);

  const elementPosition = this.getBoundingClientRect();
  const topPosition = window.pageYOffset + elementPosition.top;

  // const contentTipWraper = document.createElement('div');
  const contentTip = document.createElement("div");
  const arrow = document.createElement("span");
  const optionsWrapper = document.createElement("div");
  const correctCorrectionOption = document.createElement("span");
  const clipboardCopy = document.createElement("span");

  contentTip.classList.add("content-tip");
  arrow.classList.add("arrow");
  optionsWrapper.classList.add("extn-cv-tip-options-wrapper");
  correctCorrectionOption.classList.add(
    "extn-cv-tip-correct-correction-option"
  );
  clipboardCopy.classList.add("clip-copy");

  clipboardCopy.addEventListener("mouseenter", function () {
    this.style.color = "#fff";
  });

  clipboardCopy.addEventListener("mouseleave", function () {
    this.style.color = "#bbb";
  });

  correctCorrectionOption.addEventListener("mouseenter", function () {
    this.style.color = "#fff";
  });

  correctCorrectionOption.addEventListener("mouseleave", function () {
    this.style.color = "#bbb";
  });

  // correctCorrectionOption.addEventListener("click", function () {
  //   console.log(correctText);
  // });

  const virtualContentEl = correctElement.querySelector(".virtual-content");
  const correctionText = virtualContentEl.innerHTML;

  correctCorrectionOption.addEventListener("click", function () {
    this.textContent = !isCorrectedTextShowing
      ? "Show correction text"
      : "Show corrected text";
    console.log(correctElement);

    virtualContentEl.innerHTML = !isCorrectedTextShowing
      ? currentCorrectText
      : correctionText;
    console.log(correctionText);
    isCorrectedTextShowing = !isCorrectedTextShowing;
  });

  clipboardCopy.addEventListener("click", function () {
    this.textContent = "Copied";
    console.log(currentCorrectText);
    navigator.clipboard.writeText(currentCorrectText);
  });

  contentTip.style.cssText = `
    background-color: rgb(51, 51, 51);
    position: absolute;
    top: ${topPosition}px;
    transform:translateY(-110%);
    left: ${elementPosition.left}px;
    padding: 0 0 20px;
    z-index: 10000;
    border-radius: 15px;
    box-shadow: 3px 6px 20px rgb(0 0 0 / 50%);
    color: #bbb;
    font-size: 18px;
    visibility: hidden;
  `;

  arrow.innerHTML = "&nbsp;";
  arrow.style.cssText = `
    bottom: -10px;
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: rgb(51, 51, 51);
    transform: rotate(45deg);
    left: 0;
    right: 0;
    margin: auto;
  `;

  optionsWrapper.style.cssText = `
    padding: 15px;
    display: flex;
    justify-content: end;
    gap: 10px;
  `;

  correctCorrectionOption.textContent = "Show corrected text";
  correctCorrectionOption.style.cssText = `
    cursor: pointer;
    background-color: #222;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 7px;
    transition: color 0.2s ease;
  `;

  clipboardCopy.textContent = "Copy";
  clipboardCopy.style.cssText = `
    cursor: pointer;
    background-color: #222;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 7px;
    transition: color 0.2s ease;
  `;

  optionsWrapper.appendChild(correctCorrectionOption);
  optionsWrapper.appendChild(clipboardCopy);
  contentTip.appendChild(optionsWrapper);
  // contentTip.appendChild(clipboardCopy);
  contentTip.appendChild(arrow);
  contentTip.appendChild(correctElement);

  document.querySelector("body").appendChild(contentTip);
  const contentTipPosition = contentTip.getBoundingClientRect();
  const documentWidth = document
    .querySelector("body")
    .getBoundingClientRect().width;
  const contentTipHeight = contentTipPosition.height;
  const contentTipRight = contentTipPosition.right;

  if (topPosition < contentTipHeight) {
    contentTip.style.transform = "translateY(0)";
    contentTip.style.top = "0px";
  }
  if (contentTipRight > documentWidth) {
    contentTip.style.left = "auto";
    contentTip.style.right = "0px";
  }
  contentTip.style.visibility = "visible";
};

const addHoverListener = function (shouldAdd, element, correctText, pageText) {
  currentCorrectText = correctText;
  currentPageText = pageText;
  currentElement = element;

  console.log(
    "from addHover",
    { currentCorrectText },
    { currentPageText },
    { correctText },
    { pageText }
  );

  if (shouldAdd) {
    element.addEventListener("mouseenter", hoverHandler);
  } else {
    element.removeEventListener("mouseenter", hoverHandler);
  }
};

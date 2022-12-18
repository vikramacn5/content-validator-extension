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

// let currentCorrectText, currentPageText, currentElement;

// let isCorrectedTextShowing = false;

let currentCorrectionPopup;

const removeContentTip = function () {
  const bodyEl = document.querySelector("body");
  const contentTip = document.querySelector(".extn-cv-content-tip");
  if (contentTip) {
    bodyEl.removeChild(contentTip);
    isCorrectionPopupOpen = false;
  }
};

const addCorrectionPopup = function (
  correctText,
  correctionHTML,
  pageText,
  correctElement
) {
  if (isCorrectionPopupOpen && currentCorrectionPopup === this) {
    return;
  }
  correctElement.firstElementChild.innerHTML = correctionHTML;
  console.log(
    "from handler",
    { pageText },
    { correctText },
    { correctionHTML },
    { correctElement }
  );
  let isCorrectedTextShowing = false;
  // const correctElement = diffCheck(pageText, correctText);
  removeContentTip();
  isCorrectionPopupOpen = true;
  currentCorrectionPopup = this;
  console.log(this.getBoundingClientRect(), this, correctElement);

  const elementPosition = this.getBoundingClientRect();
  const topPosition = window.pageYOffset + elementPosition.top;

  // const contentTipWraper = document.createElement('div');
  const contentTip = document.createElement("div");
  const arrow = document.createElement("span");
  const optionsWrapper = document.createElement("div");
  const correctCorrectionOption = document.createElement("span");
  const clipboardCopy = document.createElement("span");

  contentTip.classList.add("extn-cv-content-tip");
  arrow.classList.add("extn-cv-arrow");
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

  const virtualContentEl = correctElement.querySelector(
    ".extn-cv-virtual-content"
  );
  // const correctionText = virtualContentEl.innerHTML;

  correctCorrectionOption.addEventListener("click", function () {
    this.textContent = !isCorrectedTextShowing
      ? "Show correction text"
      : "Show corrected text";
    console.log(correctElement);

    virtualContentEl.innerHTML = !isCorrectedTextShowing
      ? correctText
      : correctionHTML;
    console.log(correctionHTML);
    isCorrectedTextShowing = !isCorrectedTextShowing;
    console.log({ isCorrectedTextShowing });
  });

  clipboardCopy.addEventListener("click", function () {
    this.textContent = "Copied";
    console.log(correctText);
    navigator.clipboard.writeText(correctText);
  });

  contentTip.style.cssText = `
    background-color: rgb(51, 51, 51);
    position: absolute;
    top: ${topPosition}px;
    transform:translate(-50%, -110%);
    left: ${(elementPosition.left + elementPosition.right) / 2}px;
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
    bottom: -25px;
    position: absolute;
    height: 30px;
    width: 30px;
    clip-path: polygon(0 0, 100% 0, 50% 55%);
    background-color: rgb(51, 51, 51);
    transform: translateX(0);
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
  const contentTipLeft = contentTipPosition.left;

  console.log(
    { documentWidth },
    { contentTipHeight },
    { contentTipRight },
    { contentTipLeft }
  );

  const translateX =
    contentTipLeft < 0 || contentTipRight > documentWidth ? 0 : -50;

  const translateY = topPosition < contentTipHeight ? 0 : -110;

  contentTip.style.transform = `translate(${translateX}%, ${translateY}%)`;
  if (topPosition < contentTipHeight) {
    // contentTip.style.transform = `translate(${translateX}%, ${translateY}%)`;
    contentTip.style.top = "0px";
  }
  if (contentTipRight > documentWidth) {
    contentTip.style.left = "auto";
    contentTip.style.right = "0px";
    arrow.style.transform = `translateX(${contentTipRight - documentWidth}px)`;
  }
  if (contentTipLeft < 0) {
    contentTip.style.left = "0px";
    arrow.style.transform = `translateX(${contentTipLeft}px)`;
    // contentTip.style.transform = 0;
  }
  contentTip.style.visibility = "visible";
};

// const addHoverListener = function (shouldAdd, element, correctText, pageText) {
//   currentCorrectText = correctText;
//   currentPageText = pageText;
//   currentElement = element;

//   console.log(
//     "from addHover",
//     { currentCorrectText },
//     { currentPageText },
//     { correctText },
//     { pageText }
//   );

//   if (shouldAdd) {
//     element.addEventListener("mouseenter", hoverHandler);
//   } else {
//     element.removeEventListener("mouseenter", hoverHandler);
//   }
// };

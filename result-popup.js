function subResultToggleHandler() {
  this.classList.toggle("close");
  const subResultContainer = this.parentElement.querySelector(
    ".extn-cv-sub-result-wrapper"
  );
  if (this.classList.contains("close")) {
    subResultContainer.style.height = 0;
  } else {
    subResultContainer.style.height = subResultContainer.dataset.height + "px";
  }
}

const spanArr = [];

for (let i = 0; i < 3; i++) {
  const toggler = document.createElement("span");
  toggler.textContent = "&nbsp;";
  toggler.classList.add("extn-cv-sub-result-toggle");
  toggler.addEventListener("click", subResultToggleHandler);
  spanArr.push(toggler);
}

const createMissingContentDiv = function () {
  const missingContentDiv = document.createElement("div");
  missingContentDiv.appendChild(spanArr[0]);
  missingContentDiv.insertAdjacentHTML(
    "beforeend",
    `
    <h3 class = "extn-cv-sub-result-heading">Contents missing in page</h3>
    <div class = "extn-cv-sub-result-wrapper extn-cv-sub-result-missing-content">
      <div>
        <div>
          <h4>Writer content</h4>
        </div>
        ${resultsObject.missing
          .map((content) => {
            return `
          <div>
            <p>${content}</p>
          </div>
          `;
          })
          .join(" ")}
      </div>
    </div>
  `
  );
  return missingContentDiv;
};

const createDynamicInnerContent = function (isMajor) {
  const subResultWrapper = document.createElement("div");
  subResultWrapper.classList.add(
    "extn-cv-sub-result-wrapper",
    `extn-cv-sub-result-${isMajor ? "major" : "minor"}-faults`
  );

  const subResultWrapperInner = document.createElement("div");

  const subResultTabTitleWrapper = document.createElement("div");
  subResultTabTitleWrapper.innerHTML = `
    <h4>Page content</h4>
    <h4>Writer Content</h4>
    <h4>Match range</h4>
  `;

  subResultWrapperInner.appendChild(subResultTabTitleWrapper);

  (isMajor ? resultsObject.major : resultsObject.minor).forEach(function (
    contentObject
  ) {
    const subResultTabContentWrapper = document.createElement("div");
    const subResultPageContent = document.createElement("p");
    subResultPageContent.classList.add("extn-cv-sub-page-content");
    subResultPageContent.textContent = contentObject.pageContent;
    subResultPageContent.addEventListener("click", function () {
      contentObject.pageElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
    subResultTabContentWrapper.appendChild(subResultPageContent);

    subResultTabContentWrapper.insertAdjacentHTML(
      "beforeend",
      `
      <p>${contentObject.writerContent}</p>
      <p>${(contentObject.matchRange * 100).toFixed(1)}%</p>
    `
    );

    subResultWrapperInner.appendChild(subResultTabContentWrapper);
  });
  subResultWrapper.appendChild(subResultWrapperInner);
  return subResultWrapper;
};

const createSubResultHeading = function (isMajor) {
  const subResultHeading = document.createElement("h3");
  subResultHeading.classList.add("extn-cv-sub-result-heading");
  subResultHeading.textContent = isMajor
    ? "Contents with match range 70% or more"
    : "Contents with match range 90% or more";
  return subResultHeading;
};

const createMajorFaultsDiv = function () {
  const majorFaultsDiv = document.createElement("div");
  majorFaultsDiv.appendChild(spanArr[1]);
  majorFaultsDiv.appendChild(createSubResultHeading(true));
  majorFaultsDiv.appendChild(createDynamicInnerContent(true));
  return majorFaultsDiv;
};

const createMinorFaultsDiv = function () {
  const minorFaultsDiv = document.createElement("div");
  minorFaultsDiv.appendChild(spanArr[2]);
  minorFaultsDiv.appendChild(createSubResultHeading(false));
  minorFaultsDiv.appendChild(createDynamicInnerContent(false));
  return minorFaultsDiv;
};

const resultDiv = document.createElement("div");
resultDiv.classList.add("extn-cv-result-wrapper");
resultDiv.style.cssText = `
  width: 100%;
  height: 100%;
  padding: 60px;
  color: #bbb;
  overflow-y: scroll;
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const getResults = function () {
  console.log(resultsObject);

  resultDiv.innerHTML = "";
  resultsObject.missing.length &&
    resultDiv.appendChild(createMissingContentDiv());
  resultsObject.major.length && resultDiv.appendChild(createMajorFaultsDiv());
  resultsObject.minor.length && resultDiv.appendChild(createMinorFaultsDiv());

  return resultDiv;
};

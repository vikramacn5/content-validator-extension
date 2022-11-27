function subResultToggleHandler() {
  this.classList.toggle("close");
  const subResultContainer = this.parentElement.querySelector(
    ".extn-cv-sub-result-wrapper"
  );

  const getInnerDivHeight = function () {
    const innerDiv = subResultContainer.firstElementChild;
    const innerDivMargin = parseInt(
      window.getComputedStyle(innerDiv).marginBottom
    );
    return (
      parseInt(innerDiv.getBoundingClientRect().height + innerDivMargin) + "px"
    );
  };

  if (this.classList.contains("close")) {
    subResultContainer.style.height = getInnerDivHeight();
    setTimeout(function () {
      subResultContainer.style.height = 0;
    }, 100);
  } else {
    subResultContainer.style.height = getInnerDivHeight();
    setTimeout(function () {
      subResultContainer.style.height = "auto";
    }, 500);
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
      if (!isResultWindowHalf) {
        resizeResultWindow();
      }

      const { top: scrollTop } = this.closest("div").getBoundingClientRect();
      const resultWrapper = this.closest(".extn-cv-result-wrapper");
      resultWrapper.scrollTo({
        top: resultWrapper.scrollTop + scrollTop - 100,
        behavior: "smooth",
      });

      const pageElementPosition =
        contentObject.pageElement.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + pageElementPosition.bottom - window.innerHeight,
        behavior: "smooth",
      });
    });
    subResultTabContentWrapper.appendChild(subResultPageContent);

    const subResultWriterContent = document.createElement("p");
    subResultWriterContent.classList.add(
      "extn-cv-sub-writer-content",
      "extn-cv-result-corrected-content"
    );
    subResultWriterContent.textContent = contentObject.writerContent;
    subResultWriterContent.addEventListener("click", function () {
      if (this.classList.contains("extn-cv-result-corrected-content")) {
        this.innerHTML =
          contentObject.correctionElement.querySelector(
            ".virtual-content"
          ).innerHTML;
      } else {
        this.textContent = contentObject.writerContent;
      }
      this.classList.toggle("extn-cv-result-corrected-content");
    });

    subResultTabContentWrapper.appendChild(subResultWriterContent);

    subResultTabContentWrapper.insertAdjacentHTML(
      "beforeend",
      `<p>${(contentObject.matchRange * 100).toFixed(1)}%</p>`
    );

    subResultWrapperInner.appendChild(subResultTabContentWrapper);
  });
  subResultWrapper.appendChild(subResultWrapperInner);
  return subResultWrapper;
};

const createSubResultHeading = function (isMajor) {
  const subResultHeading = document.createElement("h3");
  subResultHeading.classList.add("extn-cv-sub-result-heading");
  subResultHeading.innerHTML = isMajor
    ? `Contents with match range 70% or more <span style = "color: #ff7070;">(Contents with red background)</span>`
    : `Contents with match range 90% or more <span style = "color: #e0c552;">(Contents with yellow background)</span>`;
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

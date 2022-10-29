const resultDiv = document.createElement("div");
resultDiv.classList.add("extn-cv-result-wrapper");
resultDiv.style.cssText = `
  width: 100%;
  height: 100%;
  padding: 60px;
  color: #bbb;
  overflow-y: scroll;
`;

function subResultToggleHandler() {
  this.classList.toggle("close");
  console.log(this.parentElement.querySelector(".extn-cv-sub-result-wrapper"));
}

const spanArr = [];

for (let i = 0; i < 3; i++) {
  const toggler = document.createElement("span");
  toggler.textContent = "&nbsp;";
  toggler.classList.add("extn-cv-sub-result-toggle");
  toggler.addEventListener("click", subResultToggleHandler);
  spanArr.push(toggler);
}

const subResultMissingToggler = document.createElement("span");
subResultMissingToggler.textContent = "&nbsp;";
subResultMissingToggler.classList.add("extn-cv-sub-result-toggle");
subResultMissingToggler.addEventListener("click", subResultToggleHandler);

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
        <h4>Page Content</h4>
        <h4>Match range</h4>
      </div>
      <div>
        <p>The Zoho Calendar app on your mobile device makes it easy for you to access your online calendar, helping you stay organized by scheduling events and meetings by just reaching for your phone.</p>
        <p>The Zoho Calendar app on your mobile device makes it easy to access your online calendar, helping you stay by scheduling events and meetings by just reaching for your phone.</p>
        <p>88%</p>
      </div>
      <div>
        <p>The Zoho Calendar app on your mobile device makes it easy for you to access your online calendar, helping you stay organized by scheduling events and meetings by just reaching for your phone.</p>
        <p>The Zoho Calendar app on your mobile device makes it easy to access your online calendar, helping you stay by scheduling events and meetings by just reaching for your phone.</p>
        <p>88%</p>
      </div>
    </div>
  </div>
`
);

const majorFaultsDiv = document.createElement("div");
majorFaultsDiv.appendChild(spanArr[1]);
majorFaultsDiv.insertAdjacentHTML(
  "beforeend",
  `
  <h3 class = "extn-cv-sub-result-heading">Contents with match range 70% or more</h3>
  <div class = "extn-cv-sub-result-wrapper extn-cv-sub-result-major-faults">
    <div>
      <div>
        <h4>Writer content</h4>
        <h4>Page Content</h4>
        <h4>Match range</h4>
      </div>
      <div>
        <p>The Zoho Calendar app on your mobile device makes it easy for you to access your online calendar, helping you stay organized by scheduling events and meetings by just reaching for your phone.</p>
        <p>The Zoho Calendar app on your mobile device makes it easy to access your online calendar, helping you stay by scheduling events and meetings by just reaching for your phone.</p>
        <p>88%</p>
      </div>
    </div>
  </div>
`
);

const minorFaultsDiv = document.createElement("div");
minorFaultsDiv.appendChild(spanArr[2]);
minorFaultsDiv.insertAdjacentHTML(
  "beforeend",
  `
  <h3 class = "extn-cv-sub-result-heading">Contents with match range 90% or more</h3>
  <div class = "extn-cv-sub-result-wrapper extn-cv-sub-result-minor-faults">
    <div>
      <div>
        <h4>Writer content</h4>
        <h4>Page Content</h4>
        <h4>Match range</h4>
      </div>
      <div>
        <p>The Zoho Calendar app on your mobile device makes it easy for you to access your online calendar, helping you stay organized by scheduling events and meetings by just reaching for your phone.</p>
        <p>Online calendar on your mobile to help scheduling
        The Zoho Calendar app on your mobile device makes it easy to access your online calendar, helping you stay by scheduling events and meetings by just reaching for your phone.</p>
        <p>88%</p>
      </div>
    </div>
  </div>
`
);

resultDiv.appendChild(missingContentDiv);
resultDiv.appendChild(majorFaultsDiv);
resultDiv.appendChild(minorFaultsDiv);

const getResults = function () {
  return resultDiv;
};

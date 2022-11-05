// import { compareTwoStrings } from "./compare-string.js";
// import { diffCheck } from "./diff-checker.js";
// import { addHoverListener } from "./view.js";
// import { removeContentTip } from "./view.js";

let matchedElements = [];

const mainFunctionalityInit = function (content) {
  const resultsObject = {
    missing: [],
    major: [],
    minor: [],
  };

  const body = document.querySelector("body");
  body.addEventListener("click", function (e) {
    !e.target.closest(".content-tip") && removeContentTip();
  });

  // const content = `
  //   Zoho Calendar Mobile App Webpage Content

  //   Online calendar on your mobile to help scheduling
  //   The Zoho Calendar app on your mobile device makes it easy for you to access your online calendar, helping you stay organized by scheduling events and meetings by just reaching for your phone.

  //   Map to the rescue!
  //   Arrive at your meeting room without hassle with linked Google/Apple maps that guide you to the route when you just tap on the location you've entered.

  //   Forward and collaborate
  //   Forward meeting invites to new invitees who were uninvited, and let them react with a response as Yes, Maybe, or No to the invite.

  //   Available?! Then schedule.
  //   Be it participants or meeting rooms, both are necessary to schedule a meeting. Check availability beforehand at specified time slots and minimize cancellation/deletion chaos.

  //   Progress with a conference
  //   Link the conference app, Zoho Meeting to the events you create and collaborate more effectively with online discussion sessions. Also, record, download, and share content for those who missed the conference and for attendees' future reference.

  //   Simply drag and drop
  //   You'll no longer have to manually set or change your event timings. To host your meetings, simply drag and drop the event into the calendar grid to the convenient time slots in the one-day, three-day, or one-week views.

  //   Change the layout
  //   Change the calendar layout with five different views—one day, three days, one week, one month, and agenda to get an at-a-glance outlook of the events in your schedule.

  //   Native calendar sync
  //   Effortlessly access the events you've created in the calendar app on your mobile device from the Zoho Calendar mobile app by simply syncing all of your event data from your native calendar.

  //   Footer Text
  //   All your meetings and schedules at your fingertip.
  //   `;

  const refinedContentArray = [];
  content.split("\n").forEach((text) => {
    const trimmedText = text.trim();
    trimmedText && refinedContentArray.push(trimmedText);
  });

  console.log(refinedContentArray);

  const textNodesUnder = function (node) {
    var all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
      if (node.nodeType == 3) all.push(node);
      else all = all.concat(textNodesUnder(node));
    }
    return all;
  };

  const initialNode = document.querySelector(".template-inner");

  const allTextNodes = textNodesUnder(initialNode);

  const allTextElements = allTextNodes
    .filter((node) => node.textContent.trim().length > 0)
    .map((node) => node.parentElement);

  console.log(allTextElements);

  console.log(matchedElements);
  const resetListenersAndBackground = function () {
    matchedElements.forEach((elementEntry) => {
      elementEntry.el.style.removeProperty("background-color");
      elementEntry.hoverHandler &&
        elementEntry.el.removeEventListener(
          "mouseenter",
          elementEntry.hoverHandler
        );
    });
    matchedElements = [];
  };

  resetListenersAndBackground();

  console.log(matchedElements);
  const cleanContent = function (content) {
    return content.trim().replaceAll("’", "'").replace(/\s+/g, " ");
  };

  // const checkIfHeading = function (node) {
  //   const headingTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
  //   headingTags.forEach((headTag) => node.localName);
  //   node.localName === "h1" || node;
  // };

  for (let i = 0; i < refinedContentArray.length; i++) {
    let containsContent;
    let matchRange;

    for (let j = 0; j < allTextElements.length; j++) {
      const text1 = refinedContentArray[i];
      // console.log("hello", allTextElements[j].textContent);
      const text2 = cleanContent(allTextElements[j].textContent);

      matchRange = compareTwoStrings(text1, text2);

      if (matchRange === 1) {
        containsContent = true;
        matchedElements.push({ el: allTextElements[j] });
        allTextElements[j].style.backgroundColor = "lightgreen";
        break;
      } else if (matchRange >= 0.9) {
        containsContent = `${text2}, Slight change with ${(
          matchRange * 100
        ).toFixed(2)} percentage match range`;
        allTextElements[j].style.backgroundColor = "#e0c552";
        // const diffElement = diffCheck(text2, text1);
        const hoverHandler = function () {
          addCorrectionPopup.call(this, text1, text2);
        };
        matchedElements.push({ el: allTextElements[j], hoverHandler });
        allTextElements[j].addEventListener("mouseenter", hoverHandler);
        // addHoverListener(true, allTextElements[j], text1, text2);
        // allTextElements[j].innerHTML = diffElement.innerHTML;
        resultsObject.minor.push({
          pageElement: allTextElements[j],
          pageContent: text2,
          writerContent: text1,
          matchRange,
        });
        break;
      } else if (matchRange >= 0.75 && matchRange < 0.9) {
        containsContent = `${text2}, A lot of changes with ${(
          matchRange * 100
        ).toFixed(2)} percentage match range`;
        allTextElements[j].style.backgroundColor = "#ff7070";
        // const diffElement = diffCheck(text2, text1);
        const hoverHandler = function () {
          addCorrectionPopup.call(this, text1, text2);
        };
        matchedElements.push({ el: allTextElements[j], hoverHandler });
        allTextElements[j].addEventListener("mouseenter", hoverHandler);
        // addHoverListener(true, allTextElements[j], text1, text2);
        // allTextElements[j].innerHTML = diffElement.innerHTML;
        resultsObject.major.push({
          pageElement: allTextElements[j],
          pageContent: text2,
          writerContent: text1,
          matchRange,
        });
        break;
      }
    }
    if (matchRange < 0.75) {
      resultsObject.missing.push(refinedContentArray[i]);
    }
    console.log(
      containsContent ??
        (false, refinedContentArray[i] + " is not present on the page")
    );
  }
  return resultsObject;
};

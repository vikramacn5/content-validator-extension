"use strict";

// import { diff } from "./fast-diff.js";

// export const diffCheck = function (pageContent, writerContent) {
//   let span = null;

//   const diff = Diff.diffChars(pageContent, writerContent),
//     fragment = document.createElement("span");

//   diff.forEach((part) => {
//     const color = part.added ? "green" : part.removed ? "red" : "currentcolor";
//     span = document.createElement("span");
//     span.style.color = color;
//     if (part.value === " ") span.style.background = color;
//     span.appendChild(document.createTextNode(part.value));
//     fragment.appendChild(span);
//   });

//   return fragment;
// };

const dmp = new diff_match_patch();
const diffCheck = function (pageContent, writerContent) {
  let span = "null";
  const result = dmp.diff_main(pageContent, writerContent);

  dmp.diff_cleanupSemantic(result);
  // const result = diff(pageContent, writerContent);

  const fragment = document.createElement("span");
  fragment.classList.add("virtual-content");
  fragment.style.cssText = `
    display: inline-block;
    max-height: 180px;
    width: 400px;
    overflow-y: scroll;
    padding: 0 30px;
  `;

  result.forEach((part) => {
    const color = part[0] === 1 ? "#09d909" : part[0] === -1 ? "red" : "#bbb";
    // const background =
    //   part[0] === 1 ? "#cee9ce" : part[0] === -1 ? "#ffbaba" : "transparent";
    span = document.createElement("span");
    span.style.color = color;
    if (part[1] === " ")
      span.style.background = `linear-gradient(to bottom, transparent 12%, ${color} 12%, ${color} 88%, transparent 88%)`;
    // span.style.background = background;
    span.appendChild(document.createTextNode(part[1]));
    fragment.appendChild(span);
  });

  const fragmentWrapper = document.createElement("span");
  fragmentWrapper.appendChild(fragment);
  return fragmentWrapper;
};

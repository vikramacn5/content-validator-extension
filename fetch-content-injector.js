console.log("from injector");
// document.head.insertAdjacentHTML(
//   "afterbegin",
//   `<meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'">`
// );

const delay = (sec) => new Promise((res) => setTimeout(() => res(), sec));

let totalPage;

const waitForElm = function (selector, shouldCheckText, parent = document) {
  return new Promise(async (resolve, reject) => {
    if (parent.querySelector(selector)) {
      await delay(1000);
      if (shouldCheckText) {
        if (parent.querySelector(selector).textContent != "") {
          return resolve(parent.querySelectorAll(selector));
        }
      } else {
        console.log(parent.querySelectorAll(selector), "on load");
        return resolve(parent.querySelectorAll(selector));
      }
    }

    let timeDelay, observer;
    timeDelay = setTimeout(() => {
      resolve(false);
      observer.disconnect();
    }, 20000);

    observer = new MutationObserver(async (mutations) => {
      if (parent.querySelector(selector)) {
        // await delay(1000);
        if (shouldCheckText) {
          if (parent.querySelector(selector).textContent != "") {
            resolve(parent.querySelectorAll(selector));
            observer.disconnect();
            clearTimeout(timeDelay);
          }
        } else {
          resolve(parent.querySelectorAll(selector));
          observer.disconnect();
        }
        // await delay(2000);
        // observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

window.addEventListener("load", async (e) => {
  // const testScript = document.createElement("script");
  // testScript.textContent = `console.log('hello')`;
  // document.body.appendChild(testScript);
  await delay(10000);
  const textContent = docProps.content.content;

  // console.log("hi");
  // let textContent = [];
  // let pageContainers = await waitForElm(".zw-pagecontainer");
  // if (pageContainers) {
  //   await waitForElm(".zw-paragraph", true);
  // }
  // let pageCounter = 0;
  // while (pageCounter < pageContainers.length) {
  //   await delay(1000);
  //   pageContainers[pageCounter].scrollIntoView();
  //   const paraDivs = await waitForElm(
  //     ".zw-paragraph",
  //     true,
  //     pageContainers[pageCounter]
  //   );
  //   paraDivs.forEach((paraDiv) => textContent.push(paraDiv.textContent));
  //   pageContainers = await waitForElm(".zw-pagecontainer");
  //   pageCounter++;
  // }

  // textContent = textContent
  //   .map((para) => para.trim())
  //   .filter((para) => para != "");
  // console.log(textContent);

  const response = await chrome.runtime.sendMessage({
    type: "writer-content",
    textContent,
  });
  console.log(response);
});

// const writerContent = Array.from(
//     document.querySelectorAll(".zw-paragraph"),
//     (paraDiv) => paraDiv.textContent.trim()
//   )
//     .filter((paraContent) => paraContent !== "")
//     .reduce((acc, paraContent) => acc + "\n" + paraContent, "");

//   console.log(writerContent);

// const delay = (sec) => new Promise(res => setTimeout(() => res(), sec));

// (async() => {
//     let counter = 0;

//     const textContent = [];

//     let pages = document.querySelectorAll('.zw-pagecontainer');

//     while(counter < pages.length){
//         pages[counter].scrollIntoView();
//         await delay(1000);
//         pages[counter].querySelectorAll('.zw-paragraph').forEach(paraDiv => textContent.push(paraDiv.textContent));
//         counter++;
//         pages = document.querySelectorAll('.zw-pagecontainer');
//     }

//     console.log(textContent);
// })();

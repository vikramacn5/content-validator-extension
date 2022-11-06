console.log("from injector");

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

    const observer = new MutationObserver(async (mutations) => {
      if (parent.querySelector(selector)) {
        await delay(1000);
        if (shouldCheckText) {
          if (parent.querySelector(selector).textContent != "") {
            resolve(parent.querySelectorAll(selector));
            observer.disconnect();
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
  console.log("hi");
  totalPage = await waitForElm("#totalPage", true);
  totalPage = +totalPage[0].textContent.split(" ")[1];
  console.log(totalPage, "as a result");
  const domPages = await waitForElm(".zw-pagecontainer");
  while (domPages.length < totalPage) {
    domPages = await waitForElm(".zw-pagecontainer");
  }
  console.log(domPages);
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

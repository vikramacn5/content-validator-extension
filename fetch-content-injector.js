console.log("from injector");

const wait = (sec) => new Promise((res) => setTimeout(() => res(), sec));

let totalPage;

const waitForElm = function (selector, shouldCheckText) {
  return new Promise(async (resolve, reject) => {
    if (document.querySelector(selector)) {
      if (shouldCheckText) {
        if (document.querySelector(selector).textContent != "") {
          return resolve(document.querySelectorAll(selector));
        }
      } else {
        console.log(document.querySelectorAll(selector), "on load");
        return resolve(document.querySelectorAll(selector));
      }
    }

    const observer = new MutationObserver(async (mutations) => {
      if (document.querySelector(selector)) {
        if (shouldCheckText) {
          if (document.querySelector(selector).textContent != "") {
            resolve(document.querySelectorAll(selector));
            observer.disconnect();
          }
        } else {
          resolve(document.querySelectorAll(selector));
          observer.disconnect();
        }
        // await wait(2000);
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
  await waitForElm();
  await waitForElm(".zw-pageContainer");
});

// const writerContent = Array.from(
//     document.querySelectorAll(".zw-paragraph"),
//     (paraDiv) => paraDiv.textContent.trim()
//   )
//     .filter((paraContent) => paraContent !== "")
//     .reduce((acc, paraContent) => acc + "\n" + paraContent, "");

//   console.log(writerContent);

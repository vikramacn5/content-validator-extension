// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.local.set({
//     isPopupOpen: false,
//   });
// });

let mainTab;

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    async (tabInfo) => {
      console.log(tabInfo);
      mainTab = tabInfo[0];
      const response = await chrome.tabs.sendMessage(tabInfo[0].id, {
        type: "action-click",
        text: "action button clicked",
      });
      console.log(response);
    }
  );
  // chrome.storage.local.get(["isPopupOpen"], (res) => {
  //   chrome.storage.local.set({
  //     isPopupOpen: !res.isPopupOpen,
  //   });
  //   chrome.tabs.query(
  //     {
  //       active: true,
  //       currentWindow: true,
  //     },
  //     (tabInfo) => {
  //       const message = !res.isPopupOpen;
  //       chrome.tabs.sendMessage(tabInfo[0].id, message, (response) => {
  //         console.log(response);
  //       });
  //       console.log(tabInfo);
  //     }
  //   );
  //   // chrome.tabs.sendMessage('')
  //   console.log(res.isPopupOpen);
  // });

  // isOpen = !isOpen;
  // console.log(isOpen);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "writer-url") {
    console.log(message.writerUrl, sender);
    const injectFunction = function () {
      try {
        if (docProps && docProps.content) {
          console.log(docProps?.content?.content);
          return docProps.content;
        } else {
          return null;
        }
      } catch (e) {
        console.log(e.message);
        return null;
      }
      // setTimeout(() => {
      //   console.log(docProps);
      //   return docProps;
      // }, 10000);
    };

    const injectScript = async function () {
      const tabInfo = await chrome.tabs.create({
        active: false,
        url: message.writerUrl,
      });
      console.log(tabInfo);
      const injectionResult = await chrome.scripting.executeScript({
        // files: ["./fetch-content-injector.js"],
        world: "MAIN",
        func: injectFunction,
        target: {
          tabId: tabInfo.id,
        },
      });

      chrome.tabs.remove(tabInfo.id).catch((e) => console.log(e.message));
      console.log(injectionResult[0].result);
      sendResponse(injectionResult[0].result);
    };

    injectScript();
    return true;
    // const response = await chrome.tabs.sendMessage(mainTab.id, {
    //   type: "writer-content",
    //   textContent: injectionResult[0].result,
    // });
    // console.log(response);
  }
  // else if (message.type === "writer-content") {
  //   const response = await chrome.tabs.sendMessage(mainTab.id, {
  //     type: "writer-content",
  //     textContent: message.textContent,
  //   });
  //   console.log(response);
  // }
});

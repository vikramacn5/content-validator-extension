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
    (tabInfo) => {
      console.log(tabInfo);
      mainTab = tabInfo[0];
      chrome.tabs.sendMessage(
        tabInfo[0].id,
        { type: "action-click", text: "action button clicked" },
        (response) => console.log(response)
      );
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

chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.type === "writer-url") {
    console.log(message.writerUrl, sender);
    const tabInfo = await chrome.tabs.create({
      active: false,
      url: message.writerUrl,
    });
    console.log(tabInfo);
    const injectionResult = await chrome.scripting.executeScript({
      files: ["./fetch-content-injector.js"],
      target: {
        tabId: tabInfo.id,
      },
    });

    console.log(injectionResult);
    sendResponse("Got the URL");
  } else if (message.type === "writer-content") {
    const response = await chrome.tabs.sendMessage(mainTab.id, {
      type: "writer-content",
      textContent: message.textContent,
    });
    console.log(response);
  }
});

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.local.set({
//     isPopupOpen: false,
//   });
// });

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabInfo) => {
      chrome.tabs.sendMessage(
        tabInfo[0].id,
        "action button clicked",
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
  writerUrl,
  sender,
  sendResponse
) {
  console.log(writerUrl);
  const tabInfo = await chrome.tabs.create({ active: true, url: writerUrl });
  console.log(tabInfo);
  // console.log(chrome.scripting);
  const injectionResult = await chrome.scripting.executeScript({
    files: ["./fetch-content-injector.js"],
    target: {
      tabId: tabInfo.id,
    },
  });

  console.log(injectionResult);
  sendResponse("hi");
});

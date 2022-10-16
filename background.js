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

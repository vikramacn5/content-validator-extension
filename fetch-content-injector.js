console.log("from injector");

window.addEventListener("DOMContentLoaded", (e) => {
  console.log("hi");
  const writerContent = Array.from(
    document.querySelectorAll(".zw-paragraph"),
    (paraDiv) => paraDiv.textContent.trim()
  )
    .filter((paraContent) => paraContent !== "")
    .reduce((acc, paraContent) => acc + "\n" + paraContent, "");

  console.log(writerContent);
});

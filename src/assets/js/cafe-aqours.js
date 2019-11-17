import { polyfill as smoothscroll } from "smoothscroll-polyfill";
smoothscroll();

(() => {
  const scrollPromptButton = document.getElementById("scroll-prompt");
  const vol1Container = document.getElementById("about");

  scrollPromptButton.addEventListener("click", () => {
    vol1Container.scrollIntoView({ behavior: "smooth" });
  });
})();

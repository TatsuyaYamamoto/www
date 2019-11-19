import { polyfill as smoothscroll } from "smoothscroll-polyfill";
smoothscroll();

(() => {
  // https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
  const viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  const MAX_HEIGHT_VISIBLE_TRANSLATE_BUTTON = viewportHeight * 1.5;

  const scrollPromptButton = document.getElementById("scroll-prompt");
  const vol1Container = document.getElementById("about");
  const translateButton = document.getElementById("translate-button");

  scrollPromptButton.addEventListener("click", () => {
    vol1Container.scrollIntoView({ behavior: "smooth" });
  });

  document.addEventListener("scroll", e => {
    const { scrollY } = window;

    // TODO: check performance
    if (MAX_HEIGHT_VISIBLE_TRANSLATE_BUTTON < scrollY) {
      translateButton.className = "translate-button translate-button--hide";
    } else {
      translateButton.className = "translate-button";
    }
  });
})();

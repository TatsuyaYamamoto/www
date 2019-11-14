(() => {
  const scrollPromptButton = document.getElementById("scroll-prompt");
  const vol1Container = document.getElementById("vol-1");

  scrollPromptButton.addEventListener("click", () => {
    vol1Container.scrollIntoView({ behavior: "smooth" });
  });
})();

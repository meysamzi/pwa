document.addEventListener("DOMContentLoaded", () => {
  if ("serviceWorker" in navigator)
    navigator.serviceWorker
      .register("./sw.js")
      .then((res) => console.log("Registered"))
      .catch((res) => console.log("failed to Register"));
});

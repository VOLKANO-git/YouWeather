const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city");
const errorBox = document.querySelector("#error");

form.addEventListener("submit", (event) => {
  // Stop the browser from reloading the page
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    errorBox.textContent = "Entrez un nom de ville.";
    errorBox.hidden = false;
    return;
  }

  errorBox.hidden = true;
  // The API call goes here in step 3
});
const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city");
const errorBox = document.querySelector("#error");

const city = cityInput.value.trim();
errorBox.hidden = true;
// Next step: call the API with `city`

const searchInput = document.getElementById("search");
const cards = document.querySelectorAll(".card-country");
const filterButton = document.getElementById("filter-button");
const dropdown = document.getElementById("region-dropdown");
const regionOptions = document.querySelectorAll(".dropdown p");
const darkModeButton = document.getElementById("dark-mode");
let selectedRegion = "";

function filterCountries(){
    const searchValue = searchInput.value.toLowerCase().trim();
    cards.forEach(function (card){
        const heading = card.querySelector("h2");
        const paragraph = card.querySelector("p");
        const countryName = heading.textContent.toLowerCase();
        const countryInfo = paragraph.textContent.toLowerCase();
        const matchesName = countryName.includes(searchValue);
        const matchesRegion =
            selectedRegion === "" ||
            countryInfo.includes("region: " + selectedRegion.toLowerCase());
        if (matchesName && matchesRegion){
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
searchInput.addEventListener("input", filterCountries);
filterButton.addEventListener("click", function (){
    dropdown.classList.toggle("show");
});
regionOptions.forEach(function (option){
    option.addEventListener("click", function (){
        selectedRegion = option.dataset.region;
        filterButton.textContent = selectedRegion
            ? option.textContent + " ▾"
            : "Filter by Region ▾";
        dropdown.classList.remove("show");
        filterCountries();
    });
});
document.addEventListener("click", function (event){
    if (
        !event.target.closest(".filter-container") &&
        !event.target.closest(".dropdown")
    ) {
        dropdown.classList.remove("show");
    }
});
darkModeButton.addEventListener("click", function (){
    document.body.classList.toggle("light-mode");
    const isLightMode = document.body.classList.contains("light-mode");
    darkModeButton.textContent = isLightMode
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});
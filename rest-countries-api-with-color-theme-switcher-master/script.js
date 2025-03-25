"use strict";

const carts = document.querySelector(".carts");
const filter = document.querySelector(".filter");
const regions = document.querySelector(".regions");
const darkModeButton = document.querySelector(".dark_mode_button");
const navigation = document.querySelector("nav");
const body = document.querySelector("body");
const searchBar = document.querySelector(".search_bar");
const searchSection = document.querySelector(".search_section");
const filterButton = document.querySelector(".filter_button");
const searchText = document.querySelector(".search_txt");
const region = document.querySelectorAll(".region");
const regionText = document.querySelectorAll(".region_txt");
const clearFilterBtn = document.querySelector(".clear_filter");
const moonIcon = document.querySelector(".moon_icon");
const main = document.querySelector(".main");
const navText = document.querySelector(".nav_text");

let allCountries = [];
let filteredCountries = [];
let curRegion = "";

const clearCarts = function () {
  carts.innerHTML = "";
};

const countryData = async function () {
  try {
    const res = await fetch(`./data.json`);
    if (!res.ok) throw new Error(`Failed to fetch data (${res.status})`);
    const data = await res.json();
    allCountries = data;

    renderCountries(allCountries);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

const renderCountries = function (countries) {
  clearCarts();
  const markup = countries
    .map((country) => {
      let { name, capital, region, population } = country;
      let { png } = country.flags;
      const pop = population.toLocaleString();

      return `

      <div class="cart">
      <div class="img_div">
          <img src="${png}" />
          </div>
          <div class="cart_bottom">
            <span class="cart_name">${name}</span>
            <ul>
              <li>
                <span class="li_label">Population:</span>
                <span class="li_value">${pop}</span>
              </li>
              <li>
                <span class="li_label">Region:</span>
                <span class="li_value">${region}</span>
              </li>
              <li>
                <span class="li_label">Capital:</span>
                <span class="li_value">${capital}</span>
              </li>
            </ul>
          </div>
          </div>

      `;
    })
    .join("");
  carts.insertAdjacentHTML("beforeend", markup);

  const cartElements = document.querySelectorAll(".cart");
  if (navigation.classList.contains("dark_elements")) {
    cartElements.forEach((cart) => cart.classList.add("dark_elements"));
  }
};

const generateBorderCountries = function (codes) {
  const borderCountries = codes.map((code) => {
    const country = allCountries.find((country) => country.alpha3Code === code);
    return country ? country.name : `Unknown (${code})`;
  });

  console.log("Border Countries:", borderCountries);
  const string = borderCountries
    .map((code) => `<button class="neighbor_button">${code}</button>`)
    .join("");
  // console.log(string);
  return string;
};

const showDetaildInfo = function (countryName) {
  clearCarts();
  const country = allCountries.find((country) => country.name === countryName);

  if (!country) {
    console.log(`Country with name ${countryName} not found`);
    return;
  }

  // console.log(country);

  let {
    name,
    nativeName,
    subregion,
    currencies = [],
    languages = [],
    capital,
    region,
    population,
    borders = [],
  } = country;

  let { png } = country.flags;
  let domain = country.topLevelDomain ? country.topLevelDomain[0] : "N/A";
  const currencie = currencies.length > 0 ? currencies[0].name : "N/A";
  const languageNames = languages.map((lang) => lang.name).join(", ") || "N/A";
  const borderCountries = generateBorderCountries(borders);
  console.log(borderCountries);
  const pop = population.toLocaleString();

  // console.log(currencie);
  // console.log(languageNames);

  const markup = `
<button class="back">
        <ion-icon name="arrow-back"></ion-icon>
        <span>Back</span>
      </button>

      <div class="main1">
        <div class="detail_img_container">
          <img class="detail_img" src="${png}" />
        </div>
        <div class="info">
          <span class="detail_name">${name}</span>
          <div class="detail_info">
            <ul class="detail_ul">
              <li>
                <span class="li_label">Native Name:</span>
                <span class="li_value">${nativeName}</span>
              </li>
              <li>
                <span class="li_label">Population:</span>
                <span class="li_value">${pop}</span>
              </li>
              <li>
                <span class="li_label">Region:</span>
                <span class="li_value">${region}</span>
              </li>
              <li>
                <span class="li_label">Sub Region:</span>
                <span class="li_value">${subregion || "N/A"}</span>
              </li>
              <li>
                <span class="li_label">Capital:</span>
                <span class="li_value">${capital || "N/A"}</span>
              </li>
            </ul>
            <ui class="detail_ul">
              <li>
                <span class="li_label">Top Level Domain:</span>
                <span class="li_value">${domain || "NA"}</span>
              </li>
              <li>
                <span class="li_label">Curencies:</span>
                <span class="li_value">${currencie}</span>
              </li>
              <li>
                <span class="li_label">Languages:</span>
                <span class="li_value">${languageNames}</span>
              </li>
            </ui>
          </div>
          <div class="border_countries">
            <span class="border_countries_txt li_label">Border Countries</span>
            ${borderCountries}
          </div>
        </div>
      </div>
  `;
  carts.insertAdjacentHTML("afterend", markup);

  const back = document.querySelector(".back");
  const info = document.querySelector(".info");
  const neighborButton = document.querySelectorAll(".neighbor_button");

  if (navigation.classList.contains("dark_elements")) {
    back.classList.add("dark_elements");
    info.classList.add("dark_elements_detail");
    neighborButton.forEach((neighbor) => {
      neighbor.classList.add("dark_elements");
    });
  }

  searchSection.style.display = "none";
};
const showRegion = function () {
  if (regions.classList.contains("hidden")) {
    regions.classList.remove("hidden");
  } else {
    regions.classList.add("hidden");
  }
};

const toggleDarkModeDetail = function () {
  const back = document.querySelector(".back");
  const info = document.querySelector(".info");
  const neighborButton = document.querySelectorAll(".neighbor_button");
  if (back) {
    if (navigation.classList.contains("dark_elements")) {
      back.classList.add("dark_elements");
      info.classList.add("dark_elements_detail");
      neighborButton.forEach((neighbor) =>
        neighbor.classList.add("dark_elements")
      );
    } else {
      back.classList.remove("dark_elements");
      info.classList.remove("dark_elements_detail");
      neighborButton.forEach((neighbor) =>
        neighbor.classList.remove("dark_elements")
      );
    }
  } else return;
};

const toggleDarkMode = function () {
  const cart = document.querySelectorAll(".cart");
  if (navigation.classList.contains("dark_elements")) {
    navigation.classList.remove("dark_elements");
    searchBar.classList.remove("dark_elements");
    filter.classList.remove("dark_elements");
    cart.forEach((cart) => cart.classList.remove("dark_elements"));
    regions.classList.remove("dark_elements");
    filterButton.classList.remove("dark_elements");
    darkModeButton.classList.remove("dark_elements");
    body.classList.remove("dark_body");
    moonIcon.setAttribute("name", "moon-outline");
    toggleDarkModeDetail();
  } else {
    navigation.classList.add("dark_elements");
    searchBar.classList.add("dark_elements");
    filter.classList.add("dark_elements");
    cart.forEach((cart) => cart.classList.add("dark_elements"));
    regions.classList.add("dark_elements");
    filterButton.classList.add("dark_elements");
    darkModeButton.classList.add("dark_elements");
    body.classList.add("dark_body");
    moonIcon.setAttribute("name", "moon");
    toggleDarkModeDetail();
  }
};

const handleClick = function (e) {
  e.stopPropagation();
  if (searchText.value === searchText.defaultValue) {
    searchText.value = "";
  }
};
const countryByRegion = function (e) {
  curRegion = e.target.textContent.toLowerCase();
  filteredCountries = allCountries.filter((country) =>
    country.region.toLowerCase().includes(curRegion)
  );

  renderCountries(filteredCountries);

  if (!regions.classList.contains("hidden")) {
    regions.classList.add("hidden");
  }

  clearFilterBtn.classList.remove("hidden");
};

const search = function () {
  const searchTextValue = searchText.value.toLowerCase();
  if (searchTextValue === "") {
    if (curRegion) {
      renderCountries(filteredCountries);
    } else {
      renderCountries(allCountries);
    }
  } else {
    const source = curRegion ? filteredCountries : allCountries;
    const filteredData = source.filter((country) =>
      country.name.toLowerCase().includes(searchTextValue)
    );
    renderCountries(filteredData);
  }
};

const clearFilter = function () {
  curRegion = "";
  filteredCountries = [];
  if (!clearFilterBtn.classList.contains("hidden")) {
    clearFilterBtn.classList.add("hidden");
  }
  renderCountries(allCountries);
};

const scrollToTop = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const countryDetailedInfo = function (e) {
  const clickedCart = e.target.closest(".cart");
  if (!clickedCart) return;
  const countryName = clickedCart.querySelector(".cart_name").textContent;
  showDetaildInfo(countryName);
};

const neighborCountryGenerate = function (e) {
  const clickedButton = e.target.closest(".neighbor_button");
  if (!clickedButton) return;
  const countryName = clickedButton.textContent;
  const detailContainer = document.querySelector(".main1");
  const back = document.querySelector(".back");
  if (detailContainer && back) {
    detailContainer.remove();
    back.remove();
  }
  showDetaildInfo(countryName);
};

const backBtn = function (e) {
  const clickedButton = e.target.closest(".back");
  if (!clickedButton) return;

  const detailContainer = document.querySelector(".main1");
  const back = document.querySelector(".back");
  if (detailContainer && back) {
    detailContainer.remove();
    back.remove();
  }

  clearCarts();
  renderCountries(allCountries);
  searchSection.style.display = "flex";
};

filter.addEventListener("click", showRegion);
darkModeButton.addEventListener("click", toggleDarkMode);
searchText.addEventListener("click", handleClick);
searchText.addEventListener("input", search);
region.forEach((regionElement) => {
  regionElement.addEventListener("click", countryByRegion);
});
clearFilterBtn.addEventListener("click", clearFilter);
navText.addEventListener("click", scrollToTop);
carts.addEventListener("click", countryDetailedInfo);
main.addEventListener("click", backBtn);
main.addEventListener("click", neighborCountryGenerate);

countryData();

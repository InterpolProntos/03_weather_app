const mockedData = [
  {
    title: "Lisbon",
    temperature: 20,
    maxTemperature: 25,
    minTemperature: 15,
    feelsLike: 22,
    weather: "sunny",
  },
  {
    title: "Madrid",
    temperature: 25,
    maxTemperature: 30,
    minTemperature: 20,
    feelsLike: 27,
    weather: "rainy",
  },
  {
    title: "Paris",
    temperature: 15,
    maxTemperature: 20,
    minTemperature: 10,
    feelsLike: 17,
    weather: "cloudy",
  },
  {
    title: "Berlin",
    temperature: 10,
    maxTemperature: 15,
    minTemperature: 5,
    feelsLike: 12,
    weather: "snowy",
  },
  {
    title: "London",
    temperature: 5,
    maxTemperature: 10,
    minTemperature: 0,
    feelsLike: 7,
    weather: "rainy",
  },
  {
    title: "Rome",
    temperature: 30,
    maxTemperature: 35,
    minTemperature: 25,
    feelsLike: 32,
    weather: "cloudy",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  lucide.createIcons();

  // Weather cards handling
  const cardGrid = document.getElementById("cardGrid");
  const locationInput = document.getElementById("locationInput");
  const addButton = document.getElementById("addButton");

  // Load saved cards from localStorage
  const savedCards = JSON.parse(localStorage.getItem("weatherCards") || "[]");

  // Weather icons mapping
  const weatherIcons = {
    sunny: "sun",
    cloudy: "cloud",
    rainy: "cloud-rain",
    snowy: "snowflake",
  };

  function createWeatherCard(data) {
    const card = document.createElement("div");
    card.className = "weather-card";
    card.setAttribute("data-weather", data.weather);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "X";
    deleteBtn.onclick = () => {
      card.remove();
      saveCards();
    };

    const header = document.createElement("div");
    header.className = "card-header";

    const location = document.createElement("span");
    location.className = "location";
    location.textContent = data.title;

    const weatherIcon = document.createElement("i");
    weatherIcon.className = "weather-icon";
    weatherIcon.setAttribute("data-lucide", weatherIcons[data.weather]);

    const temperature = document.createElement("div");
    temperature.className = "temperature";
    temperature.textContent = `${data.temperature}°C`;

    const details = document.createElement("div");
    details.className = "details";

    const minMax = document.createElement("div");
    minMax.className = "detail-row";
    minMax.innerHTML = `
        <span>Min/Max</span>
        <span>${data.minTemperature}°C/${data.maxTemperature}°C</span>
    `;

    const feelsLike = document.createElement("div");
    feelsLike.className = "detail-row";
    feelsLike.innerHTML = `
        <div style="display:flex;align-items:center;gap:0.25rem">
          <i data-lucide="thermometer-sun"></i>
          <span>Feels like</span>
        </div>
        <span>${data.feelsLike}°C</span>
    `;

    header.appendChild(deleteBtn);
    header.appendChild(location);
    header.appendChild(weatherIcon);
    details.appendChild(minMax);
    details.appendChild(feelsLike);

    card.appendChild(header);
    card.appendChild(temperature);
    card.appendChild(details);

    return card;
  }

  function saveCards() {
    const cards = Array.from(cardGrid.children).map((card) => ({
      title: card.querySelector(".location").textContent,
      temperature: parseInt(card.querySelector(".temperature").textContent),
      maxTemperature: parseInt(
        card
          .querySelector(".detail-row")
          .lastElementChild.textContent.split("/")[1]
      ),
      minTemperature: parseInt(
        card
          .querySelector(".detail-row")
          .lastElementChild.textContent.split("/")[0]
      ),
      feelsLike: parseInt(
        card.querySelectorAll(".detail-row")[1].lastElementChild.textContent
      ),
      weather: card.getAttribute("data-weather"),
    }));

    localStorage.setItem("weatherCards", JSON.stringify(cards));
  }

  function addNewCard() {
    const location = locationInput.value.trim();
    if (!location) return;

    const mockIndex = cardGrid.children.length % mockedData.length;
    const newCardData = {
      ...mockedData[mockIndex],
      title: location,
    };

    cardGrid.appendChild(createWeatherCard(newCardData));
    locationInput.value = "";
    lucide.createIcons();
    saveCards();
  }

  // Event listeners
  addButton.addEventListener("click", addNewCard);
  locationInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addNewCard();
  });

  // Initialize saved cards
  savedCards.forEach((cardData) => {
    cardGrid.appendChild(createWeatherCard(cardData));
  });

  // Initialize icons for the initial cards
  lucide.createIcons();
});

const mockedData = [
  {
    title: "Lisbon",
    temperature: 20,
    maxTemperature: 25,
    minTemperature: 15,
    feelsLike: 22,
  },
  {
    title: "Madrid",
    temperature: 25,
    maxTemperature: 30,
    minTemperature: 20,
    feelsLike: 27,
  },
  {
    title: "Paris",
    temperature: 15,
    maxTemperature: 20,
    minTemperature: 10,
    feelsLike: 17,
  },
  {
    title: "Berlin",
    temperature: 10,
    maxTemperature: 15,
    minTemperature: 5,
    feelsLike: 12,
  },
  {
    title: "London",
    temperature: 5,
    maxTemperature: 10,
    minTemperature: 0,
    feelsLike: 7,
  },
  {
    title: "Rome",
    temperature: 30,
    maxTemperature: 35,
    minTemperature: 25,
    feelsLike: 32,
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const cardInput = document.getElementById("cardInput");
  const addCardButton = document.getElementById("addCardButton");
  const cardList = document.getElementById("cardList");

  // Add card action
  const addCardAction = () => {
    const cardText = cardInput.value.trim();
    if (cardText === "") return;

    addCardToList(cardText);
    cardInput.value = "";
    saveCards();
  };

  addCardButton.addEventListener("click", () => {
    addCardAction();
  });

  cardInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addCardAction();
      saveCards();
    }
  });

  const addCardToList = (cardText) => {
    const countElement = document.getElementById("totalCount");
    const count = parseInt(countElement.textContent);
    countElement.textContent = count + 1;

    const li = document.createElement("li");
    const title = document.createElement("div");
    const body = document.createElement("div");
    const currentTemp = document.createElement("div");
    const maxMin = document.createElement("div");
    const deleteButton = document.createElement("button");
    const icon = document.createElement("i");

    // Setup content
    const data = mockedData[count] || {
      title: cardText,
      temperature: "?",
      maxTemperature: "?",
      minTemperature: "?",
      feelsLike: "?",
    };
    title.textContent = cardText;
    title.classList.add("card-header");
    body.classList.add("card-body");
    currentTemp.textContent = `${data.temperature}°C`;
    currentTemp.classList.add("current-temp");
    maxMin.textContent = `${data.maxTemperature}°C/${data.minTemperature}°C Feels like ${data.feelsLike}°C`;
    maxMin.classList.add("max-min");

    // Setup Delete
    icon.classList.add("fa", "fa-trash");
    icon.setAttribute("aria-hidden", "true");
    deleteButton.classList.add("delete-button");
    deleteButton.appendChild(icon);
    deleteButton.addEventListener("click", () => {
      li.remove();
      saveCards();
    });

    body.appendChild(currentTemp);
    body.appendChild(maxMin);
    body.appendChild(deleteButton);
    li.appendChild(title);
    li.appendChild(body);
    cardList.appendChild(li);
  };

  const saveCards = () => {
    const cards = [];
    document.querySelectorAll("#cardList li").forEach((li) => {
      cards.push({
        title: li.querySelector(".card-header").textContent,
      });
    });
    localStorage.setItem("cards", JSON.stringify(cards));
  };

  // Load cards from localStorage
  function loadCards() {
    const savedCards = JSON.parse(localStorage.getItem("cards") || "[]");
    savedCards.forEach((card) => {
      addCardToList(card.title);
    });
  }

  loadCards();
});

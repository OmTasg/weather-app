const apiKey = "7b744d6465ef127edef737ef372502df";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const checkBtn = document.getElementById("check-btn");
const cityNameP = document.getElementById("city-name-p");
const cityInput = document.getElementById("city-input");
let city = "";
const errorMsg = document.getElementById("error-msg");
const picDiv = document.getElementById("pic");
const cityTitle = document.getElementById("city-title");
const tempDisplay = document.getElementById("temperature");
const desc = document.getElementById("description");
const highLow = document.getElementById("highlow");
const humidityDisplay = document.getElementById("humidity");
const windDisplay = document.getElementById("wind");
const unitInput = document.getElementById("unit-select");
const container = document.getElementById("container");
let unitType = "";
const mainContent = document.getElementById("main-content");

async function checkWeather() {
  if (cityInput.value != "") {
    const response = await fetch(`${apiUrl}q=${city}&appid=${apiKey}&units=${unitInput.value}`);
    const data = await response.json();
    if (response.status == 400 || response.status == 404) {
      errorMsg.innerText = "Invalid City Name";
      deleteWeather()
      
    } else {
      errorMsg.innerText = "";
      picDiv.innerHTML = `<img src = ${`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}>`;
      cityTitle.innerText = data.name;
      tempDisplay.innerText = `${Math.round(data.main.temp)}°`;
      desc.innerText = data.weather[0].description;
      highLow.innerText = `H: ${Math.round(data.main.temp_max)}° | L: ${Math.round(data.main.temp_min)}°`;
      humidityDisplay.innerText = `Humidity: ${data.main.humidity}%`;
      windDisplay.innerText = `Wind: ${Math.round(data.wind.speed)}`;
    }

    if (unitInput.value === "imperial" && !(response.status == 400 || response.status == 404)) {
      tempDisplay.innerText += "F";
      windDisplay.innerText += " MPH";
    } else if (unitInput.value === "metric" && !(response.status == 400 || response.status == 404)) {
      tempDisplay.innerText += "C";
      windDisplay.innerText += " KPH";
    }
  }
}

checkBtn.addEventListener("click", function () {
  city = cityInput.value;
  checkWeather();
});

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkBtn.click();
  }
});


function deleteWeather(){
  picDiv.innerHTML = ""
  cityTitle.innerText = ""
  tempDisplay.innerText = ""
  desc.innerText = ""
  highLow.innerText = ""
  humidityDisplay.innerText = ""
  windDisplay.innerText = ""
}
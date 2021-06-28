var clearHistoryBtn = document.querySelector("#reset-button")
var zipcodeFormEl = document.querySelector("#zip-form");
var zipcodeInputEl = document.querySelector("#zipcode");

var searchContainerEl = document.querySelector("#search-history")
var searchHistory = [];
var currentSearch = 0;

function getWeather(zipcode) {
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&units=imperial&appid=0444a9f6e39557fee6a4f8463a2448cd";

    fetch(weatherAPI).then(function (response) {
            return response.json();
        })
        .then(function(response) {
            var cityName = document.querySelector("#city-name")
            cityName.textContent = response.name;

            var currentDay = document.querySelector("#current-day")
            currentDay.textContent = moment().format("[(]MM[/]D[/]YYYY[)]")

            var weatherIcon = document.querySelector("#weather-icon")
            weatherIcon.setAttribute("src", 'http://openweathermap.org/img/wn/'+response.weather[0].icon+'.png');

            var temp = document.querySelector("#current-temp")
            temp.textContent = "Temperature: " + response.main.temp + "°F";
            var feelsLike = document.querySelector("#feels-like")
            feelsLike.textContent = "Feels Like: " + response.main.feels_like + "°F";

            var humidity = document.querySelector("#humidity")
            humidity.textContent = "Humidity: " + response.main.humidity + "%";

            var windSpeed = document.querySelector("#wind-speed")
            windSpeed.textContent = "Wind: " + response.wind.speed + " mph";

            var searchObj = [{
                city: response.name,
                searchID: currentSearch,
                zipcode: zipcode,
                lat: response.coord.lat,
                long: response.coord.lon
            }]
            searchHistory.push(searchObj)
            localStorage.setItem("searches", JSON.stringify(searchHistory))

            var buttonContainer = document.createElement("div")
            buttonContainer.className = "row"

            var historyButton = document.createElement("button")
            historyButton.className = "btn bg-white border history-button city-button"
            historyButton.id = zipcode
            historyButton.textContent = response.name
            historyButton.addEventListener("click", function(e){
                console.log(event.target.id);
                getWeather(event.target.id);
            });

            buttonContainer.appendChild(historyButton);
            searchContainerEl.appendChild(buttonContainer);

            var lat = response.coord.lat
            var lon = response.coord.lon
            getUVindex(lat,lon)
        })
    currentSearch++
};










// SEARCH FORM HANDLER /
var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityEl.value.trim();
    if (cityName) {
        getLocation(cityName);
    } else {
        alert("Please enter a valid city name.")
    }
}
 // LAST SEARCH FOR LOCAL STORAGE //
var searchListHandler = function(event) {
    event.preventDefault();
    var lastCitySearch = event.target;

    if (lastCitySearch.classList.contains("last-city")) { // will link to search history el at the bottom
        cityStorage = lastCitySearch.innerHTML.split(",")[0];
        getLocation(cityStorage)
    }
}

// API KEY AND FETCH //
var getLocation = function(city) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // display city OR you can set city to a global variable
            let lat = data[0].lat;
            let lon = data[0].lon;
            getWeather(lat, lon);
        })
}

// DISPLAY WEATHER //
var getWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            return response.json().then(function(data) {
                displayWeatherForcast(data);
            });
        }
    });
}

var weatherForecast = function(data) {

};

// EVENT LISTENERS //
//searchBtn.addEventListener("click", getLocation);

searchFormEl.addEventListener("click", formSubmitHandler);





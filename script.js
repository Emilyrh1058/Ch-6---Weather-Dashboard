var searchBtn = document.querySelector("#searchBtn");
var searchFormEl = document.querySelector("#leftCol");
var searchQueryEl = document.querySelector("#searchQuery");
var cityForecast = [];
var apiKey = "b8b015eeb24126e70a9d70de8dada8aa";
// vars/things to add
    // icons 
    // localStorage
    // display cards 


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

var getWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // call a function that takes in data and then displays it on the page
            weatherForecast(data);
        })
}

var weatherForecast = function(data) {

};

// EVENT LISTENERS //
//searchBtn.addEventListener("click", getLocation);

searchFormEl.addEventListener("click", formSubmitHandler);





var searchBtn = document.querySelector("#searchBtn");
var cityForecast = [];
var apiKey = "b8b015eeb24126e70a9d70de8dada8aa";


// API //
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
            weatherForecastSection(data);
        })
}

var weatherForecastSection = function(data) {
    
};

searchBtn.addEventListener("click", getLocation);
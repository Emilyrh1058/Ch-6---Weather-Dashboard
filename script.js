var searchBtn = document.querySelector("#searchBtn");
var cityForecast = [];

// API //
var getUserCity = function(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast" + city + ""

    fetch(apiUrl).then(function(reponse) {
        if (response.ok) {
            response.json().then(function(data) {
               displayForecast(data, city);
            });
        } else {
            alert("Error: " + response.statusText)
        }

    })

}


var getCity = function(event) {
event.preventDefault();
var userCity = document.getElementById("searchQuery").value.trim;
if (userCity) {
    getUserRepos(username);
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
} else {
    alert("Please enter a valid city");
}
};



console.log(data)
cityForecast = data;



searchBtn.addEventListener("click", getCity)
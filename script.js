var searchBtn = document.querySelector("#searchBtn");
var cityForecast = [];

function getInfo(event) {
event.preventDefault();

var userCity = document.getElementById("searchQuery").value.trim;
console.log(city)
fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=96e27da4f61bebe5c6e5c7c18c453252`)
.then(function(response) {
    return response.json()
})
.then(function(data){
    console.log(data)
    cityForecast = data;
})
}
searchBtn.addEventListener("click", getInfo)
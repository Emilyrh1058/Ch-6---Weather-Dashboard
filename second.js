$(document).ready(function(){
    $(“#city-name”).on(“click”, function(){
        let cityName = $(“#city-name”).val();
        $(“#city-name”).val(“”)
        weatherNow(cityName)
    })
    $(“#search-history”).on(“click”, “li”, function(){
    weatherNow($(this).text())
    })
    let apiKey = “19df216f76d164f51890fea842f4ea2f”
    function addHistory(city){
        // TBD
    }
    function weatherNow(city){
        $.ajax({
            type: “GET”,
            url: “http://api.openweathermap.org/data/2.5/weather?q=” + city + “&appid=” + apiKey + “&units=imperial”,
            dataType: “json” ,
            success: function(data){
                console.log(“data”, data);
                if (history.indexOf(city) === -1) {
                    history.push(city)
                    window.localStorage.setItem(“history” , JSON.stringify(history));
                    addHistory(city)
                }
                $(“today”).empty();
                let title = $(“<h3>“).addClass(“card-title”).text(data.name + ” (” + new Date().toLocalDataString() + “)”);
                let card = $(“<div>“).addClass(“card”);
                let windSpeed = $(“<p>“).addClass(“card-text”).text(“wind-speed: ” + data.wind.speed + “mph”);
                let humidity = $(“<p>“).addClass(“card-text”).text(“humidity: ” + data.main.humid + “%”);
                let temperature = $(“<p>“).addClass(“card-text”).text(“temperature: ” + data.main.temp + “degreeF”);
                let cardBody = $(“<div>“).addClass(“card-body”);
                let img = $(“<img>“).appr(“src”, “http://openweatherapp.org/img/w/” + data.weather[0].icon + “.png”)
                title.append(img);
                cardBody.append(title, temperature, humidity, windSpeed);
                card.append(cardBody);
                $(“#today”).append(card);
                getForecast(city);
                getUVIndex(data.coord.lat, data.coord.lon);
            };
        });
    };
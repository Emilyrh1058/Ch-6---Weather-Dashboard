var searchBtn = document.querySelector("#searchBtn")

function getInfo() {
    var city = document.getElementById("searchQuery").value;
    console.log(city);
}

searchBtn.addEventListener("click", getInfo);
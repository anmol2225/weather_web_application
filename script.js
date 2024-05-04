document.getElementById("getCoordinatesBtn").addEventListener("click", function() {
    const city = document.getElementById("city").value;

    fetch('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={c1b6367ace6465caa2b93d96bbb7c0dd}')
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            const coordinatesInfo = `<p>Latitude: ${latitude}</p><p>Longitude: ${longitude}</p>`;
            document.getElementById("coordinates").innerHTML = coordinatesInfo;
        })
        .catch(error => {
            console.error('Error:', error.message);
            document.getElementById("coordinates").innerHTML = `<p>${error.message}</p>`;
        });
});

let weather = {
    "apikey": "2f0ad3953411bdfb6c2964fa864b71d0",
    fetchWeather : function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apikey)
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    search : function() {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("durgapur");

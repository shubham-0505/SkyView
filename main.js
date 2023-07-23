const inputBox = document.querySelector("#input-box");
const searchBtn = document.querySelector(".search-btn");
const weather_image = document.querySelector(".weather-image");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windspeed = document.getElementById("windspeed");

const location_not_found = document.querySelector(".location-not-found");

const weather_body = document.querySelector(".weather-body");


async function checkWeather(city){
    const api_key = "39f3b6543ee5d42659de9caae456beb3";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === '404'){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)} °C`;

    description.innerHTML = `${(weather_data.weather[0].description)}`;

    humidity.innerHTML = `${(weather_data.main.humidity)} %`;

    windspeed.innerHTML = `${(weather_data.wind.speed)} km/hr`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_image.src = "./images/cloud.png";
            break;
        case 'Clear':
            weather_image.src = "./images/clear.png";
            break;
        case 'Rain':
            weather_image.src = "./images/rain.png";
            break;
        case 'Mist':
            weather_image.src = "./images/mist.png";
            break;
        case 'Snow':
            weather_image.src = "./images/snow.png";
            break;
    }
}
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

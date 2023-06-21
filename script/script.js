/**
 *
 * ** Table of Contents
 * 01 Weather Objects
 * 02 Get Countries list in Select menu for zip code search option
 * 03 Dark mode and light mode switching
 * 04 Footer Content
 *
 */

/**
 * 01 Weather Objects
 */
const Weather = {
  URL: `https://api.openweathermap.org/data/2.5/weather?q=mymensingh&appid=2f4bf6422cdc425dc0094e103dbb6b3d&units=Metric`,

  async getWeatherData() {
    try {
      const response = await axios.get(this.URL);
      if (200 === response.status) {
        let {
          name,
          dt,
          sys: { country, sunrise, sunset },
          weather: [{ icon, main, description }],
          main: { temp, feels_like, humidity, pressure },
          wind: { speed, deg },
          clouds: { all },
        } = response.data;
        let dateTime = new Date(dt * 1000);
        let sunriseTime = new Date(sunrise * 1000);
        let sunsetTime = new Date(sunset * 1000);

        document.getElementById(
          "weather-data"
        ).innerHTML = `<div class="time">${dateTime.toString()}</div>
                        <div class="country">${name}, ${country}</div>
                        <div class="tempareture"><img src="http://openweathermap.org/img/w/${icon}.png" alt="icon"></img>${temp}&#8451;</div>
                        <div class="current-weather fw-semibold">Feels like ${feels_like}&#8451;, ${main}, ${description}</div>
                        <div class="additional-info"><b>Humidity:</b> ${humidity}% </br> <b>Presure:</b> ${pressure}hPa </br> <b>Wind Speed:</b> ${speed}meters/sec, <b>Wind direction:</b> ${deg}&#176; (meteorological) </br> <b> Sunrise: </b> ${sunriseTime.toLocaleTimeString()} </br> <b> Sunset: </b> ${sunsetTime.toLocaleTimeString()} </br> <b> Cloudiness: </b> ${all}%</div>
                        `;
      }
    } catch (error) {
      document.getElementById(
        "weather-data"
      ).innerHTML = `<div class="alert alert-danger">Data Not Found, Please Enter Correct Data</div>`;
    }
  },

  urlByCityName(cityName = "mymensingh") {
    this.URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2f4bf6422cdc425dc0094e103dbb6b3d&units=Metric`;
  },

  urlByZipCode(countryCode, zipCode) {
    this.URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=2f4bf6422cdc425dc0094e103dbb6b3d&units=Metric`;
  },
};

Weather.getWeatherData();

document.getElementById("city-search").addEventListener("click", () => {
  const cityName = document.getElementById("city-name").value;
  Weather.urlByCityName(cityName);
  Weather.getWeatherData();
});

document.getElementById("zip-search").addEventListener("click", () => {
  const countryCode = document.getElementById("country-code").value;
  const zipCode = document.getElementById("zip-code").value;
  Weather.urlByZipCode(countryCode, zipCode);
  Weather.getWeatherData();
});

/**
 * 02 Get Countries list in Select menu for zip code search option
 */

function getCountries(lang = "en") {
  const A = 65;
  const Z = 90;
  const countryName = new Intl.DisplayNames([lang], { type: "region" });
  for (let i = A; i <= Z; ++i) {
    for (let j = A; j <= Z; ++j) {
      let code = String.fromCharCode(i) + String.fromCharCode(j);
      let name = countryName.of(code);
      if (code !== name) {
        document.getElementById(
          "country-code"
        ).innerHTML += `<option value="${code}">${name}</option>`;
      }
    }
  }
}
getCountries();

/**
 * 03 Dark mode and light mode switching
 */

document.getElementById("dark").addEventListener("click", () => {
  let light = document.getElementById("default");
  let dark = document.getElementById("dark");
  light.classList.remove("active", "btn-primary");
  dark.classList.add("active", "btn-primary");
  document.body.classList.add("dark");
});

document.getElementById("default").addEventListener("click", () => {
  let light = document.getElementById("default");
  let dark = document.getElementById("dark");
  light.classList.add("active", "btn-primary");
  dark.classList.remove("active", "btn-primary");
  document.body.classList.remove("dark");
});

/**
 * 04 Footer Content
 */
const date = new Date();
document.getElementById(
  "footer-content"
).innerHTML = `Copyright ${date.getFullYear()} &copy; <a href="http://www.themeforest.net/user/royhridoy" target="_blank">RoyHridoy</a> ALL Right Reserved`;

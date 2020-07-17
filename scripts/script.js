const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".weather-section .cities");

const apiKey = "1c326f4182035441c375514b4d8b8c82";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    //Open Weather Api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { main, name, sys, weather, clouds, wind } = data;
        const city = document.createElement("div");
        const htmlTemplate = `
          <table>
            <tr>
              <td colspan="2"><h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>, ${sys.country}
              </h2></td>
            </tr>
            <tr>
              <td colspan="3"><div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div></td>
            </tr>
            <tr>
              <td colspan="2"><div class="temp-description">${weather[0]["description"].toUpperCase()}</div></td>
              <td><div class="high-low">${Math.round(main.temp_max)}<sup>°c</sup> - ${Math.round(main.temp_min)}<sup>°c</sup></div></td>
            </tr>
            <tr>
            <td><div class="temp-details"><b>Humidity</b><br>${main.humidity}%</div></td>
            <td><div class="temp-details"><b>Wind</b><br>${(wind.speed * 3.6).toFixed(1)}km/h</div></td>
            <td><div class="temp-details"><b>Cloudiness</b><br>${clouds.all}%</div></td>
            </tr>
          </table>
        `;
        list.innerHTML = '';
        city.innerHTML = htmlTemplate;
        list.append(city);
      })
      .catch(() => {
        msg.textContent = "Something is wrong. Please try again.";
      });
  
    msg.textContent = "";
    form.reset();
    input.focus();
  });
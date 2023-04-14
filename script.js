"use strict";

let searchBtn = document.getElementById("search-btn");
let searchBar = document.getElementById("search__field");
const whiteBlock = document.querySelector("#bigSquare");
const grayBlock = document.querySelector("#in1");
const greenBlock = document.querySelector("#in2");
const galaxyBlock = document.querySelector("#in3");
const yesterdayBtn = document.querySelector("#btn-yesterday");
const tomorrowBtn = document.querySelector("#btn-tomorrow");
const whiteInner = document.getElementById("bigSquare");
const grayInner = document.getElementById("in1");
const greenInner = document.getElementById("in2");
const galaxyInner = document.getElementById("in3");
const yesterdayInner = document.getElementById("btn-yesterday");
const tomorrowInner = document.getElementById("btn-tomorrow");
let current = 0;
let locationName = "",
  daysArr = "",
  currentArr = "",
  obj = "";

const getWeather = async function (countryName) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=40bb1bd50e9f44df86b224156221112&q=${countryName}&days=7&aqi=no&alerts=no`
    );
    const data = await res.json();
    return {
      forecast: data.forecast.forecastday,
      location: data.location,
      currents: data.current,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//_______________________________________________________________________________
searchBtn.addEventListener("click", function () {
  let countryName = searchBar.value;
  main(countryName);
});

async function main(country) {
  current = 0;
  const { forecast, location, currents } = await getWeather(country);
  daysArr = forecast;
  currentArr = currents;
  locationName = location.name;
  console.log(locationName);
  whiteContainer();
  grayContainer();
  greenContainer();
  galaxyContainer();
  tomorrowButton();
  yesterdayButton_disabled();
}
main("Egypt");
tomorrowBtn.addEventListener("click", function () {
  if (current < 2) {
    current += 1;
    grayContainer();
    greenContainer();
    galaxyContainer();
    if (current == 2) {
      tomorrowButton_disabled();
    } else {
      tomorrowButton();
    }
    yesterdayButton();
  }
});

yesterdayBtn.addEventListener("click", function () {
  if (current > 0) {
    current -= 1;
    grayContainer();
    galaxyContainer();
    tomorrowButton();
  }
  if (current == 0) {
    yesterdayButton_disabled();
  } else {
    yesterdayButton();
  }
});

//main("Egypt");
function whiteContainer() {
  whiteInner.innerHTML = "";
  const whiteHtml = `
  <div class="country__data">
    <p style="font-size: 30px; margin-left: 40px; margin-top: 50px; font-family: sans-serif">
     Forecast in <strong>${locationName}</strong> </p>
  </div>`;
  whiteBlock.insertAdjacentHTML("beforeend", whiteHtml);
  whiteBlock.style.opacity = 1;
}
function grayContainer() {
  grayInner.innerHTML = "";
  const grayHtml = `
  <div class="country__data">
    <p  style="font-size: 40px; padding: 5px 10px"> 
    <strong> ${currentArr.temp_c}°C.</strong>
    </p>
    <p style="font-size: 24px; margin-left: 230px; margin-top: -90px; font-family: sans-serif">
    High ${daysArr[current].day.maxtemp_c}°C
    <br>
    Low ${daysArr[current].day.mintemp_c}°C</br> 
    </p>
    </p>
    <p style="font-size: 24px; margin-left: 20px; margin-top: 100px; font-family: sans-serif">
    ${currentArr.condition.text} 
    <br>feels Like  
    ${currentArr.feelslike_c}°C.</br> 
    <img class="country__img" style="width: 35%; margin-left: 210px; margin-top: -200px"
    src="${currentArr.condition.icon}" />
    </p>
  </div>`;
  grayBlock.insertAdjacentHTML("beforeend", grayHtml);
  grayBlock.style.opacity = 1;
}
function greenContainer() {
  greenInner.innerHTML = "";
  const greenHtml = `
  <div class="country__data">
  <strong>
    <p style="font-size: 24px;margin-left: 15px; font-family: sans-serif">
    Visibility <p style="font-size: 24px;margin-top: -50px; margin-left: 190px;">${currentArr.vis_km} KM</p>
    </p>
    <p style="margin-top: -25px; margin-left: 15px;">________________________________</p>
    <p style="font-size: 24px;margin-left: 15px; font-family: sans-serif">
    Wind <p style="font-size: 24px;margin-top: -50px; margin-left: 180px;">${currentArr.wind_kph} Km/h <p>
    </p>
    <p style="margin-top: -25px; margin-left: 15px;">________________________________</p>
    <p style="font-size: 24px;margin-left: 15px; font-family: sans-serif">
    Humidity  <p style="font-size: 24px;margin-top: -50px; margin-left: 180px;"> Km/h</p>
    </p>
    <p style="margin-top: -25px; margin-left: 15px;">________________________________</p>
    <p style="font-size: 24px;margin-left: 15px; font-family: sans-serif">
    Pressure <p style="font-size: 24px;margin-top: -50px; margin-left: 180px;"> Km/h </p>
    </p>
    </strong>
  </div>`;
  greenBlock.insertAdjacentHTML("beforeend", greenHtml);
  greenBlock.style.opacity = 1;
}
function galaxyContainer() {
  galaxyInner.innerHTML = "";
  const galaxyHtml = `
  <div class="country__data" style="color:white;">
  <br></br>
  <br></br> <center>
  <ion-icon name="sunny-outline" style="font-size: 25px;"></ion-icon>
    <h2 class="sunrise"> Sunrise 
    <br>${daysArr[current].astro.sunrise}.</br>
   </h2>
    <ion-icon name="moon-outline" style="font-size: 25px;"></ion-icon>
    <h2 class="sunset"> Sunset 
    <br>${daysArr[current].astro.sunset}.</br>
    </center> </h2>
  </div>`;
  galaxyBlock.insertAdjacentHTML("beforeend", galaxyHtml);
  galaxyBlock.style.opacity = 1;
}
function tomorrowButton_disabled() {
  tomorrowInner.innerHTML = "";
  tomorrowBtn.disabled = false;
  const tomorrowHtml = `
  <div class="tomorrow" style="color:white;"> <center> 
  <strong><p style="font-size: 35px; margin-top: 80px;  iz">Tomorrow</p>
  <ion-icon name="sunny-outline" style="font-size: 30px;"></ion-icon>
    <h2 class="sunrise" style=" "> Sunrise  </h2>
    <ion-icon name="moon-outline" style="font-size: 30px;"></ion-icon>
    <h2 class="sunset" style=""> Sunset 
    </h2></strong></center> 
  </div>`;
  tomorrowBtn.insertAdjacentHTML("beforeend", tomorrowHtml);
  tomorrowBtn.style.opacity = 1;
}
function tomorrowButton() {
  tomorrowInner.innerHTML = "";
  tomorrowBtn.disabled = false;
  const tomorrowHtml = `
  <div class="tomorrow" style="color:white; ">
  <strong><p style="font-size: 35px; margin-top: 50px;">Tomorrow</p>
  <ion-icon name="sunny-outline" style="font-size: 30px; margin-top: 50px;"></ion-icon>
    <h2 class="sunrise" style=" margin-top: 10px;"> <center> Sunrise 
    <br>${daysArr[current + 1].astro.sunrise}.</br>
    </center> </h2>
    <h2 class="high" style="margin-top: -20px;"> <center> High ${
      daysArr[current + 1].day.maxtemp_c
    }°C.
    </center> </h2>
    <ion-icon name="moon-outline" style="font-size: 30px;"></ion-icon>
    <h2 class="sunset" style="margin-top: 50px;margin-top: 10px;"> <center> Sunset 
    <br>${daysArr[current + 1].astro.sunset}.</br>
    </center> </h2>
    <h2 class="law" style="margin-top: -20px;"> <center> Law ${
      daysArr[current + 1].day.mintemp_c
    }°C.
    </center> </h2></strong>
  </div>`;
  tomorrowBtn.insertAdjacentHTML("beforeend", tomorrowHtml);
  tomorrowBtn.style.opacity = 1;
}
function yesterdayButton_disabled() {
  yesterdayInner.innerHTML = "";
  yesterdayBtn.disabled = false;
  const yesHtml = `
  <div class="yesterday" style="color:white;"> <center> 
  <strong><p style="font-size: 35px; margin-top: 80px;">Yesterday</p>
  <ion-icon name="sunny-outline" style="font-size: 30px;"></ion-icon>
    <h2 class="sunrise" style=" "> Sunrise  </h2>
    <ion-icon name="moon-outline" style="font-size: 30px;"></ion-icon>
    <h2 class="sunset" style=""> Sunset 
    </h2></strong></center> 
  </div>`;

  yesterdayBtn.insertAdjacentHTML("beforeend", yesHtml);
  yesterdayBtn.style.opacity = 1;
}
function yesterdayButton() {
  yesterdayInner.innerHTML = "";
  const yesHtml = `<div class="tomorrow" style="color:white; ">
  <strong><p style="font-size: 35px; margin-top: 50px;">Yesterday</p>
  <ion-icon name="sunny-outline" style="font-size: 30px; margin-top: 50px;"></ion-icon>
  <h2 class="sunrise" style=" margin-top: 10px;"> <center> Sunrise 
  <br>${daysArr[current - 1].astro.sunrise}.</br>
  </center> </h2>
  <h2 class="high" style="margin-top: -20px;"> <center> High ${
    daysArr[current - 1].day.maxtemp_c
  }°C.</center> </h2>
  <ion-icon name="moon-outline" style="font-size: 30px;"></ion-icon>
  <h2 class="sunset" style="margin-top: 50px;margin-top: 10px;"> <center> Sunset 
  <br>${daysArr[current - 1].astro.sunset}.</br></center> </h2>
  <h2 class="law" style="margin-top: -20px;"> <center> Law ${
    daysArr[current - 1].day.mintemp_c
  }°C.</center> </h2></strong>
  </div>`;
  yesterdayBtn.insertAdjacentHTML("beforeend", yesHtml);
  yesterdayBtn.style.opacity = 1;
}

//import axios from 'axios'

const axios = require("axios");
const fs = require("fs");

const erroHandler = (logContext) => (error, context) => {
  console.log(logContext + ", " + error);
};

const file = "results.json";

fs.unlink(file, erroHandler("File Delete"));

const urls = [
  "https://api.github.com/users",
  "https://gateway.reddit.com/desktopapi/v1/subreddits/${search}?sort=top&t=day",
  "https://en.wikipedia.org/api/rest_v1/page/summary/${search}",
  "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${search}&namespace=0&limit=10&suggest=true",
  "https://restcountries.eu/rest/v2/all",
  "https://samples.openweathermap.org/data/2.5/weather?q=${search}&appid=b6907d289e10d714a6e88b30761fae22",
  "https://www.npmjs.com/search/suggestions?q=${search}"
];

function writer(response) {
  if(response) {
    let text = "";
    if(!response.headers['content-type'].indexOf("application/json")) {
      text = response.data;
    } else {
      text = JSON.stringify(response.data)
    }
    fs.appendFileSync(file, text);
    console.log(text)  
  }
}

let substituteUrls = text => urls =>
  urls.map(url => url.replace("${search}", text));

let requestUrls = substituteUrls("java")(urls);
requestUrls.forEach(element => {
  axios
    .get(element)
    .then(writer)
    .catch(erroHandler(`Fetch request failed for ${element}`));
});

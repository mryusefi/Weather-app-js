const axios = require("axios");

const getWeatherData = (location, callback) => {
  const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "/2025-03-29?key=2NESYQP5ETBFW257SJGSFB4KY&unitGroup=metric&contentType=json"
  axios.get(url)
    .then(response => {
      const{temp,conditions,icon,datetime} = response.data.days[0];
      callback(undefined , {
        temp: temp,
        condition:conditions,
        icon:icon,
        location:response.data.resolvedAddress,
        date:datetime,
      } );
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 400) {
          callback("Can't find the location you are looking for.", undefined);
        } else {
          callback("Weather service returned an error:" + error.response.status, undefined);
        }
      } else if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
        callback("Unable to connect to the weather service!", undefined);
      } else {
        callback("An unexpected error occurred:", error.message, undefined);
      }
    });
}
module.exports = getWeatherData;
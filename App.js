
const getWeatherData= require("./utils/GetWeatherData.js");

const location = process.argv[2];
if (!location) {
    console.log("Please provide a location.");
    process.exit(1);
}


getWeatherData(location, (error,data) => {
    if(error) return console.log("Error:", error);
    
    console.log("Data:", data);
})
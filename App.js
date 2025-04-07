
const getWeatherData= require("./utils/GetWeatherData.js");
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = 3000

const viewsPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partial')
const publicDirectoryPath = path.join(__dirname, 'public')
app.use(express.static(publicDirectoryPath))

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
  res.render("index",{
    title:"Weather app",
    name:"Mohammadreza Yousefi"
  })
})
app.get('/about',(req,res)=>{
  res.render("about",{
    title:"About",
    name:"Mohammadreza Yousefi"
  })
})
app.get('/help',(req,res)=>{   
  res.render("help",{
    title:"Help",
    name:"Mohammadreza Yousefi",
    helpMsg:" This is some helpful text."
  })
})
app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({error:"You must provide a location"})
    }   
    getWeatherData(req.query.location, (error,data) => {
        if(error) return res.send({error});
        res.send(data)
    })
  })
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Error 404",
    name: "Mohammadreza Yousefi",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

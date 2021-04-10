const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Anne'
})
})
app.get('/about', ( req, res ) =>{
    res.render('about', {
        title: 'About',
        name: 'Anne'
})
})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'FAQ',
        title: 'Help',
        name: 'Anne'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(address, (error, {longitude, latitude, location} = {}) => {
    
        if(error){
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
      
            res.send({
                location,
                forecast: forecastData,
                address
            })
         })
    })
  
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send({ 
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errMsg: 'Help article not found',
        title: '404',
        name: 'Anne'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        errMsg: 'Page not found!',
        title: '404',
        name:'Anne'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
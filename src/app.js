const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicFilesPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlres engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


app.use(express.static(publicFilesPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        subject: 'Home',
        name: 'Tom',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        subject: 'About',
        name: 'Tom',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        subject: 'Help',
        name: 'Tom',
        msg: 'Here is my message'
    })
})

//get takes two argumets(page link and a function)
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address was not provided'
        })
    }

    
    geocode(req.query.address, (error, {latitude, longitude, location_name} = {}) => {

        if (error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastdata) => {
    
            if (error){
               res.send({
                   error: 'Location was not found'
               })
            }
    
            res.send({
                forecast: forecastdata,
                location: location_name,
                address: req.query.address
            })
    
          })
    })

})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'Search tearm is needed'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Weather App',
        subject: 'Article not found',
        error: 'The Article does not exist',
        name: 'Tom',
    })
})

// This needs to go at the end
// if inserted higher, page will be displayed incorrectly
app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Weather App',
        subject: '404',
        error: '404 page does not exist',
        name: 'Tom',
    })
})

app.listen(port, () => {
    console.log('Server running port ' + port)
})
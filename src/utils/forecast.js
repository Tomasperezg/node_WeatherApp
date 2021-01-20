const request = require('request');

const forecast = (lat, lon, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=8e42eb986ee490cd7a7becae8cc82dfa&query='+ encodeURIComponent(lat)+','+ encodeURIComponent(lon) +'&units=f'

    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather services', undefined)
        }else if (body.error){
            callback('Unable to find weather')
        }else{
            callback(undefined, 'current temp is '+ body.current.temperature + ' degrees F. feels like: ' + body.current.feelslike + ' degrees F. and a Wind Speed of ' + body.current.wind_speed + ' MPH')
        }
    })
}



module.exports = forecast
const request = require('request');


const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoidG9tc2FwcC0zMzEyIiwiYSI6ImNrandhbjM4bTAyeTcycm1pOGxvMzZ5d2sifQ.cCt_ix3MZxkT-G6AMe3UiA&limit=1';


    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('unable to connect to location API', undefined);
        }else if (body.features.length === 0){
            callback('Unable to find location');
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location_name: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode
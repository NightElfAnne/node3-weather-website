const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const lonLat = longitude+','+latitude
    const url = 'http://api.weatherstack.com/current?access_key=28469fe7049433fcdb55eadfbbd4fdbe&query='+ encodeURIComponent(lonLat) +'&units=m'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error){
            callback(body.error, undefined)
        }else {
            callback(undefined, body.current.weather_descriptions[0] +". It is currently " + body.current.temperature + " degrees out. It feels like "+ body.current.feelslike)
        }
    })
}

module.exports = forecast
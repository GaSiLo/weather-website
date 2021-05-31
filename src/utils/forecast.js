const request=require('request')
 const forecast=(latitude,longitude,callback)=>{
     const forecasturl='http://api.weatherstack.com/current?access_key=e1833cd01e132061255cbcec1d650143&query='+latitude+','+longitude+'&units=m'

    //  request({url:forecasturl,json:true},(error,response)=>{
         request({url:forecasturl,json:true},(error,{body})=>{

    if(error){
    callback('Unable to connect to weather service!',undefined)
    // }else if(response.body.error){
    }else if(body.error){
        callback('Unable to find location!,try another search!',undefined)
    }else{
        // callback(undefined,'Its '+response.body.current.weather_descriptions[0]+' outside.It is currently '+response.body.current.temperature+' degrees out.it feels like '+response.body.current.feelslike+' degrees out!')
        callback(undefined,'Its '+body.current.weather_descriptions[0]+' outside.It is currently '+body.current.temperature+' degrees out.it feels like '+body.current.feelslike+' degrees out!')
    }
})
}
module.exports=forecast
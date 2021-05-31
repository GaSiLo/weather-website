const express=require('express')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const hbs=require('hbs')
//to set the path for html static file
const path=require('path')
//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))
// it does the job of mainpulating the string

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
//set a value ,here we have key and value=name of the module
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))
//its a way to customize our server


//need to setup up the route
app.get('',(req,res)=>{
res.render('index',{
    title:'AAJ KA MAUSAM',
    name:'Gasilo'
})
//first is name of the view to render
//second argument is an object that contains all of the values
//with render we can render handle bar template
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Gasilo'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text ',
        title:'Help',
        name:'Gasilo'

    })
})

//app.com
//app.com/help
// app.get('',(req,res)=>{
//    // res.send('hello express')
// res.send('<h1>Weather</h1>')
// })
//this is not going to work through as express is going to 
//find index.html

// app.get('/help',(req,res)=>{
//    // res.send('help page')
// //    res.send({
// //        name:'Haoopaaa',
// //        age:23
// //    })
// res.send([{
//     name:'Gasoli'
// },{
//     name:'chamoli'
// }
// ])
// })
        
// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>')
// })
// app.get('/weather',(req,res)=>{
//    res.send([{
//        Location:'Guna'},{
//            forecast:'Sunny'
//    }])
// })
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide the address'
        }) 
    }
geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
if(error){
    return res.send({error})
}
forecast(latitude,longitude,(error,forecast)=>{
    if(error){
        return res.send({error})
    }
    res.send({
        forecast:forecast,
        location,
        address:req.query.address
    })
})
    })
    // res.send({
    //            Location:'Guna',
    //                forecast:'Sunny',
    //                address:req.query.address
    //        })

})
 app.get('/products',(req,res)=>{
if(!req.query.search){
  return  res.send({
        error:'you must provide a search term'
    })
}
    console.log(req.query.search)
  
res.send({
    products:[]
})
 })

//template engine => handle bar it allows to create dynamic
//pages
app.get('/help/*',(req,res)=>{
   // res.send('Help article not found')
res.render('404',{
title:'404',
name:'Gasilo',
errorMessage:'Help article not found'
})
})  

app.get('*',(req,res)=>{
   // res.send('My 404 page')
   res.render('404',{
       title:'404',
       name:'Gasilo',
       errorMessage:'Page not Found!'
   })
})

//to start the server which is an asynchronous process
app.listen(3000,()=>{
    console.log('Server is upto start on port 3000.')
})
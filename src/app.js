const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000
// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials/')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')  //for setting up hanldebars in express
app.set('views',viewsPath)
hbs.registerPartials(partialsPath) 
 
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Daksh Sharma'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Daksh Sharma'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Daksh Sharma',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    res.send({
        location:'Philadelphia',
        forecast:'It is snowing',
        address: req.query.address
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMsg:'Help article not found',
        name:'Daksh Sharma'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMsg:'Page not found',
        name:'Daksh Sharma'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port' + 3000)
})

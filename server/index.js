import express from "express" ;
import mongoose from "mongoose";
import cors from "cors";
import ShortUrl from "./models/ShortUrl.js";
import prependHttp from 'prepend-http'

const app = express() ;
app.use(express.json())
app.use(cors({origin : 'http://127.0.0.1:5500'}))

mongoose.connect('mongodb://localhost/urlshortener')

const port = process.env.PORT || 5000 ;

app.get('/' , (req , res)=>{
    ShortUrl.find().then((urls)=>res.send(urls))
})

app.post('/shortUrl' , (req , res)=>{
    const fullUrl = prependHttp(req.body.full) ;
    ShortUrl.create({ full : fullUrl})
    .then((data)=>res.send(data));
})

app.get('/shortUrls/:shortUrl' , (req,res)=>{
    ShortUrl.findOne( {short : req.params.shortUrl})
    .then((data)=>res.redirect(data.full)).catch(()=>res.send('link is not found'))
})

app.listen(port , ()=> console.log('SERVER IS RUNNGIN ON PORT',port))
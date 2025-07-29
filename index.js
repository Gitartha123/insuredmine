const express = require('express');
require('dotenv').config();
const connectToMongo = require('./db');
const RoutesApi = require('./routes/api');

const app = express();

app.get('/',(req,res)=>{
    res.send("Hello !!");
})

app.use(express.json());
app.use('/api',RoutesApi);

connectToMongo();
app.listen(process.env.PORT,()=>{
    console.log(`server is listenning port ${process.env.PORT}`)
})
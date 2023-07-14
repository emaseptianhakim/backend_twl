const uri = "mongodb+srv://ema2100016114:Em%40sept1an@ame.lteqsjl.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');
const app = express();
const PORT = 6001;
const mongoose = require('mongoose');
const userroute = require('./router/userrouter');
const pasienroute = require('./router/pasienrouter');
const cors = require('cors')

app.use(cors({origin:"*"}))
app.use(express.json())

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const connect = async () => {
    try {
        mongoose.connect(uri);
        console.log('Connected to mongoDB!')
    } catch (error) {
        throw error
    } 
}



mongoose.connection.on('disconnected', ()=>{
    console.log('MongoDB disconnected!')
});


app.use('/api',userroute)
app.use('/api',pasienroute) //
app.listen(PORT, () => {
    connect()
    console.log(`Server is running on port ${PORT}`);
  });
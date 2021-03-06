require('dotenv').config({path: `./.env`})

const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const {mongo} = require("../node-demo/config")
const bodyParser = require('body-parser')
const {server} = require('./config');
const reshelper = require('reshelper')

const app = express()

app.use(reshelper);

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions))

const route = require('./routes')






let connectionURL = `mongodb://${mongo.dbHost}:${mongo.dbPort}/${mongo.dbName}`;

if (mongo.dbUser && mongo.dbPass) {
    connectionURL = `mongodb://${mongo.dbUser}:${mongo.dbPass}@${mongo.dbHost}:${mongo.dbPort}/${mongo.dbName}`;
}

mongoose.connect(`mongodb://${mongo.dbHost}:${mongo.dbPort}/${mongo.dbName}` ,{useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
    .then(() => {
        console.log("Database connected");
    }).catch((e) => {
    console.log("Database error");
})

app.use('/api/v1', route)
app.use("/images", express.static('images'))





app.listen(server.port, () => {
    console.log(`server run at ${server.port}`)
})

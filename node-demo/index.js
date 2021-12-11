const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const port = process.env.PORT || 8000;

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const route = require('./routes')



mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

app.use('/api/v1', route)



app.listen(port, ()=>{
    console.log(`server is runnung on ${port}`);
});
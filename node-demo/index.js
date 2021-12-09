const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const port = process.env.PORT || 8000;

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const user_Route = require('./routes/user_auth')
const product_Route = require('./routes/product_auth')
const Admin_Route = require('./routes/admin_route')
const Store_Route = require('./routes/store_route')
const Address_Route = require('./routes/address_route')



mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

app.use('/', user_Route)
app.use('/', product_Route)
app.use('/', Admin_Route)
app.use('/', Store_Route)
app.use('/', Address_Route)



app.listen(port, ()=>{
    console.log(`server is runnung on ${port}`);
});
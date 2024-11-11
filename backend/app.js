const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const mongoose =require("mongoose")

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const  cors =require('cors')

app.use(cors())

const MONGODB_URL="mongodb://localhost:27017/e_commerce"

mongoose.connect(MONGODB_URL)
.then(()=>{
        console.log(`${MONGODB_URL} connection succesfull..`)
    })
    .catch((err)=>{
        console.error("Error in connecting to mogodb",err.message)
    })

app.use(require('./Routers/ProductRote'))
app.use(require('./Routers/UserRoute'))
app.use(require('./Routers/CartRoute'))
app.use(require('./Routers/OrderRoute'))

app.use("/files", express.static(__dirname + "/uploads/"))


app.listen(8000, () => {
    console.log('Server started on http://localhost:8000');
});
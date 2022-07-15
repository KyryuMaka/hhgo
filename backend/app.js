const express = require('express')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const users = require('./routers/users')
const app = express();

const limiters = rateLimit({
    windowMs : 15 *60*1000,
    max:100
})
app.use(limiters)
app.use(helmet());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const db = require('./configs/keys.js').mongoURI
mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log('Mongodb Connected'))
.catch(err => console.log(err))

app.use('/users',users)





const port = process.env.PORT || 5000;
app.listen(port,()=> console.log(`Server running on port ${port}`))
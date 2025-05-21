const express = require('express');
const app = express();
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRouters = require('./routes/vendorRoutes');
const firmRouters = require('./routes/firmRoutes');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
const cors = require('cors')


//port, dotenv, body-parser, pug
const PORT = process.env.PORT || 3000;
dotEnv.config();
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(cors())
// app.use(express.json())

//connecting mongoose
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('mongoDB connected successfully'))
.catch((err) => console.log(err))

app.use('/vendor', vendorRouters);
app.use('/firm', firmRouters);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`server started and running at ${PORT}`)
})

app.use('/', (req, res) => {
    res.render('home')
})
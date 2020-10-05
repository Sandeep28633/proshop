const express = require('express');
const products = require('./products');
const dotenv = require('dotenv');

dotenv.config()
const app = express()
app.use(express.json())

const port = process.env.PORT || 3001
app.set('view engine', 'jade')
app.get('/products',(req,res)=>{
    res.send(products)
});

app.get('/products/:id',(req,res)=>{
    const product = products.find(p=>p._id == req.params.id);
    res.send(product);
});

app.listen(port,()=>{
    console.log('Server is running on port ' ,port);
})
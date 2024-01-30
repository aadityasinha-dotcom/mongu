const { error } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const Product = require("./productModel")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes

app.get('/', (req, res) => {
  res.send("Hello node")
})

app.get('/blog', (req, res) => {
    res.send("Hello blog")
})

app.get('/products', async(req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:'cannot find the product'})
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if(!product){
            return res.status(404).json({message:'cannot find the product'})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.connect("mongodb+srv://aadityasinha009:LHcxRzHunZsvquLA@cluster0.fqusj3d.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(() => {
    console.log("connect to mongodb")
    app.listen(3000, ()=>{
        console.log("running")
    })
}).catch(() => {
    console.log(error)
})
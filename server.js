/*const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

//routes

app.get('/', (req, res)=> {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res)=> {
    res.send('Hello Blog my name is Kavana MS')
})

app.post('/product', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://mskavana2002:73DbdVKcb13N7VIA@nodeapi.k2j9o.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeAPI')
.then(() => {
    console.log('Connected to MongoDB!')
    app.listen(3000, ()=> {
        console.log('Node API App is running on port 3000')
    });
    
}).catch(() => {
    console.log(error)
})*/

const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: false}))

// Routes
app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog my name is Kavana MS');
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        //console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch(error) {
        res.status(500).json({message: error.messsge})
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});


//update product

/*app.put('/products/: id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
            const updatedproduct = await Product.findById(id);
        res.status(200).jsaon(product);

    } catch(error) {
        res.status(500).json({ message: error.message });
        
    }
});*/

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updatedproduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*app.delete('products/:id', async(req, res) => {
    try{

        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            return res.status(404).json({message: `cannot find any  product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});*/

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



mongoose.set("strictQuery", false);

// Database connection
mongoose.connect('mongodb+srv://mskavana2002:73DbdVKcb13N7VIA@nodeapi.k2j9o.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeAPI')
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(3000, () => {
            console.log('Node API App is running on port 3000');
        });
    })
    .catch((error) => {
        console.log(error);
    });

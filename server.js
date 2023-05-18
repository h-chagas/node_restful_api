const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const Comment = require("./models/commentModel");
const app = express();
const mongoose_password = require("./mong-pass");

// MIDDLEWARE
app.use(express.json());

//ROUTES
app.get("/", (req, res) => {
  res.send("Hello Node API");
});

//Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const productById = await Product.findById(id);
    res.status(200).json(productById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//Update a product
app.put("/products/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const productById = await Product.findByIdAndUpdate(id, req.body);
        if(!productById) {
            return res.status(404).json({message: `We cannot find any product with ID ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });

    }
})

//Delete a product
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const productById = await Product.findByIdAndDelete(id);
        if (!productById) {
            return res.status(404).json({messsage: `We cannot fins any product with ID ${id}`})
        }
        res.status(200).json(productById);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


// DB connection
// API running
mongoose
  .set("strictQuery", false)
  .connect(
    `mongodb+srv://admin:${mongoose_password}@myapi.ss5ckbz.mongodb.net/Node-API?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Node API is running in PORT 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

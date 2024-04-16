// controllers/products.controller.js

class ProductsController {
    getAllProducts(req, res) {
      // Retrieve and return all products
      res.json({ message: "Get all products" });
    }
  
    getProductById(req, res) {
      // Retrieve and return a single product by id
      const productId = req.params.id;
      res.json({ message: `Get product with id ${productId}` });
    }
  
    createProduct(req, res) {
      // Create a new product
      const { name, price } = req.body;
      res.status(201).json({ message: `Product ${name} created with price ${price}` });
    }
  
    updateProduct(req, res) {
      // Update an existing product
      const productId = req.params.id;
      const { name, price } = req.body;
      res.json({ message: `Product with id ${productId} updated to ${name} with price ${price}` });
    }
  
    deleteProduct(req, res) {
      // Delete an existing product
      const productId = req.params.id;
      res.json({ message: `Product with id ${productId} deleted` });
    }
  }
  
  module.exports = new ProductsController();
  
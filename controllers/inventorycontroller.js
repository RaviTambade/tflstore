// controllers/inventory.controller.js

const fs = require("fs");
const path = require("path");

const productsFile = path.join(__dirname, "../data/products.json");
const readJSON = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

class InventoryController {

  getInventory(req, res) {
    const products = readJSON(productsFile);
    res.json(products);
  }

  getLowStock(req, res) {
    const products = readJSON(productsFile);
    const lowStockItems = products.filter(p => p.stock < 10);

    res.json({ count: lowStockItems.length, items: lowStockItems });
  }

  getOutOfStock(req, res) {
    const products = readJSON(productsFile);
    const out = products.filter(p => p.stock === 0);

    res.json({ count: out.length, items: out });
  }
}

module.exports = new InventoryController();

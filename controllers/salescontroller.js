
const fs = require("fs");
const path = require("path");

const ordersFile = path.join(__dirname, "../data/orders.json");
const paymentsFile = path.join(__dirname, "../data/payments.json");
const productsFile = path.join(__dirname, "../data/products.json");

const readJSON = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

class SalesController {
  
  // ----- Dashboard Sales Summary -----
  getSalesSummary(req, res) {
    const payments = readJSON(paymentsFile);

    const totalRevenue = payments
      .filter(p => p.status === "SUCCESS")
      .reduce((sum, p) => sum + p.amount, 0);

    res.json({
      totalRevenue,
      totalPayments: payments.length,
      successfulTransactions: payments.filter(p => p.status === "SUCCESS").length
    });
  }

  // ----- Top 5 Best Selling Products -----
  getTopProducts(req, res) {
    const orders = readJSON(ordersFile);
    const products = readJSON(productsFile);

    const productSales = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = 0;
        }
        productSales[item.productId] += item.qty;
      });
    });

    const ranked = Object.entries(productSales)
      .map(([productId, qty]) => {
        const product = products.find(p => p.id == productId);
        return {
          productId,
          productName: product?.name ?? "Unknown",
          soldQty: qty
        };
      })
      .sort((a, b) => b.soldQty - a.soldQty)
      .slice(0, 5);

    res.json(ranked);
  }
}

module.exports = new SalesController();
const fs = require("fs");
const path = require("path");

const customersFile = path.join(__dirname, "../data/customers.json");
const ordersFile = path.join(__dirname, "../data/orders.json");

const readJSON = (file) => JSON.parse(fs.readFileSync(file, "utf8"));

class CustomerStatsController {

  getGenderDistribution(req, res) {
    const customers = readJSON(customersFile);

    const male = customers.filter(c => c.gender === "Male").length;
    const female = customers.filter(c => c.gender === "Female").length;

    res.json({ male, female });
  }

  getCityDistribution(req, res) {
    const customers = readJSON(customersFile);

    const byCity = {};

    customers.forEach(c => {
      byCity[c.city] = (byCity[c.city] || 0) + 1;
    });

    res.json(byCity);
  }

  getCustomerOrderFrequency(req, res) {
    const customers = readJSON(customersFile);
    const orders = readJSON(ordersFile);

    const frequency = customers.map(c => ({
      customerId: c.id,
      name: c.name,
      orders: orders.filter(o => o.customerId === c.id).length
    }));

    res.json(frequency);
  }
}

module.exports = new CustomerStatsController();

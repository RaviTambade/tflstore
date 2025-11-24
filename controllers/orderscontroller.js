const fs = require("fs");
const path = require("path");

const ordersFile = path.join(__dirname, "../data/orders.json");

const readOrders = () => JSON.parse(fs.readFileSync(ordersFile, "utf8"));
const writeOrders = (data) => fs.writeFileSync(ordersFile, JSON.stringify(data, null, 2));

class OrdersController {
  

  getAllOrders(req, res) {
    const orders = readOrders();
    res.json(orders);
}

  getOrderById(req, res) {
    const orders = readOrders();
    const order = orders.find(o => o.id == req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  }

  createOrder(req, res) {
    const orders = readOrders();

    const newOrder = {
      id: Date.now(),
      customerId: req.body.customerId,
      items: req.body.items || [],
      status: "PENDING",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.push(newOrder);
    writeOrders(orders);

    res.status(201).json({ message: "Order created", order: newOrder });
  }

  getOrdersByCustomer(req, res) {

    const orders = readOrders();
    const customerId = req.params.customerId;

    const customerOrders = orders.filter(o => o.customerId == customerId);

    res.json(customerOrders);
  }

  approveOrder(req, res) {
    const orders = readOrders();
    const id = req.params.id;

    const order = orders.find(o => o.id == id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "APPROVED";
    order.updatedAt = new Date().toISOString();
    writeOrders(orders);

    res.json({ message: "Order approved", order });
  }

  rejectOrder(req, res) {
    const orders = readOrders();
    const id = req.params.id;

    const order = orders.find(o => o.id == id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "REJECTED";
    order.updatedAt = new Date().toISOString();
    writeOrders(orders);

    res.json({ message: "Order rejected", order });
  }

  cancelOrder(req, res) {
    const orders = readOrders();
    const id = req.params.id;

    const order = orders.find(o => o.id == id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "CANCELLED";
    order.updatedAt = new Date().toISOString();
    writeOrders(orders);

    res.json({ message: "Order cancelled", order });
  }

  getOrderHistory(req, res) {
    const orders = readOrders();
    const { customerId } = req.params;

    const history = orders.filter(o => o.customerId == customerId);
    res.json(history);
  }
}

module.exports = new OrdersController();

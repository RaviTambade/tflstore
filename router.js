var flowersController=require('./controllers/flowerscontroller');
var shoppingCartController=require('./controllers/shoppingcartcontroller');
const productsController = require('./controllers/productscontroller');
const authController = require("./controllers/authcontroller");
const ordersController = require("./controllers/orderscontroller");
const paymentsController = require("./controllers/paymentscontroller");

const SalesController = require("./controllers/salescontroller");
const InventoryController = require("./controllers/inventorycontroller");
const CustomerStatsController = require("./controllers/customerstatscontroller");



const { verifyToken } = require("./middleware/authmiddleware");

module.exports=function(app){

   // map  product catalog handlers with  REST request types
   // AUTH ROUTES
   app.route('/auth/register')
      .post(authController.register);

   app.route('/auth/login')
      .post(authController.login);


   app.route('/products')
      .get(productsController.getAllProducts)
      .post(productsController.createProduct);
      
   app.route('/products/:id')
   .get( productsController.getProductById)
   .put(productsController.updateProduct)
   .delete(productsController.deleteProduct);

   app.route('/flowers')
      .get(flowersController.getAll)
      .post(flowersController.insert);
   app.route('/flowers/:flowerid')
      .put(flowersController.update)
      .get(flowersController.getById)
      .delete(flowersController.delete);

    // map  shoppingcart  handlers with  REST request types
  
   app.route('/cart')
      .get(shoppingCartController.get)
      .post(shoppingCartController.post);
   app.route('/cart/:itemid')
      .put(shoppingCartController.put)
      .get(shoppingCartController.getById)
      .delete(shoppingCartController.delete);

   app.route("/orders")
   .get(ordersController.getAllOrders)
   .post(ordersController.createOrder);

   app.route("/orders/:id")
      .get(ordersController.getOrderById);

   app.get("/orders/customer/:customerId", ordersController.getOrdersByCustomer);

   app.put("/orders/:id/approve", ordersController.approveOrder);
   app.put("/orders/:id/reject", ordersController.rejectOrder);
   app.put("/orders/:id/cancel", ordersController.cancelOrder);

   app.get("/orders/history/:customerId", ordersController.getOrderHistory);


   app.get("/payments", paymentsController.getAllPayments);
   app.get("/payments/:id", paymentsController.getPaymentById);

   app.post("/payments/creditcard", paymentsController.payByCreditCard);
   app.post("/payments/debitcard", paymentsController.payByDebitCard);
   app.post("/payments/upi", paymentsController.payByUPI);

      // Sales
   app.get("/sales/summary", SalesController.getSalesSummary);
   app.get("/sales/top-products", SalesController.getTopProducts);

   // Inventory
   app.get("/inventory", InventoryController.getInventory);
   app.get("/inventory/low-stock", InventoryController.getLowStock);
   app.get("/inventory/out-of-stock", InventoryController.getOutOfStock);

   // Customers
   app.get("/customers/gender-distribution", CustomerStatsController.getGenderDistribution);
   app.get("/customers/city-distribution", CustomerStatsController.getCityDistribution);
   app.get("/customers/order-frequency", CustomerStatsController.getCustomerOrderFrequency);

};
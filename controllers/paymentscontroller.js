const fs = require("fs");
const path = require("path");

const paymentsFile = path.join(__dirname, "../data/payments.json");

const readPayments = () => JSON.parse(fs.readFileSync(paymentsFile, "utf8"));
const writePayments = (data) =>
  fs.writeFileSync(paymentsFile, JSON.stringify(data, null, 2));

class PaymentsController {


  getAllPayments(req, res) {
    const payments = readPayments();
    res.json(payments);
  }

  getPaymentById(req, res) {
    const payments = readPayments();
    const payment = payments.find(p => p.id == req.params.id);

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.json(payment);
  }


  payByCreditCard(req, res) {
    const { orderId, customerId, amount, cardNumber, cardHolder, expiry } = req.body;

    const payments = readPayments();

    const newPayment = {
      id: Date.now(),
      orderId,
      customerId,
      method: "CREDIT_CARD",
      amount,
      details: {
        cardNumber: cardNumber.slice(-4),  // masking
        cardHolder,
        expiry
      },
      status: "SUCCESS",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    payments.push(newPayment);
    writePayments(payments);

    res.json({ message: "Credit Card payment processed", payment: newPayment });
  }

  payByDebitCard(req, res) {
    const { orderId, customerId, amount, cardNumber, bankName } = req.body;

    const payments = readPayments();

    const newPayment = {
      id: Date.now(),
      orderId,
      customerId,
      method: "DEBIT_CARD",
      amount,
      details: {
        cardNumber: cardNumber.slice(-4),
        bankName
      },
      status: "SUCCESS",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    payments.push(newPayment);
    writePayments(payments);

    res.json({ message: "Debit Card payment successful", payment: newPayment });
  }

  payByUPI(req, res) {
    const { orderId, customerId, amount, upiId } = req.body;

    const payments = readPayments();

    const newPayment = {
      id: Date.now(),
      orderId,
      customerId,
      method: "UPI",
      amount,
      details: { upiId },
      status: "SUCCESS",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    payments.push(newPayment);
    writePayments(payments);

    res.json({ message: "UPI payment successful", payment: newPayment });
  }
}

module.exports = new PaymentsController();
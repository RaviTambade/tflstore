// index.js

const express = require('express');
const productsRoutes = require('./router');

const app = express();

app.use(express.json());
app.use('/products', productsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

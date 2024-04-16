// tests/products.controller.test.js

const request = require('supertest');
const app = require('../server');

describe('ProductsController', () => {
  it('should get all products', async () => {
    const res = await request(app).get('/products');
    console.log(res);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Get all products');
  });

  /*it('should get a product by id', async () => {
    const productId = '123';
    const res = await request(app).get(`/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(`Get product with id ${productId}`);
  });

  it('should create a new product', async () => {
    const productData = { name: 'Test Product', price: 10 };
    const res = await request(app).post('/products').send(productData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual(`Product ${productData.name} created with price ${productData.price}`);
  });

  it('should update an existing product', async () => {
    const productId = '123';
    const productData = { name: 'Updated Product', price: 20 };
    const res = await request(app).put(`/products/${productId}`).send(productData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(`Product with id ${productId} updated to ${productData.name} with price ${productData.price}`);
  });

  it('should delete an existing product', async () => {
    const productId = '123';
    const res = await request(app).delete(`/products/${productId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual(`Product with id ${productId} deleted`);
  });

  */
});

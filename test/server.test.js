const request = require('supertest');
const app = require('../server'); // Import your Express app
const Product = require('../productModel'); // Import your Product model

// Test for get products

describe('GET /products', () => {
  test('It should respond with status 200 and return all products', async () => {
    // Mocking products for testing
    const mockProducts = [
      { name: 'Product 1', price: 10 },
      { name: 'Product 2', price: 20 }
    ];

    // Mocking the Product.find() method
    Product.find = jest.fn().mockResolvedValue(mockProducts);

    // Making a GET request to the endpoint
    const response = await request(app).get('/products');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
    expect(Product.find).toHaveBeenCalled();
  });

  test('It should respond with status 500 if an error occurs', async () => {
    // Mocking an error for testing
    const errorMessage = 'Internal Server Error';
    Product.find = jest.fn().mockRejectedValue(new Error(errorMessage));

    // Making a GET request to the endpoint
    const response = await request(app).get('/products');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
    expect(Product.find).toHaveBeenCalled();
  });
});


// Test for search functionality

describe('GET /product/:id', () => {
  test('It should respond with status 200 and return the product with the specified ID', async () => {
    // Mock product data
    const mockProduct = {
      _id: '65ba06dd4c366d858962aab3', // Replace with a valid product ID
      name: 'Test Product',
      price: 10
    };

    // Mock the Product.findById method
    Product.findById = jest.fn().mockResolvedValue(mockProduct);

    // Making a GET request to the endpoint with a valid ID
    const response = await request(app).get('/product/65ba06dd4c366d858962aab3');

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProduct);
    expect(Product.findById).toHaveBeenCalledWith('65ba06dd4c366d858962aab3');
  });

  test('It should respond with status 500 if an error occurs', async () => {
    // Mock an error for testing
    const errorMessage = 'Internal Server Error';
    Product.findById = jest.fn().mockRejectedValue(new Error(errorMessage));

    // Making a GET request to the endpoint with a valid ID
    const response = await request(app).get('/product/invalid-id');

    // Assertions
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
    expect(Product.findById).toHaveBeenCalledWith('invalid-id');
  });
});

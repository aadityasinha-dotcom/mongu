const mongoose = require('mongoose');
const Product = require('../productModel'); // Assuming this is the path to your Product model file

// Connect to a test database
beforeAll(async () => {
  await mongoose.connect('mongodb+srv://aadityasinha009:LHcxRzHunZsvquLA@cluster0.fqusj3d.mongodb.net/Node-API?retryWrites=true&w=majority');
});

// Clear the database before each test
beforeEach(async () => {
  await Product.deleteMany();
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product Model', () => {
  test('It should save a product correctly', async () => {
    const productData = {
      name: 'Test Product',
      desc: 'Description of test product',
      price: 10
    };

    const savedProduct = await Product.create(productData);
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(productData.name);
    expect(savedProduct.desc).toBe(productData.desc);
    expect(savedProduct.price).toBe(productData.price);
  });

  test('It should retrieve a product by ID correctly', async () => {
    const productData = {
      name: 'Test Product',
      desc: 'Description of test product',
      price: 10
    };

    const savedProduct = await Product.create(productData);
    const retrievedProduct = await Product.findById(savedProduct._id);
    expect(retrievedProduct._id).toEqual(savedProduct._id);
    expect(retrievedProduct.name).toBe(savedProduct.name);
    expect(retrievedProduct.desc).toBe(savedProduct.desc);
    expect(retrievedProduct.price).toBe(savedProduct.price);
  });
});

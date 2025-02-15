import axios from "axios";

describe('POST: /product', () => {
  it('should create a new product', async () => {
    const product = {
      name: 'Product Name',
      description: 'Product Description',
    };

    // const response = await request(app.getHttpServer())
    //   .post('/product')
    //   .send(product)
    //   .expect(201);
    
    const response = await axios.post('http://localhost:3000/product', product);

    expect(response.status).toBe(201);
    expect(response.data.body).toEqual({
      id: expect.any(String),
      name: product.name,
      description: product.description,
      isActive: true,
      isArchived: false,
      createdBy: expect.any(String),
      updatedBy: null,
      createdAt: expect.any(String),
      updatedAt: null,
      deletedAt: null,
      internalComment: null,
    });
  });
});
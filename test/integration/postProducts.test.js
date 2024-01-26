import {expect} from 'chai'
import supertest from 'supertest';

const requester = supertest('http://localhost:4000');

describe('Test de agregar producto', () => {
    it('Debería agregar un producto al hacer un POST a /api/products/addproduct', async () => {
    // try {
        
    //     const productData = {
    //     name: 'Nombre del Producto',
    //     image: 'URL de la imagen',
    //     category: 'Categoría del Producto',
    //     new_price: 50.00,
    //     old_price: 60.00,
    //     };

    //     const response = await requester
    //         .post('/api/products/addproduct')
    //         .send(productData);

    //     expect(response.status).to.equal(200);
    //     expect(response.body.success).to.equal(true);
    //     expect(response.body.name).to.equal(productData.name);

    // } catch (err) {
    //     console.error(err);
    //     throw err;
    // }
    });
})
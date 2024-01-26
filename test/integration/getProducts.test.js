import {expect} from 'chai'
import supertest from 'supertest';

const requester = supertest('http://localhost:4000');

describe('Test de get products', () => {
    it('Deberia obtener todos los productos al hacer un GET a /api/products/allproducts', async () => {
        try {
            
            const response = await requester.get('/api/products/allproducts');

            expect(response.status).to.equal(200); 

            expect(response.body).to.be.an('array');

        } catch (err) {
            console.error(err);
            throw err; 
        }
    })
    it('Debería obtener las nuevas colecciones al hacer un GET a /api/products/newcollections', async () => {
        try {
            const response = await requester.get('/api/products/newcollections');
    
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.at.most(8); 

        } catch (err) {
        console.error(err);
        throw err;
        }
    });
    it('Debería obtener productos populares para mujeres al hacer un GET a /api/products/popularwomen', async () => {
        try {
            const response = await requester.get('/api/products/popularwomen');
    
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('array');

            expect(response.body.length).to.be.at.most(4); 
        } catch (err) {
            console.error(err);
            throw err;
        }
    });
    it('Debería obtener un producto por ID al hacer un GET a /api/products/find/:id', async () => {

        const productId = '65abd853000375387c70e6c0'; 
    
        try {
            const response = await requester.get(`/api/products/find/${productId}`);
    
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object'); 
    
            expect(response.body._id).to.equal(productId); 
    
        } catch (err) {
            console.error(err);
            throw err;
        }
    });
    
})
import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:4000');


describe('Test de get users', () => {
    it('Debería obtener todos los usuarios al hacer un GET a /api/users/allusers', async () => {
    try {
        const response = await requester.get('/api/users/allusers');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');

    } catch (err) {
        console.error(err);
        throw err;
    }
    });
    it('Debería obtener un usuario por ID al hacer un GET a /api/users/find/:id', async () => {
        const userId = '65abe2d2d9354646cb2d2845'; 
    
        try {
            const response = await requester.get(`/api/users/find/${userId}`);
    
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
    
            expect(response.body._id).to.equal(userId); 
    
        } catch (err) {
            console.error(err);
            throw err;
        }
    });
    
})
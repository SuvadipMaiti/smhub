
import app from '../../../app';
import request from 'supertest';
describe('Test GET /',()=>{
    test('It should respond with 200 success', async ()=>{
        const response = await request(app).get('/').expect('Content-Type',/json/).expect(200);
    });
});

describe('Test POST /api/v1/user/login',()=>{
    const userData = {
        email:'smhubonline@gmail.com',
        password:'12345'
    };
    const userDataErr = {
        email:'',
        password:''
    };
    test('It should respond with 200 login', async ()=>{
        const response = await request(app).post('/api/v1/user/login').send(userData).expect(200);
    });
    test('It should catch missing properties', async ()=>{
        const responseerr = await request(app).post('/api/v1/user/login').send(userDataErr).expect(400);
        expect(responseerr.body).toStrictEqual({
            "status": false,
            "message": "The 'email' field must not be empty."
          });
    });

});


const clients = require('./clientsHelper');
const users = require('./usersHelper');
const db = require('../dbConfig');

let clientObj = {
    client_name: 'Database Test',
    company_name: 'Database Test',
    email: 'data@test.jest',
    phone_number: '4441118888',
    user_id: 0
};

afterEach(async () => {
    // Clean up the database tables.
    await db('clients').truncate();
    await db('users').truncate();

    // Re-add a user to the database to be used by the test clients.
    await users.insert({
        username: 'Test',
        password: 'test',
        email: 'test@test.com',
        plan: 'Monthly'
    });

    // Reset the clientObj after each test suite.
    clientObj = {
        client_name: 'Database Test',
        company_name: 'Database Test',
        email: 'data@test.jest',
        phone_number: '4441118888',
        user_id: 0
    };

});

describe('When successful the clients table', () => {
    it('Should insert new clients', async () => {
        const ids = await clients.insert(clientObj);
        expect(ids.length).toBe(1);
        expect(ids[0]).toBe(1);
    });

    it('Should update the clients company_name', async () => {
        await clients.insert(clientObj);
        clientObj.company_name = 'Updated Company';
        const ids = await clients.update(1, clientObj);
        const client = await clients.findById(ids);
        expect(client[0].company_name).toBe('Updated Company');
    });

    it('Should update clients email', async () => {
        await clients.insert(clientObj);
        clientObj.email = 'update@test.com';
        const ids = await clients.update(1, clientObj);
        const client = await clients.findById(ids);
        expect(client[0].email).toBe('update@test.com');
    });

    it('Should update the clients phone_number', async () => {
        await clients.insert(clientObj);
        clientObj.phone_number = '9990001111';
        const ids = await clients.update(1, clientObj);
        const client = await clients.findById(ids);
        expect(client[0].phone_number).toBe('9990001111');
    })
});

describe('When unsuccessful the clients table', () => {
    // Build out error testing.
})